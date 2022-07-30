import { curly } from 'node-libcurl'
import Redis from '@ioc:Adonis/Addons/Redis'
import Env from '@ioc:Adonis/Core/Env'
import Logger from '@ioc:Adonis/Core/Logger'

interface KecamatanType {
  id: string
  kota_id: string
  nama: string
}

interface KelurahanType {
  id: string
  kecamatan_id: string
  nama: string
}

interface ProvinsiType {
  id: string
  nama: string
}

interface KotaType {
  id: string
  provinsi_id: string
  nama: string
}

type DummyData = KecamatanType | KelurahanType | ProvinsiType | KotaType
type TypeData = 'kecamatan' | 'kelurahan' | 'provinisi' | 'kota'
interface WhereObject {
  [prop: string]: string
}

// get data from cloud or if exist on redis, get from there
// this feature will optimize request time
const getFromCloudOrCache = async (): Promise<string> => {
  try {
    // check cache on redis first
    const dummyData = await Redis.get('dummy')

    // for frequently refresh the data
    const lastSet = await Redis.get('lastset')
    const nowTimeStamp = Date.now()
    const timeStampLastSet =
      lastSet === null ? nowTimeStamp : parseInt(lastSet as unknown as string)
    const diffTimestamp = nowTimeStamp - timeStampLastSet
    const dataAge = Env.get('CACHE_AGE', 60) // in minutes
    let isExpired = diffTimestamp > dataAge * 60 * 1000
    if (!dummyData) {
      isExpired = true
    }

    // get from cloud when cache is null or cache is expired
    if (!dummyData || isExpired) {
      const { data } = await curly.get('https://kasirpintar.co.id/allAddress.txt')

      // set to data and current timestamp to redis
      await Redis.set('dummy', data)
      await Redis.set('lastset', Date.now())
      Logger.info('Get Data from Cloud')
      return data
    } else {
      Logger.info('Using cache data')
      return dummyData as unknown as string
    }
  } catch (error) {
    throw error
  }
}

// get the data from dummy string data based on the type and then parse to json
const getDummyData = async (type: TypeData): Promise<DummyData[]> => {
  try {
    const data = await getFromCloudOrCache()

    const jsonData = JSON.parse(data)

    return jsonData['address_' + type]
  } catch (error) {
    throw error
  }
}

// get single data using filter id
const getDummyDataById = async (type: TypeData, id: string): Promise<DummyData> => {
  try {
    const datas = await getDummyData(type)

    return datas.find((x) => x.id === id) as DummyData
  } catch (error) {
    throw error
  }
}

// get datas with where query, only need one condition match to return true
const getDummyDataWhere = async (type: TypeData, where: WhereObject): Promise<DummyData[]> => {
  try {
    const datas = await getDummyData(type)

    return datas.filter((dt) => {
      let isMatchAr: boolean[] = []
      for (const prop in where) {
        if (Object.prototype.hasOwnProperty.call(where, prop)) {
          const value = where[prop]
          isMatchAr.push(dt[prop] === value)
        }
      }
      return isMatchAr.includes(true)
    }) as DummyData[]
  } catch (error) {
    throw error
  }
}

export { getDummyData, getDummyDataById, getDummyDataWhere, DummyData }
