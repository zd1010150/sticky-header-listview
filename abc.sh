#!/bin/sh

tnpm ii
webpack --config tools/webpack.config.prod.js

ls $BUILD_DEST
