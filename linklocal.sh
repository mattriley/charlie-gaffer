#!/bin/bash

NODE_PACKAGE_FILES=`find ./modules -name package.json | grep -v node_modules`

for NODE_PACKAGE_FILE in ${NODE_PACKAGE_FILES}
do
    NODE_PACKAGE_DIR=`dirname ${NODE_PACKAGE_FILE}`
    echo
    echo Linking \"${NODE_PACKAGE_DIR}\"
    (cd ${NODE_PACKAGE_DIR} && linklocal -r)
done