/* eslint-disable jsx-a11y/interactive-supports-focus */

/* eslint-disable jsx-a11y/click-events-have-key-events */

/* eslint-disable max-classes-per-file */
import React, { Component } from "react";
import { Redirect, withRouter } from "react-router";
import ini from "ini";
import fs from "fs";
import request from "request";
import progress from "progress-stream";
import os from "os";
import path from "path";
import { remote, ipcRenderer } from "electron";
import { spawn } from "child_process";
import { promisify } from "util";
import routes from "../constants/routes.json";
import { RPCConfig } from "./AppState";
import RPC from "../rpc";
import cstyles from "./Common.module.css";
import styles from "./LoadingScreen.module.css";
import { NO_CONNECTION } from "../utils/utils";
import Logo from "../assets/img/pastel-logo.png";
import pasteldlogo from "../assets/img/pastel-logo2.png";
import process from "process";

const locatePastelConfDir = () => {
  if (os.platform() === "darwin") {
    return path.join(remote.app.getPath("appData"), "Pastel");
  }

  if (os.platform() === "linux") {
    return path.join(remote.app.getPath("home"), ".pastel");
  }

  return path.join(remote.app.getPath("appData"), "Pastel");
};

const locatePastelConf = () => {
  if (os.platform() === "darwin") {
    return path.join(remote.app.getPath("appData"), "Pastel", "pastel.conf");
  }

  if (os.platform() === "linux") {
    return path.join(remote.app.getPath("home"), ".pastel", "pastel.conf");
  }

  return path.join(remote.app.getPath("appData"), "Pastel", "pastel.conf");
};

const pasteldBasePath = () => {
  if (remote.app.isPackaged) {
    return process.resourcesPath;
  }

  return path.join(remote.app.getAppPath(), "static", "bin");
};

const locatePasteld = () => {
  if (os.platform() === "darwin") {
    return path.join(pasteldBasePath(), "pasteld-mac");
  }

  if (os.platform() === "linux") {
    return path.join(pasteldBasePath(), "pasteld-linux");
  }

  return path.join(pasteldBasePath(), "pasteld-win.exe");
};

const locatePastelParamsDir = () => {
  if (os.platform() === "darwin") {
    return path.join(remote.app.getPath("appData"), "PastelParams");
  }

  if (os.platform() === "linux") {
    return path.join(remote.app.getPath("home"), ".pastel-params");
  }

  return path.join(remote.app.getPath("appData"), "PastelParams");
};

class LoadingScreenState {
  constructor() {
    this.currentStatus = "Loading...";
    this.creatingPastelConf = false;
    this.loadingDone = false;
    this.pasteldSpawned = 0;
    this.getinfoRetryCount = 0;
    this.rpcConfig = null;
  }
}

class LoadingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = new LoadingScreenState();
  }

  componentDidMount() {
    (async () => {
      const success = await this.ensurePastelParams();

      if (success) {
        await this.loadPastelConf(true);
        await this.setupExitHandler();
      }
    })();
  }

  download = (url, dest, name, cb) => {
    const file = fs.createWriteStream(dest);
    const sendReq = request.get(url); // verify response code

    sendReq.on("response", (response) => {
      if (response.statusCode !== 200) {
        return cb(`Response status was ${response.statusCode}`);
      }

      const totalSize = (
        parseInt(response.headers["content-length"], 10) /
        1024 /
        1024
      ).toFixed(0);
      const str = progress(
        {
          time: 1000,
        },
        (pgrs) => {
          this.setState({
            currentStatus: `Downloading ${name}... (${(
              pgrs.transferred /
              1024 /
              1024
            ).toFixed(0)} MB / ${totalSize} MB)`,
          });
        }
      );
      sendReq.pipe(str).pipe(file);
    }); // close() is async, call cb after close completes

    file.on("finish", () => file.close(cb)); // check for request errors

    sendReq.on("error", (err) => {
      fs.unlink(dest);
      return cb(err.message);
    });
    file.on("error", (err) => {
      // Handle errors
      fs.unlink(dest); // Delete the file async. (But we don't check the result)

      return cb(err.message);
    });
  };
  ensurePastelParams = async () => {
    // Check if the pastel params dir exists and if the params files are present
    const dir = locatePastelParamsDir();

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    const params = [
      {
        name: "sapling-output.params",
        url: "https://z.cash/downloads/sapling-output.params",
      },
      {
        name: "sapling-spend.params",
        url: "https://z.cash/downloads/sapling-spend.params",
      },
      {
        name: "sprout-groth16.params",
        url: "https://z.cash/downloads/sprout-groth16.params",
      },
      {
        name: "sprout-proving.key",
        url: "https://z.cash/downloads/sprout-proving.key",
      },
      {
        name: "sprout-verifying.key",
        url: "https://z.cash/downloads/sprout-verifying.key",
      },
    ]; // eslint-disable-next-line no-plusplus

    for (let i = 0; i < params.length; i++) {
      const p = params[i];
      const fileName = path.join(dir, p.name);

      if (!fs.existsSync(fileName)) {
        // Download and save this file
        this.setState({
          currentStatus: `Downloading ${p.name}...`,
        });

        try {
          // eslint-disable-next-line no-await-in-loop
          await promisify(this.download)(p.url, fileName, p.name);
        } catch (err) {
          console.log(`error: ${err}`);
          this.setState({
            currentStatus: `Error downloading ${p.name}. The error was: ${err}`,
          });
          return false;
        }
      }
    }

    return true;
  };

  async loadPastelConf(createIfMissing) {
    // Load the RPC config from pastel.conf file
    const pastelLocation = locatePastelConf();
    let confValues;

    try {
      confValues = ini.parse(
        await fs.promises.readFile(pastelLocation, {
          encoding: "utf-8",
        })
      );
    } catch (err) {
      if (createIfMissing) {
        this.setState({
          creatingPastelConf: true,
        });
        return;
      }

      this.setState({
        currentStatus: `Could not create pastel.conf at ${pastelLocation}. This is a bug, please file an issue with Pastel Wallet`,
      });
      return;
    } // Get the username and password

    const rpcConfig = new RPCConfig();
    rpcConfig.username = confValues.rpcuser;
    rpcConfig.password = confValues.rpcpassword;

    if (!rpcConfig.username || !rpcConfig.password) {
      this.setState({
        currentStatus: (
          <div>
            <p>
              Your pastel.conf is missing a &quot;rpcuser&quot; or
              &quot;rpcpassword&quot;.
            </p>
            <p>
              Please add a &quot;rpcuser=some_username&quot; and
              &quot;rpcpassword=some_password&quot; to your pastel.conf to
              enable RPC access
            </p>
            <p>Your pastel.conf is located at {pastelLocation}</p>
          </div>
        ),
      });
      return;
    }

    const isTestnet =
      (confValues.testnet && confValues.testnet === "1") || false;
    const server = confValues.rpcbind || "127.0.0.1";
    const port = confValues.rpcport || (isTestnet ? "19932" : "9932");
    rpcConfig.url = `http://${server}:${port}`;
    this.setState({
      rpcConfig,
    }); // And setup the next getinfo

    this.setupNextGetInfo();
  }

  createPastelconf = async () => {
    const { connectOverTor, enableFastSync } = this.state;
    const dir = locatePastelConfDir();

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    const pastelConfPath = await locatePastelConf();
    let confContent = "";
    confContent += "server=1\n";
    confContent += "rpcuser=pastelwallet\n";
    confContent += `rpcpassword=${Math.random()
      .toString(36)
      .substring(2, 15)}\n`;

    if (connectOverTor) {
      confContent += "proxy=127.0.0.1:9050\n";
    }

    if (enableFastSync) {
      confContent += "ibdskiptxverification=1\n";
    }

    await fs.promises.writeFile(pastelConfPath, confContent);
    this.setState({
      creatingPastelConf: false,
    });
    this.loadPastelConf(false);
  };
  pasteld = null;
  setupExitHandler = () => {
    // App is quitting, exit pasteld as well
    ipcRenderer.on("appquitting", async () => {
      if (this.pasteld) {
        const { history } = this.props;
        const { rpcConfig } = this.state;
        this.setState({
          currentStatus: "Waiting for pasteld to exit...",
        });
        history.push(routes.LOADING);
        this.pasteld.on("close", () => {
          ipcRenderer.send("appquitdone");
        });
        this.pasteld.on("exit", () => {
          ipcRenderer.send("appquitdone");
        });
        console.log("Sending stop");
        setTimeout(() => {
          RPC.doRPC("stop", [], rpcConfig);
        });
      } else {
        // And reply that we're all done.
        ipcRenderer.send("appquitdone");
      }
    });
  };
  startPasteld = async () => {
    const { pasteldSpawned } = this.state;

    if (pasteldSpawned) {
      this.setState({
        currentStatus: "pasteld start failed",
      });
      return;
    }

    const program = locatePasteld();
    console.log(program);
    this.pasteld = spawn(program);
    this.setState({
      pasteldSpawned: 1,
    });
    this.setState({
      currentStatus: "pasteld starting...",
    });
    this.pasteld.on("error", (err) => {
      console.log(`pasteld start error, giving up. Error: ${err}`); // Set that we tried to start pasteld, and failed

      this.setState({
        pasteldSpawned: 1,
      }); // No point retrying.

      this.setState({
        getinfoRetryCount: 10,
      });
    });
  };

  setupNextGetInfo() {
    setTimeout(() => this.getInfo(), 1000);
  }

  async getInfo() {
    const { rpcConfig, pasteldSpawned, getinfoRetryCount } = this.state; // Try getting the info.

    try {
      const info = await RPC.getInfoObject(rpcConfig);
      console.log(info);
      const { setRPCConfig, setInfo } = this.props;
      setRPCConfig(rpcConfig);
      setInfo(info); // This will cause a redirect to the dashboard

      this.setState({
        loadingDone: true,
      });
    } catch (err) {
      // Not yet finished loading. So update the state, and setup the next refresh
      this.setState({
        currentStatus: err,
      });

      if (err === NO_CONNECTION && !pasteldSpawned) {
        // Try to start pasteld
        this.startPasteld();
        this.setupNextGetInfo();
      }

      if (err === NO_CONNECTION && pasteldSpawned && getinfoRetryCount < 10) {
        this.setState({
          currentStatus: "Waiting for pasteld to start...",
        });
        const inc = getinfoRetryCount + 1;
        this.setState({
          getinfoRetryCount: inc,
        });
        this.setupNextGetInfo();
      }

      if (err === NO_CONNECTION && pasteldSpawned && getinfoRetryCount >= 10) {
        // Give up
        this.setState({
          currentStatus: (
            <span>
              Failed to start pasteld. Giving up! Please look at the debug.log
              file.
              <br />
              <span
                className={cstyles.highlight}
              >{`${locatePastelConfDir()}/debug.log`}</span>
              <br />
              Please file an issue with Pastel Wallet
            </span>
          ),
        });
      }

      if (err !== NO_CONNECTION) {
        this.setupNextGetInfo();
      }
    }
  }

  handleEnableFastSync = (event) => {
    this.setState({
      enableFastSync: event.target.checked,
    });
  };
  handleTorEnabled = (event) => {
    this.setState({
      connectOverTor: event.target.checked,
    });
  };

  render() {
    const {
      loadingDone,
      currentStatus,
      creatingPastelConf,
      connectOverTor,
      enableFastSync,
    } = this.state; // If still loading, show the status

    if (!loadingDone) {
      return (
        <div className={[cstyles.center, styles.loadingcontainer].join(" ")}>
          {!creatingPastelConf && (
            <div className={cstyles.verticalflex}>
              <div
                style={{
                  marginTop: "100px",
                }}
              >
                <img src={Logo} width="200px;" alt="Logo" />
              </div>
              <div>{currentStatus}</div>
            </div>
          )}

          {creatingPastelConf && (
            <div>
              <div className={cstyles.verticalflex}>
                <div
                  className={[
                    cstyles.verticalflex,
                    cstyles.center,
                    cstyles.margintoplarge,
                    cstyles.highlight,
                  ].join(" ")}
                >
                  <div className={[cstyles.xlarge].join(" ")}>
                    {" "}
                    Welcome To Pastel Wallet Fullnode!
                  </div>
                </div>

                <div
                  className={[cstyles.center, cstyles.margintoplarge].join(" ")}
                >
                  <img src={pasteldlogo} width="400px" alt="pasteldlogo" />
                </div>

                <div
                  className={[
                    cstyles.verticalflex,
                    cstyles.center,
                    cstyles.margintoplarge,
                  ].join(" ")}
                  style={{
                    width: "75%",
                    marginLeft: "15%",
                  }}
                >
                  <div>
                    Pastel Fullnode will download the{" "}
                    <span className={cstyles.highlight}>
                      entire Pastel Blockchain
                    </span>
                  </div>
                </div>

                <div
                  className={cstyles.left}
                  style={{
                    width: "75%",
                    marginLeft: "15%",
                  }}
                >
                  <div className={cstyles.margintoplarge} />
                  <div className={[cstyles.verticalflex].join(" ")}>
                    <div>
                      <input
                        type="checkbox"
                        onChange={this.handleTorEnabled}
                        defaultChecked={connectOverTor}
                      />
                      &nbsp; Connect over Tor
                    </div>
                    <div className={cstyles.sublight}>
                      Will connect over Tor. Please make sure you have the Tor
                      client installed and listening on port 9050.
                    </div>
                  </div>

                  <div className={cstyles.margintoplarge} />
                  <div className={[cstyles.verticalflex].join(" ")}>
                    <div>
                      <input
                        type="checkbox"
                        onChange={this.handleEnableFastSync}
                        defaultChecked={enableFastSync}
                      />
                      &nbsp; Enable Fast Sync
                    </div>
                    <div className={cstyles.sublight}>
                      When enabled, Pastel Wallet will skip some expensive
                      verifications of the pasteld blockchain when downloading.
                      This option is safe to use if you are creating a brand new
                      wallet.
                    </div>
                  </div>
                </div>

                <div className={cstyles.buttoncontainer}>
                  <button
                    type="button"
                    className={cstyles.primarybutton}
                    onClick={this.createPastelconf}
                  >
                    Start Pastel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    return <Redirect to={routes.DASHBOARD} />;
  }
}

export default withRouter(LoadingScreen);
