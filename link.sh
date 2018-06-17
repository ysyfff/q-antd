#!/usr/local/env bash

set -e;

cd ~/project/q-antd
yarn compile
npm link
cd ~/project/音箱/merchant_fe
npm link q-antd
