# Installation & Run 👟

To start the project, run the following command in the console. This command will launch the server and MySQL.

```sh
 $ docker-compose up --build
```

Now you server is available on port _localhost:5000_ 🥳

**_Also you have to connect to the MySQL after starting docker_**

## Connect to DB (MySQL) 🔌

1. Open **MySQL Workbench** _(download if you haven't it)_
2. Click "plus" button/icon near to MySQL Connection title
3. Enter any "Connection Name"
4. Enter **user** as "Username"
5. Enter "Password" by clicking "Store in Vault..." _(you can find password in .env file)_
6. Click "Test Connection" button and check that everything is okay
7. Click okay button and open you connection

## Problem with using MSQ

Kill the process currently using a port on localhost in Windows? (3306 for MSQ)
[watch this link](https://stackoverflow.com/questions/39632667/how-do-i-kill-the-process-currently-using-a-port-on-localhost-in-windows)

## Docker helpers

Remove all <none> images:

```sh
docker rmi $(docker images -f “dangling=true” -q)
```
