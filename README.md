# Notes App

A simple note-taking application built with Next.js, AWS Amplify, and DynamoDB.

## Features

- Create, read, update, and delete notes
- Serverless backend using AWS Lambda and DynamoDB
- Modern UI with Amplify UI React components
- Responsive design

## Deployment Instructions

### 1. Prerequisites

- AWS Account
- Git repository (GitHub, GitLab, or BitBucket)
- Node.js and npm installed

### 2. Required Environment Variables

Frontend Environment Variables (set in Amplify Console):

- `NEXT_PUBLIC_AWS_REGION`: Your AWS region (e.g., us-east-1)
- `NEXT_PUBLIC_API_ENDPOINT`: Your API Gateway endpoint URL (instructions below)

Backend Environment Variables (automatically set):

- `NOTES_TABLE`: DynamoDB table name (automatically set to "Notes")
- `AWS_NODEJS_CONNECTION_REUSE_ENABLED`: Enables connection reuse

### 3. Deploy via AWS Amplify Console

1. Push your code to your Git repository

2. Go to AWS Amplify Console

   - Sign in to your AWS Console
   - Navigate to AWS Amplify
   - Click "New App" → "Host Web App"
   - Connect to your Git provider and select your repository

3. Initial Build Settings

   - The build settings are already configured in `amplify.yml`
   - For now, just set:
     - `NEXT_PUBLIC_AWS_REGION`: Your AWS region (e.g., us-east-1)
   - We'll add the API endpoint after the first deployment

4. First Deploy
   - Click "Save and deploy"
   - This will deploy your backend resources first

### 4. Getting the API Endpoint URL

After the first deployment completes:

1. Go to AWS Console and navigate to API Gateway

   - From AWS Console homepage, search for "API Gateway" in the search bar
   - Click on "API Gateway" service

2. Find your API

   - In the API Gateway dashboard, you should see an API named like "notes-prod" or similar
   - Click on the API name

3. Get the API Endpoint URL
   - Look for "Invoke URL" at the top of the page
   - It should look something like: `https://abc123xyz.execute-api.us-east-1.amazonaws.com/prod`
   - Copy this URL - this is your `NEXT_PUBLIC_API_ENDPOINT`

### 5. Update Environment Variables

1. Go back to Amplify Console

   - Navigate to your app
   - Go to "Environment variables" under App settings

2. Add/Update Variables

   - Click "Add variable"
   - Add `NEXT_PUBLIC_API_ENDPOINT`
   - Paste the API Gateway Invoke URL you copied
   - Save

3. Redeploy
   - Go to your app's main page in Amplify Console
   - Click "Redeploy this version" to apply the new environment variable

## Local Development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env.local` file with:

   ```
   NEXT_PUBLIC_AWS_REGION=your-aws-region
   NEXT_PUBLIC_API_ENDPOINT=your-api-gateway-url
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

## Project Structure

- `/src/components` - React components
- `/src/contexts` - React context providers
- `/src/app` - Next.js app router pages
- `/amplify/backend` - AWS Amplify backend configuration
  - `/api` - API configuration
  - `/function` - Lambda function code

## Technology Stack

- Frontend:

  - Next.js 14
  - React
  - AWS Amplify UI React
  - TypeScript

- Backend:
  - AWS Lambda
  - Amazon DynamoDB
  - Amazon API Gateway
  - AWS Amplify

## Troubleshooting

If the API endpoint isn't working:

- Make sure you copied the full Invoke URL from API Gateway
- Verify the URL starts with `https://`
- Ensure you redeployed the app after adding the API endpoint
- Check API Gateway CORS settings (already configured in our setup)
- Verify the Lambda function has proper permissions (already set in our CloudFormation)
