#!/bin/bash

if [[ ! -d node_modules ]]; then
    echo -e '- npm install...'
    npm install
fi

# 强制拉取覆盖本地代码
git fetch --all; git reset --hard origin/main

# 构建生产版本
node_modules/.bin/ng build

# 修改index.html 相对路径
sed -i 's#base href="/en-US/"#base href="/"#' "dist/prague-clock/en-US/index.html"

# 替换新构建的静态文件
rm -rf '/mnt/user/appdata/NginxWebUI/www/prague-clock'
cp -rf 'dist/prague-clock/en-US' '/mnt/user/appdata/NginxWebUI/www/prague-clock'
