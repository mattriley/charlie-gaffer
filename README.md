# Charlie Moukbel

## Deployment

1. Add environment variables to `setenv.sh`.
2. Run `. setenv.sh [stage]` to source environment variables.
3. Run `cd projects/web-backend && npm run deploy` to deploy the backend.
4. If the endpoint URL has changed, copy it to `setenv.sh` and source it again.
5. Run `cd projects/web-frontend && npm run deploy` to deploy the frontend.

## TODO

- Review usage of webpack and ensure easy local testing of frontend.