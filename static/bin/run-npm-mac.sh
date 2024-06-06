#!/bin/sh

# Set the PATH to include the directory with your bundled node binary
export PATH=/Applications/Pastel\ Wallet\ Fullnode.app/Contents/Resources/node-mac/bin:$PATH

# Run npm command
/Applications/Pastel\ Wallet\ Fullnode.app/Contents/Resources/node-mac/bin/node /Applications/Pastel\ Wallet\ Fullnode.app/Contents/Resources/node-mac/bin/npm "$@"