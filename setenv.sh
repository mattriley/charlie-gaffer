#!/usr/bin/env bash

export STAGE=${1:-test}
export AWS_PROFILE="charliemoukbel"
export AWS_SES_REGION="us-west-2"
export AWS_SES_IDENTITY="charliemoukbel.com"
export HOSTED_ZONE="charliemoukbel.com."
export MESSAGES_TABLE_NAME="messages-$STAGE"
export GOOGLE_RECAPTCHA_SITE_KEY="6LeQMAsUAAAAAAm_KMxWOIpbdt3Lzung3U0Jaseh"
export GOOGLE_ANALYTICS_TRACKING_ID="UA-86847178-1"

if [ $STAGE = "test" ]
then
    export NOTIFICATION_TO_ADDRESS="matthewriley.charliemoukbel@gmail.com"
    export DOMAIN_NAME="test.charliemoukbel.com"
    export API_URL="https://fsbsjkefs5.execute-api.ap-southeast-2.amazonaws.com/test"
    export CAPTCHA_ENABLED=0

elif [ $STAGE = "prod" ]
then
    export NOTIFICATION_TO_ADDRESS="cmoukbel@hotmail.com"
    export DOMAIN_NAME="charliemoukbel.com"
    export API_URL="https://i2z0fo0hqj.execute-api.ap-southeast-2.amazonaws.com/prod"
    export CAPTCHA_ENABLED=1
else
    echo "Unknown stage: $STAGE"
fi

export NOTIFICATION_FROM_ADDRESS="$DOMAIN_NAME <noreply@$DOMAIN_NAME>"