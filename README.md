# Node-RED DV Group API Bridge

A Node-RED node to push your data to the DV Group API.

## Documentation

- [DVGroup API](https://docs.diagrams-technologies.com/)
- [DVGroup App](https://app.diagrams-technologies.com/)
- [Node-RED docs](https://nodered.org/docs/)

## Getting started

First of all,
[download the package](https://github.com/DiagRAMS-Technologies/api-bridge-node-red/releases)
corresponding to the release you need. Then, import it in your Node-RED web
interface.

To do so, click on the hamburger menu on the right top of the screen, select
"Manage Palette", select the "Install" tab, search for this module and push the
install button.

The DVGroup bridge node will be in your palette in the "function" category.

To use it, just create an application in your DVGroup application and put it in
the credentials. You will also need to provide the organization identifier, your
project code and the API base URL if running on premise / single tenant.

## Development

Use docker to spawn your local Node-RED instance:

```sh
docker run -it -p 1880:1880 --name mynodered nodered/node-red
```

Install dependencies:

```sh
npm i
```

## Build & Package

Builds the module and creates a .tgz package in the current directory.

```sh
npm run build
npm pack
```

Put it in the docker container:

```sh
docker container cp ./dvgroup-api-bridge-node-red-1.0.0.tgz mynodered:/data
```

And install it:

```sh
docker exec -ti mynodered bash
$ cd /data
$ npm i ./dvgroup-api-bridge-node-red-1.0.0.tgz
$ exit
```
