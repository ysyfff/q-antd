#!/usr/local/env bash

rm -rf q-antd-2.2.29.tgz
yarn compile
npm pack
cd ~/project/音箱/merchant_fe && yarn add ~/project/q-antd/q-antd-2.2.29.tgz