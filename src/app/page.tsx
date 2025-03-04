"use client";

import { useState } from "react";

export default function Home() {
  const [message] = useState("Welcome to Next.js + AWS Amplify");

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-24">
      <div className="max-w-5xl w-full">
        <h1 className="text-4xl font-bold text-center mb-8">{message}</h1>
        <p className="text-center text-xl mb-4">
          Your Next.js application is ready to be deployed to AWS Amplify
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div className="border border-gray-300 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Next.js 14 App Router</li>
              <li>TypeScript</li>
              <li>Tailwind CSS</li>
              <li>AWS Amplify Integration</li>
              <li>ESLint Configuration</li>
            </ul>
          </div>
          <div className="border border-gray-300 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Next Steps</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Connect to AWS Amplify Console</li>
              <li>Set up environment variables</li>
              <li>Deploy your application</li>
              <li>Add authentication (optional)</li>
              <li>Add API integration (optional)</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
