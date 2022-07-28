import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('register', 'UsersController.store')
  Route.post('login', 'UsersController.login')
  Route.get('me', 'UsersController.me')
}).prefix('/api/v1/auth')
