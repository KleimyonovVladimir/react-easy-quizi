# Installation & Run

```sh
 $ docker-compose up --build
```

## Problem with using MSQ

Kill the process currently using a port on localhost in Windows? (3306 for MSQ)
[watch this link](https://stackoverflow.com/questions/39632667/how-do-i-kill-the-process-currently-using-a-port-on-localhost-in-windows)

## Docker helpers

Remove all <none> images:

```sh
docker rmi $(docker images -f “dangling=true” -q)
```
