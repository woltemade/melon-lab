# Melon Javascript Skeleton

[![Gitter chat](https://img.shields.io/gitter/room/melonproject/melon-lab.js.svg?style=flat-square&colorB=46bc99)](https://gitter.im/melonproject/general 'Gitter chat')
[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg?style=flat-square)](https://www.gnu.org/licenses/agpl-3.0)
![Dependencies](https://img.shields.io/david/melonproject/melon-lab.svg?style=flat-square)
![Development Dependencies](https://img.shields.io/david/dev/melonproject/melon-lab.svg?style=flat-square)

<img src = "https://github.com/melonproject/branding/blob/master/melon/03_M_logo.jpg" width = "25%" align="right">

# Getting started

## Prerequisites

* yarn
* node >= v8.11.1
* docker >= 18.0.2

## Quickstart

First, you need to clone the repository.

```bash
git clone git@github.com:melonproject/melon-lab.git && cd melon-lab
```

Then, you need to configure your local environment.

```bash
cp packages/graphql-server/.env.example packages/graphql-server/.env
cp packages/manager-interface/.env.example packages/manager-interface/.env
```

Take a look at the copied .env files and adjust them as needed.

### Without Docker

If you don't want to or can't use Docker, you can also run all of the
individual services locally in parallel from the workspace root.

```
yarn install
yarn dev
```

### With Docker

If you want to use Docker for local development, you can use make to conveniently start the whole infrastructure.

```bash
make bootstrap
make start
```

## Exposed Interfaces

* IPFS Frontend: http://localhost:3001/
* Manager Interface (To-be-successor of IPFS Frontend): http://localhost:3000/
* GraphQL Server/Playground: http://localhost:3030/
* Components Storybook: http://localhost:3060/
