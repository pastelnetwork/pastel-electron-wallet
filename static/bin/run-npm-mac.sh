#!/bin/sh

# Set the PATH to include the directory with your bundled node binary
export PATH="$(dirname "$0")/node-mac/bin:$PATH"

# Run npm command
"$(dirname "$0")/node-mac/bin/node" "$(dirname "$0")/node-mac/bin/lib/node_modules/npm/bin/npm-cli.js" "$@"