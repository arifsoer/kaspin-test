import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/:id', 'KecamatansController.get')
  Route.get('/:kota_id', 'KecamatansController.getByKotaId')
})
  .prefix('/api/v1/kecamatan')
  .middleware('auth')
