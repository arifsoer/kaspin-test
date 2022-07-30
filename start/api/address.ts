import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'KecamatansController.getAll')
  Route.get('/:id', 'KecamatansController.getOne')
})
  .prefix('/api/v1/kecamatan')
  .middleware('auth')
