import { test } from '@japa/runner'
import User from 'App/Models/User'

test.group('Get Single data (Kecamatan)', () => {
  test('return single data using some id', async ({ client }) => {
    //auth setup
    const user = await User.find(1)

    const expectedDataReturn = {
      id: '1101010',
      kota_id: '1101',
      nama: 'TEUPAH SELATAN',
    }

    const response = await client.get(`/api/v1/kecamatan/${expectedDataReturn.id}`).loginAs(user!)

    response.assertBodyContains({ status: 'data', data: expectedDataReturn })
  })

  test('Error if the data not found', async ({ client }) => {
    //auth setup
    const user = await User.find(1)

    const response = await client.get(`/api/v1/kecamatan/1101`).loginAs(user!)

    response.assertStatus(404)
  })

  test('Error if request without auth token', async ({ client }) => {
    const expectedDataReturn = {
      id: '1101010',
      kota_id: '1101',
      nama: 'TEUPAH SELATAN',
    }

    const response = await client.get(`/api/v1/kecamatan/${expectedDataReturn.id}`)

    response.assertStatus(401)
  })

  test('Error if use wrong token', async ({ client }) => {
    const expectedDataReturn = {
      id: '1101010',
      kota_id: '1101',
      nama: 'TEUPAH SELATAN',
    }

    const response = await client
      .get(`/api/v1/kecamatan/${expectedDataReturn.id}`)
      .setup(async (request) => {
        request.header('Authorization', 'Bearer abc')
      })
    response.assertStatus(401)
  })
})

test.group('Get Several data based on condition', () => {
  test('return several data kecamatan by kota_id', async ({ client }) => {
    //auth setup
    const user = await User.find(1)

    const expectedCondition = {
      kota_id: '1101',
      lengthData: 10,
      nameContains: 'SALANG',
    }

    const response = await client
      .get(`/api/v1/kecamatan?kota_id=${expectedCondition.kota_id}`)
      .loginAs(user!)

    response.assertStatus(200)
    const bodyResponse = response.body() as unknown as { status: string; data: any[] }
    response.assert?.equal(bodyResponse.data.length, expectedCondition.lengthData)
    const mappedName = bodyResponse.data.map((x) => x.nama)
    response.assert?.include(mappedName, expectedCondition.nameContains)
  })

  test('return data not found', async ({ client }) => {
    //auth setup
    const user = await User.find(1)

    const expectedCondition = {
      kota_id: '110',
      responseStatus: 404,
    }

    const response = await client
      .get(`/api/v1/kecamatan?kota_id=${expectedCondition.kota_id}`)
      .loginAs(user!)

    response.assertStatus(expectedCondition.responseStatus)
  })

  test('Error if request without auth token', async ({ client }) => {
    const expectedCondition = {
      kota_id: '110',
      responseStatus: 401,
    }

    const response = await client.get(`/api/v1/kecamatan?kota_id=${expectedCondition.kota_id}`)

    response.assertStatus(expectedCondition.responseStatus)
  })

  test('Error if request with wrong token', async ({ client }) => {
    const expectedCondition = {
      kota_id: '110',
      responseStatus: 401,
      wrongToken: 'abc',
    }

    const response = await client
      .get(`/api/v1/kecamatan?kota_id=${expectedCondition.kota_id}`)
      .setup(async (request) => {
        request.header('Authorization', `Bearer ${expectedCondition.wrongToken}`)
      })

    response.assertStatus(expectedCondition.responseStatus)
  })
})
