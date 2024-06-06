#!/bin/sh

# Set the PATH to include the directory with your bundled node binary
export PATH=/usr/lib/pastelwallet/resources/node-linux/bin:$PATH

# Run npm command
/usr/lib/pastelwallet/resources/node-linux/bin/node /usr/lib/pastelwallet/resources/node-linux/bin/npm "$@"