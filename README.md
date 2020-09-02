# jaya-challenge - Exchange Rate
Project: An API to convert rates beetwen differents currencies

Features:   
  * create a new user
  * list all registered users
  * create a new conversion using an existing user
  * list all registered conversions 
  * list all conversions using an existing user as criteria

Technologies: typescript, sequelize, bunyan, express, axios, eslint, jest, supertest

* A Simple MVC Project

# create an user to perform a conversion
UserController -> create

responsible for creating a new user using the create method from user.model class that was mapped with sequelize framework 

# list all users
UserController -> index

responsible for listing all users using the findAll method from user.model class that was mapped with sequelize framework

# create a conversion
ConversionController -> create

responsible for creating a new conversion using the create method from 
conversion.model class that was mapped with sequelize framework
verify if user exists, call the exchange-rate.client api and convert the base currency with base value applying rates to the base value 

# list all conversions
UserController -> index

responsible for listing all conversions using the findAll method from conversion.model class that was mapped with sequelize framework

# list all conversions by user
UserController -> byUser

responsible for listing all conversions using the findAll method from 
conversion.model class that was mapped with sequelize framework
and passing userId to where clause to filter a especific user recorded on database

# exchange rate client api
ExchangeRateClient -> getRates

responsible for fetching all rates when passing a base currency on query param on 
https://api.exchangeratesapi.io/ endpoint

* usage : 
```https://api.exchangeratesapi.io/latest?base=USD```


# json to list all users POST
http://localhost:3030/user/

```{
"name": "Artur Pedrosa"
}```

returns

```{
    "id": "163a3d70-ebf2-11ea-a9de-dd9a7e5dab95",
    "name": "Artur Pedrosa",
    "updatedAt": "2020-09-01T01:25:57.575Z",
    "createdAt": "2020-09-01T01:25:57.575Z"
}```

# json to create a new user GET
http://localhost:3030/users/

returns

```[
    {
        "id": "12d0d3b0-ebf2-11ea-a9de-dd9a7e5dab95",
        "name": "Artur Pedrosa",
        "createdAt": "2020-09-01T01:25:51.852Z",
        "updatedAt": "2020-09-01T01:25:51.852Z"
    },
    {
        "id": "163a3d70-ebf2-11ea-a9de-dd9a7e5dab95",
        "name": "any_name",
        "createdAt": "2020-09-01T01:25:57.575Z",
        "updatedAt": "2020-09-01T01:25:57.575Z"
    }
]```


**Check if you have .env on your project

```PORT=3030
EXCHANGE_PUB_ENDPOINT=https://api.exchangeratesapi.io/```

## Commands 🚀

```npm start dev : send command "npx ts-node src/server.ts" -> Start the server with microservices```

