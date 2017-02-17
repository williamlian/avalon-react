#!/bin/sh
ssh -i ~/.ssh/william_aws.pem william@52.89.25.255 'cd /home/william/avalon-react && git pull && rm -rf node_modules && npm install && npm build'