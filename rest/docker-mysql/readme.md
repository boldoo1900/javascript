
build mysql
```
docker build -t test-mysql .
```

run mysql
```
docker run -d -p 3306:3306 --rm --name test-mysql-container \
-e MYSQL_ROOT_PASSWORD=123 test-mysql

with network
docker run --rm -d --network test-network -p 3306:3306 --name test-mysql-container \
-e MYSQL_ROOT_PASSWORD=123 test-mysql

check network containers
docker network inspect <network_name>

```

execute mysql console
```
docker exec -it test-mysql-container bash

# mysql -uroot -p
```


