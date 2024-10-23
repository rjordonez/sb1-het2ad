import React, { useEffect } from 'react';
import { MessageSquare } from 'lucide-react';

declare global {
  interface Window {
    PlayAI?: {
      open: (id: string) => void;
      close?: () => void; // Optional close function if available
    };
  }
}

export default function AICoach() {
  useEffect(() => {
    const scriptId = 'playai-script';

    // Function to initialize PlayAI
    const initializePlayAI = () => {
      if (window.PlayAI) {
        window.PlayAI.open('Ioc8vkO1DE3RQW53fJki_'); // Replace with your actual PlayAI ID
      } else {
        console.error('PlayAI is not available on the window object.');
      }
    };

    // Load the PlayAI script dynamically into the <head>
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://unpkg.com/@play-ai/web-embed';
      script.async = true;
      script.onload = initializePlayAI;
      script.onerror = () => {
        console.error('Failed to load the PlayAI script.');
      };
      document.head.appendChild(script); // Append the script to the <head> instead of <body>
    } else {
      // If the script is already loaded, just initialize PlayAI
      initializePlayAI();
    }

    // Cleanup when the component unmounts
    return () => {
      // If PlayAI has a close function, call it to close the widget (optional)
      if (window.PlayAI?.close) {
        window.PlayAI.close();
      }

      // Optionally, remove the script from the <head> when leaving the page (optional)
      const scriptElement = document.getElementById(scriptId);
      if (scriptElement) {
        scriptElement.parentNode?.removeChild(scriptElement);
      }
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">AI Language Coach</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-8 text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="inline-block p-3 bg-indigo-100 rounded-full">
            <MessageSquare className="h-8 w-8 text-indigo-600" />
          </div>

          <h2 className="text-2xl font-semibold text-gray-900">
            Practice with Your AI Language Coach
          </h2>

          <p className="text-gray-600">
            Start a conversation with your AI language coach to practice your speaking skills.
            When you're ready to end the session, simply say "send a report" to receive your
            detailed performance analysis.
          </p>

          <div className="bg-indigo-50 p-4 rounded-lg mt-6">
            <p className="text-indigo-700 font-medium">
              💡 Tip: Speak naturally and don't worry about making mistakes.
              Your AI coach will help you improve!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}