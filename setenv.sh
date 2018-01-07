#!/usr/bin/env bash

export STAGE=${1:-dev}
export AWS_PROFILE="charliemoukbel-deploy"
export AWS_SES_REGION="us-west-2"
export AWS_SES_IDENTITY="charliemoukbel.com"
export NOTIFICATION_FROM_ADDRESS="charliemoukbel.com <noreply@charliemoukbel.com>"
export GOOGLE_RECAPTCHA_SITE_KEY="6LeQMAsUAAAAAAm_KMxWOIpbdt3Lzung3U0Jaseh"
export GOOGLE_ANALYTICS_TRACKING_ID="UA-86847178-1"
export HOSTED_ZONE="charliemoukbel.com."
export MESSAGES_TABLE_NAME="messages-$STAGE"

if [ $STAGE = "dev" ]
then
    export STAGE="dev"
    export NOTIFICATION_TO_ADDRESS="matthewriley.charliemoukbel@gmail.com"
    export DOMAIN_NAME="dev.charliemoukbel.com"
    export API_URL="https://75bsmtwvu3.execute-api.ap-southeast-2.amazonaws.com/dev"

elif [ $STAGE = "prod" ]
then
    export STAGE="prod"
    export NOTIFICATION_TO_ADDRESS="cmoukbel@hotmail.com"
    export DOMAIN_NAME="charliemoukbel.com"
    export API_URL=""
else
    echo "Unknown stage: $STAGE"
fi