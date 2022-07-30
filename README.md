# Soal Kaspin

exercise project based on soale kaspin. this project using adonis js framework

## Setup

this project need postgreSQL for save data user and token, also using redis for caching to optimize performance.

1.  clone on your local machine using git clone
2.  install dependency using yarn or npm

> yarn install
> or
> npm install

3.  copy file .env.example and save with the name .env
4.  change all PG\_ environment variable based on your db connection
5.  change all REDIS\_ environment variable based on your redis connection
6.  run below command to run migrate and then seed the default user

> yarn setup-dev

## Usage

1.  run Application using below command

> yarn dev

2.  access swagger doc on http://localhost:3333/docs, you may change localhost with the ip based on your local machine
3.  login using default username and password on /api/v1/auth/login

> username : admin1@admin.com
> password : password123

4. click authorize button add the top right swagger doc, then past the token response from previous login request, then click Authorize button to set the token
5. with the setup all request with lock icon can be run

## Test

after the setup section is done, then test command will work with command bellow

> yarn test
