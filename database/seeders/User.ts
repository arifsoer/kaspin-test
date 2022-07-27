import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public static developmentOnly = true

  public async run() {
    // create default user data
    await User.create({
      email: 'admin@admin.com',
      password: 'passwordadmin',
    })
  }
}
