PastelWallet Fullnode is a z-Addr first, Sapling compatible wallet and full node for pasteld that runs on Linux, Windows and macOS.

# Installation


### Windows

Download and run the `.msi` installer and follow the prompts. Alternately, you can download the release binary, unzip it and double click on `pastelwallet.exe` to start.

## pasteld

PastelWallet needs a Pastel node running pasteld. If you already have a pasteld node running, PastelWallet will connect to it.

If you don't have one, PastelWallet will start its embedded pasteld node.

Additionally, if this is the first time you're running PastelWallet or a pasteld daemon, PastelWallet will download the Pastel params (~777 MB) and configure `pastel.conf` for you.

## Compiling from source

PastelWallet is written in Electron/Javascript and can be build from source. Note that if you are compiling from source, you won't get the embedded pasteld by default. You can either run an external pasteld, or compile pasteld as well.

#### Pre-Requisits

You need to have the following software installed before you can build Pastelwallet Fullnode

- Nodejs v12.16.1 or higher - https://nodejs.org
- Yarn - https://yarnpkg.com

```
git clone https://github.com/PastelFoundation/pastelwallet.git
cd pastelwallet

yarn install
yarn build
```

To start in development mode, run

```
yarn dev
```

To start in production mode, run

```
yarn start
```
