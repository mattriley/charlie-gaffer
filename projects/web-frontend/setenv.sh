#!/usr/bin/env bash

export STAGE=${1:-test}
export AWS_REGION="ap-southeast-2"
export HOSTED_ZONE="charliemoukbel.com."
export GOOGLE_RECAPTCHA_SITE_KEY="6LeQMAsUAAAAAAm_KMxWOIpbdt3Lzung3U0Jaseh"
export GOOGLE_ANALYTICS_TRACKING_ID="UA-86847178-1"

if [ $STAGE = "test" ]
then
    export DOMAIN_NAME="test.charliemoukbel.com"
    export API_URL="https://fsbsjkefs5.execute-api.ap-southeast-2.amazonaws.com/test"
    export CAPTCHA_ENABLED=0

elif [ $STAGE = "prod" ]
then
    export DOMAIN_NAME="charliemoukbel.com"
    export API_URL="https://i2z0fo0hqj.execute-api.ap-southeast-2.amazonaws.com/prod"
    export CAPTCHA_ENABLED=1
fi