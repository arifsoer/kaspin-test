import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class KecamatansController {
  // get by kecamatan Id
  public async get({ request, response }: HttpContextContract) {
    const { id } = request.only(['id'])
    try {
      return response.status(200).json({
        status: 'data',
        data: id,
      })
    } catch (error) {
      return response.status(500).json({
        status: 'data',
        data: error,
      })
    }
  }

  // get by kota id
  public async getByKotaId({ request, response }: HttpContextContract) {
    const kotaId = request.param('kota_id')
    try {
      return response.status(200).json({
        status: 'data',
        data: kotaId,
      })
    } catch (error) {
      return response.status(500).json({
        status: 'data',
        data: error,
      })
    }
  }
}
