#!/usr/bin/env bash

export STAGE=${1:-test}

PROD_DOMAIN_NAME="charliemoukbel.com"

export AWS_REGION="ap-southeast-2"
export HOSTED_ZONE="$PROD_DOMAIN_NAME."
export GOOGLE_RECAPTCHA_SITE_KEY="6LeQMAsUAAAAAAm_KMxWOIpbdt3Lzung3U0Jaseh"
export GOOGLE_ANALYTICS_TRACKING_ID="UA-86847178-1"
export DOMAIN_NAME="$STAGE.$PROD_DOMAIN_NAME"
export API_URL="https://api.$PROD_DOMAIN_NAME/$STAGE"
export CAPTCHA_ENABLED="1"

if [ $STAGE = "prod" ]
then
    export DOMAIN_NAME=$PROD_DOMAIN_NAME
    export CAPTCHA_ENABLED="1"
fi
