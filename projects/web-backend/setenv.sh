#!/usr/bin/env bash

export STAGE=${1:-test}
export AWS_REGION="ap-southeast-2"
export AWS_SES_REGION="us-west-2"
export AWS_SES_IDENTITY="charliemoukbel.com"
export MESSAGES_TABLE_NAME="messages-$STAGE"
export GOOGLE_RECAPTCHA_SITE_KEY="6LeQMAsUAAAAAAm_KMxWOIpbdt3Lzung3U0Jaseh"
export GOOGLE_RECAPTCHA_SECRET_KEY=`aws ssm get-parameter --region $AWS_REGION --name google_recaptcha_secret_key --with-decryption | jq -r '.Parameter.Value'`
export ALERTS_TO_ADDRESS="matthewriley.charliemoukbel@gmail.com"
export NOTIFICATION_TO_ADDRESS="matthewriley.charliemoukbel+$STAGE@gmail.com"
export NOTIFICATION_FROM_ADDRESS="$DOMAIN_NAME <noreply@$DOMAIN_NAME>"
export CAPTCHA_ENABLED="0"

if [ $STAGE = "prod" ]
then
    export NOTIFICATION_TO_ADDRESS="cmoukbel@hotmail.com"
    export CAPTCHA_ENABLED="1"
fi
