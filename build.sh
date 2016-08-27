#!/bin/bash
#
# auto deploy will call this script after `svn up && mv to target`
#
#

export LANG=en_US.UTF-8

declare -r __PWD__=$(pwd)
declare -r __USER__=$(whoami)
declare -r CUR_VERSION=`date "+%Y%m%d%H%M%S"`

echo $PATH

nvm install 4.1.2 && nvm use 4.1.2 && node -v || exit 1 
echo "nodejs install done!"
 
npm install -g tnpm --registry=http://registry.npm.alibaba-inc.com
echo "tnpm install done!"

echo "${__USER__} build version@${CUR_VERSION} ..."
cd $(dirname -- "${0}")

# remove all change files first
echo "git clean -xfd"
git checkout ./
git clean -xfd

# make release
if [ ${?} -ne 0 ] ; then
    echo "build assets failed!!!"
    exit 1;
fi

declare __ENV__=unknow
envType=$1
declare __ENV__=${envType}
case $envType in
    daily )
    # 日常
    __ENV__="daily"
    ;;
    prepub )
    # 预发
    __ENV__="pre"
    ;;
    # 生产
    publish )
    __ENV__="prod"
    ;;
    * )
    # 默认为日常
    __ENV__="admin"
    ;;

esac

echo "------------- config env: ${__ENV__} -------------------"
tnpm install
tnpm run build
echo "mobilefe build success!!!"
exit 0
