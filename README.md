
# Admin server

An admin can do CRUD on both products and users


## Used Packages

 - [Mongoose](https://www.npmjs.com/package/mongoose)
 - [Body-Parser](https://www.npmjs.com/package/body-parser)
 - [Cors](https://www.npmjs.com/package/cors)
 - [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken)
 - [Bcrypt](npmjs.com/package/bcrypt)
 - [Node mailer](https://www.npmjs.com/package/nodemailer)
 - [csvtojson](https://www.npmjs.com/package/csvtojson)
 - [multer](https://www.npmjs.com/package/multer)

# API Reference

## User API

#### Get all user

```http
  GET /api/users
```
#### Delete user

```http
  DELETE /api/users/${id}
```
#### Update user

```http
  POST /api/users/update/{id}
```
#### Add New user

```http
  POST /api/users/new
```

#### Get a single user

```http
  GET /api/users/${id}
```

## Product API
#### Get all product

```http
  GET /api/products
```
#### Delete product

```http
  DELETE /api/products/${id}
```
#### Update product

```http
  POST /api/products/update/{id}
```
#### Add New product

```http
  POST /api/products/new
```

#### Get a single product

```http
  GET /api/products/${id}
```

## Admin API

### Login to app

```http
  POST /api/auth/login
```

### Signup to app

```http
  POST /api/auth/signup
```
### Verify the Admin

```http
  POST /api/auth/populate
```


## Authors

- [@KumarHarsh](https://github.com/KumarHarsh2001)
- [@Yashgade](https://github.com/Yashgade)
- [@Selva](https://github.com/cellva03)

