

## prerequisites
```
npm init -y
npm i 

```

## reference
```
https://github.com/puppeteer/puppeteer
https://github.com/checkly/puppeteer-examples
```

## run 

run lemp app
```
// go to project folder
cd <path>/bootcamp/workshop2020/lemp/munkhbold-bayasgalan/docker-lemp

// run docker compose
docker-compose up -d

// mysql initialize data
docker exec -it my-mysqldb /bin/bash
cd docker-entrypoint-initdb.d/

mysql -u root -p testdb < ddl.sql
mysql -u root -p testdb < dml.sql

// pages    (username: test@yahoo.com, password: 12345678)
localhost:8000/login
localhost:8000/phpmyadmin/
```

run puppeteer-example
```
node dashboard.js
node blogAdd.js
```

## reference
```
https://github.com/checkly/puppeteer-examples
https://github.com/puppeteer/puppeteer
```