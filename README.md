# People Picker

## Environment Variables

### `CHARLIEMOUKBEL_ENV`
 
Used to namespace all resources for the given environment. 

- Default: `dev-$USER`
- Production: `prod`

## External Dependencies

### [AWS](https://matthewriley.signin.aws.amazon.com/console)

...

### [Heroku](https://id.heroku.com/login)

Platform as a service.

## System

### Setup

- Create an IAM User in AWS and add to the `charliemoukbel--deployers` group
- Generate an Access Key for the IAM User and store under an AWS profile named `charliemoukbel-deploy`
  - `aws configure --profile charliemoukbel--deploy`

## Apps

### Web API

### Setup

- Create a Heroku Application named `charliemoukbel--$CHARLIEMOUKBEL_ENV`
  - `heroku login`
  - `heroku create charliemoukbel--$CHARLIEMOUKBEL_ENV`
  
### Web Client

...