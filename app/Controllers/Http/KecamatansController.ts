import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { getDummyData, getDummyDataById, getDummyDataWhere, DummyData } from '../../utils/GetDummy'

export default class KecamatansController {
  // get by kecamatan Id
  public async getOne({ response, params, logger }: HttpContextContract) {
    const { id } = params
    try {
      const data = await getDummyDataById('kecamatan', id)

      if (data) {
        return response.status(200).json({
          status: 'data',
          data,
        })
      } else {
        return response.status(404).json({
          status: 'error',
          data: 'data not found',
        })
      }
    } catch (error) {
      logger.error(error)
      return response.status(500).json({
        status: 'error',
        data: error,
      })
    }
  }

  // get by kota id
  public async getAll({ response, request, logger }: HttpContextContract) {
    try {
      let data: DummyData[] = []
      if (request.qs().kota_id === undefined) {
        data = await getDummyData('kecamatan')
      } else {
        data = await getDummyDataWhere('kecamatan', request.qs())
      }

      if (data.length <= 0) {
        return response.status(404).json({
          status: 'error',
          data: 'Data Not Found',
        })
      }

      return response.status(200).json({
        status: 'data',
        data,
      })
    } catch (error) {
      logger.error(error)
      return response.status(500).json({
        status: 'error',
        data: error,
      })
    }
  }
}
