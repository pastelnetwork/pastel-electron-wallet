<p align=center>
  <img height="150px" src="src/common/assets/images/logo.svg"/>
</p>
<p align=center>
  <b>Pastel Fullnode Wallet</b>
</p>
<br>
<p align=center>
  [![CircleCI](https://circleci.com/gh/pastelnetwork/pastel-electron-wallet/tree/master.svg?style=svg)](https://circleci.com/gh/pastelnetwork/pastel-electron-wallet/tree/master)
</p>

---

Pastel Fullnode Wallet is a z-Addr first, Sapling compatible wallet and full node for pasteld that runs on Linux, Windows and MacOS. This wallet runs `pasteld`, pastel gonode(`walletnode`), `rqservice` managed by [pastel-utility](https://pastel.wiki/en/Architecture/pastel-utility).

## Installation

Download the release binary for your OS from the releases page, unzip it and double click on the exectable to start.

## Build from source

PastelWallet is written in Electron/React/Typescript and you can use below steps to build it from source.

```
git clone https://github.com/pastelnetwork/pastel-electron-wallet.git
cd pastel-electron-wallet

yarn install
yarn make
```

The resulting binaries would be located at `out` folder. Please note that `yarn make` will create installers only for the OS where it's executed.

## Development

You need to have the following software installed before you can build Pastelwallet Fullnode

- Nodejs v12.16.x or higher - https://nodejs.org
- Yarn - https://yarnpkg.com

To start in the development mode, run:

```
yarn start
```

To contribute, please read [contribution guidelines for this project](docs/CONTRIBUTING.md).

## Database

App includes sqlite database, to make a change to database structure run:

```
yarn db:generate createTableName
```

This will create empty sql file prefixed with timestamp in src/features/pastelDB/migrations

Migration files are applied automatically during the app start up process

When you need to insert multiple records at once use transaction as [explained here](https://github.com/JoshuaWise/better-sqlite3/blob/master/docs/api.md#transactionfunction---function) because it's performed many times faster when using transaction
