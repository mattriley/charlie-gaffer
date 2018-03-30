# Charlie Moukbel

This is Charlie Moukbel's website for his Gaffer business.
It consists of a portfolio and a "contact me" form.

This repository contains 2 projects: 

- `web-backend`: A serverless application to serve "contact me" requests hosted on API Gateway and Lambda. It stores a copy of each message in DynamoDB, and emails the message using SES.
- `web-frontend`: A React.js application hosted on S3.

## Deployment

Once only:

- Create an AWS profile named `charliemoukbel` with sufficient permission to provision the stack.

To deploy:

1. `. ./setcreds.sh` to export the AWS credentials from the `charliemoukbel` profile as environment variables.
2. `cd` to the desired project directory.
3. `STAGE=prod ./batect deploy`. Omitting `STAGE` will default to `test`.

## Future Improvements

- Front-end unit tests and test coverage.
- Document any manual configuration on AWS, e.g. domain name, certificate, SES approved emails.
- Create a provisioning role with least access required.
- Document build process.