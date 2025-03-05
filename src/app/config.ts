import { Amplify } from "aws-amplify";

Amplify.configure({
  API: {
    REST: {
      notesApi: {
        endpoint: process.env.NEXT_PUBLIC_API_ENDPOINT || "",
        region: process.env.NEXT_PUBLIC_AWS_REGION || "us-east-1",
      },
    },
  },
});
