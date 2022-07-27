import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('register', 'UserController.store')
  Route.post('login', 'UserController.login')
  Route.get('me', 'UserController.me')
}).prefix('/api/v1/auth')
