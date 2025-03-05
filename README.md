# Notes App

A simple note-taking application built with Next.js and AWS services.

## Deployment Steps

### 1. Create Backend Resources

1. Create DynamoDB Table:

   - Go to AWS Console → DynamoDB
   - Create new table named "Notes"
   - Primary key: "id" (String)
   - Use default settings for rest

2. Create Lambda Function:

   - Go to AWS Console → Lambda
   - Create function
     - Name: "notesHandler"
     - Runtime: Node.js 18.x
     - Create new role with basic Lambda permissions
   - Copy code from `backend/function/notesHandler/index.js` into Lambda editor
   - Add environment variable:
     - Key: `NOTES_TABLE`
     - Value: `Notes`

3. Update Lambda IAM Role:

   - Go to the Lambda function's configuration
   - Click on the execution role
   - Add policy for DynamoDB access:
     ```json
     {
       "Version": "2012-10-17",
       "Statement": [
         {
           "Effect": "Allow",
           "Action": [
             "dynamodb:GetItem",
             "dynamodb:PutItem",
             "dynamodb:DeleteItem",
             "dynamodb:UpdateItem",
             "dynamodb:Scan"
           ],
           "Resource": "arn:aws:dynamodb:*:*:table/Notes"
         }
       ]
     }
     ```

4. Create API Gateway:
   - Go to AWS Console → API Gateway
   - Create new REST API
   - Create resources and methods:
     - `/notes`:
       - GET: List all notes
       - POST: Create note
     - `/notes/{id}`:
       - GET: Get single note
       - PUT: Update note
       - DELETE: Delete note
   - For each method:
     - Integration type: Lambda Function
     - Lambda Function: notesHandler
   - Enable CORS for all methods
   - Deploy API to "prod" stage
   - Copy the Invoke URL

### 2. Deploy Frontend

1. Push code to GitHub

2. Set up in Amplify Console:
   - Go to AWS Console → Amplify
   - Click "New app" → "Host web app"
   - Connect to your GitHub repository
   - Add environment variables:
     - `NEXT_PUBLIC_API_ENDPOINT`: Your API Gateway Invoke URL
     - `NEXT_PUBLIC_AWS_REGION`: Your AWS region
   - Click "Save and deploy"

That's it! Amplify will build and host your frontend application.

## Environment Variables

Frontend (set in Amplify Console):

- `NEXT_PUBLIC_API_ENDPOINT`: Your API Gateway Invoke URL
- `NEXT_PUBLIC_AWS_REGION`: Your AWS region

Backend (set in Lambda):

- `NOTES_TABLE`: "Notes"

## Technology Stack

- Frontend:

  - Next.js
  - React
  - AWS Amplify UI React
  - TypeScript

- Backend:
  - AWS Lambda (Node.js 18.x)
  - Amazon DynamoDB
  - Amazon API Gateway

## Local Development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env.local`:

   ```
   NEXT_PUBLIC_API_ENDPOINT=your-api-gateway-url
   NEXT_PUBLIC_AWS_REGION=your-aws-region
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

## Important Notes

- Make sure to enable CORS in API Gateway
- The Lambda function needs proper permissions to access DynamoDB
- API Gateway endpoints should be HTTPS
- Wait for backend resources to be created before deploying frontend
