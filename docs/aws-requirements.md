# App Migration to AWS

## Resources Used
[AWS tutorial that covers a lot of functionality in this app](https://aws.amazon.com/getting-started/projects/build-serverless-web-app-lambda-apigateway-s3-dynamodb-cognito/)

## Info
- Operating System: Linux Ubuntu is completely fine, e.g. app can be packaged as Dockerfile
    - The OS distribution just requires Node 10.15 & NPM

## Possible Steps
1. [Migrate static assets to S3](https://aws.amazon.com/getting-started/projects/build-serverless-web-app-lambda-apigateway-s3-dynamodb-cognito/module-1/)
    - Move static images to S3
2. [User Management](https://aws.amazon.com/getting-started/projects/build-serverless-web-app-lambda-apigateway-s3-dynamodb-cognito/module-2/)
    - create Cognito user pool
    - enable customers to register, verify their email adress, and sign into site
3. [Serverless backend](https://aws.amazon.com/getting-started/projects/build-serverless-web-app-lambda-apigateway-s3-dynamodb-cognito/module-3/)
    - create DynamoDB table
    - create IAM roles for lambda functions
3. [Deploy to API Gateway](https://aws.amazon.com/getting-started/projects/build-serverless-web-app-lambda-apigateway-s3-dynamodb-cognito/module-4/)


## Possible AWS tools used:
- CodeStar (for entire app development)
- AWS S3: Host the images used for app
- AWS Cognito - User management and authentication
- AWS DynamoDB - NoSQL database that can store data using Lambda APIs
- AWS Lambda - Serverless functions
- AWS API Gateway
