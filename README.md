# Notes App

A simple note-taking application built with Next.js and AWS Amplify Gen 2.

## Features

- Create, read, update, and delete notes
- Serverless backend using AWS Lambda and DynamoDB
- Modern UI with Amplify UI React components
- Responsive design

## Prerequisites

- AWS Account
- Git repository (GitHub, GitLab, or BitBucket)
- Node.js and npm installed
- AWS Amplify CLI v3.0 or later installed:
  ```bash
  npm install -g @aws-amplify/cli@latest
  ```

## Deployment Instructions

### 1. Initial Setup with Amplify Gen 2

1. Clone and install dependencies:

   ```bash
   git clone <your-repo-url>
   cd my-amplify-app
   npm install
   ```

2. Deploy using Amplify Gen 2:

   ```bash
   amplify deploy
   ```

   This will:

   - Create your backend resources (API, Lambda, DynamoDB)
   - Configure permissions automatically
   - Return your API endpoint URL

3. Copy the API endpoint URL when deployment completes

### 2. Environment Variables Setup

Create a `.env.local` file for local development:

```bash
NEXT_PUBLIC_AWS_REGION=your-aws-region
NEXT_PUBLIC_API_ENDPOINT=your-api-endpoint
```

### 3. Deploy via AWS Amplify Console

1. Push your code to your Git repository

2. Go to AWS Amplify Console:

   - Sign in to AWS Console
   - Navigate to AWS Amplify
   - Click "New App" → "Host Web App"
   - Connect your Git provider and select your repository

3. Configure build settings:

   - Build settings are pre-configured in `amplify.yml`
   - Add environment variables:
     - `NEXT_PUBLIC_AWS_REGION`: Your AWS region
     - `NEXT_PUBLIC_API_ENDPOINT`: The API endpoint from step 1

4. Deploy:
   - Click "Save and deploy"
   - Amplify will build and deploy your application

## Project Structure

```
/
├── src/                      # Frontend source code
│   ├── app/                  # Next.js app directory
│   ├── components/          # React components
│   └── contexts/            # React contexts
├── backend/                 # Amplify Gen 2 backend
│   ├── api/                # API configurations
│   └── function/           # Lambda functions
├── amplify.config.js       # Amplify Gen 2 configuration
└── amplify.yml            # Amplify build settings
```

## Local Development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000)

## Backend Resources

This app creates the following AWS resources:

- **API Gateway**: REST API endpoint
- **Lambda Function**: Handles note operations
- **DynamoDB Table**: Stores notes
  - Table Name: Notes
  - Partition Key: id (String)

## Troubleshooting

1. Deployment Issues:

   - Ensure you're using Amplify CLI v3.0 or later
   - Verify AWS credentials are properly configured
   - Check CloudWatch Logs for Lambda errors

2. API Issues:

   - Verify environment variables are set correctly
   - Check CORS settings in API Gateway
   - Ensure Lambda has proper permissions

3. Build Errors:
   - Check build logs in Amplify Console
   - Verify Node.js version compatibility
   - Ensure all dependencies are installed

## Technology Stack

- **Frontend**:

  - Next.js 14
  - React
  - AWS Amplify UI React
  - TypeScript

- **Backend**:
  - AWS Lambda (Node.js 18.x)
  - Amazon DynamoDB
  - Amazon API Gateway
  - AWS Amplify Gen 2

## Important Notes

- This project uses Amplify Gen 2 for improved developer experience
- The backend is configured using code-first approach
- All AWS resources are defined in `amplify.config.js`
- SSR support is configured in build settings
