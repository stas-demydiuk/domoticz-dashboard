# Dashboard for Domoticz

Flexible dashboard for Domoticz for devices with touch interfaces
This project is based on ideas of HADashboard. HADashboard was originally created by [FlorianZ](https://github.com/FlorianZ/hadashboard) for use with the SmartThings Home Automation system, with notable contributions from the [SmartThings Community](https://community.smartthings.com/t/home-automation-dashboard/4926).

<span style="color:#f78c75"> *Dashboard is in development and is not ready for production yet*</span>

![Dashboard Screenshot](https://raw.githubusercontent.com/stas-demydiuk/domoticz-dashboard/master/screenshot.png)

# Usage

## Configuration
In `config` folder inside your domoticz-dashboard directory create server.json and dashboard.json files.

Example of server.json
```json
{
  "domoticz": {
    "protocol": "http",
    "server": "your_domoticz_address:port",
    "username": null,
    "password": null
  },
  "mqtt": {
    "server": "ws://your_mosquitto_address:9001",
    "username": null,
    "password": null
  }
}
```
Example of empty dashboard.json
```json
[{
  "roomId":0,
  "widgets":[]
}]
```

## Run

The easiest way to start dashboard is to use docker container.
You can use docker or docker-compose to run the container.
Sample of docker-compose.yml file
```yaml
version: '3.3'

services:
  domoticz-dashboard:
    image: demydiuk/domoticz-dashboard
    container_name: domoticz-dashboard
    volumes:
      - "./config:/usr/src/dashboard/config"
    ports:
      - 8080:80
    restart: always
```
Simply execute this command in your domoticz-dashboard directory to start container:
```bash
docker-compose up -d
```

Now yor should be able to access dashboard on 8080 port.

# Development

## Requirements

Dashboard is based on NodeJS, so NodeJS 6.x+ will be required.
Also it is preferred to use [yarn](https://yarnpkg.com), but you can use npm instead (just replace yarn with npm in commands) 

## 1. Clone repository

Clone the repository to the current local directory on your machine.

```bash
    git clone https://github.com/stas-demydiuk/domoticz-dashboard.git
```

## 2. Install dependencies

```bash
    yarn install
```

## 3. Run application

```bash
    yarn start
```
