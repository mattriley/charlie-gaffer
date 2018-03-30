#!/usr/bin/env bash

PROD_DOMAIN="charliemoukbel.com"
NONPROD_TO_ADDRESS="matthewriley.charliemoukbel+$STAGE@gmail.com"

export AWS_REGION="ap-southeast-2"
export AWS_SES_REGION="us-west-2"
export AWS_SES_IDENTITY=$PROD_DOMAIN
export MESSAGES_TABLE_NAME="messages-$STAGE"
export GOOGLE_RECAPTCHA_SITE_KEY="6LeQMAsUAAAAAAm_KMxWOIpbdt3Lzung3U0Jaseh"
export GOOGLE_RECAPTCHA_SECRET_KEY=`aws ssm get-parameter --region $AWS_REGION --name google_recaptcha_secret_key --with-decryption | jq -r '.Parameter.Value'`
export ALERTS_TO_ADDRESS=$NONPROD_TO_ADDRESS
export NOTIFICATION_TO_ADDRESS=$NONPROD_TO_ADDRESS
export NOTIFICATION_FROM_ADDRESS="$PROD_DOMAIN <noreply@$PROD_DOMAIN>"

if [ $STAGE = "prod" ]
then
    export NOTIFICATION_TO_ADDRESS="cmoukbel@hotmail.com"
fi
