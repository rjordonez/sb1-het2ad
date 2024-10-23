import React from 'react';
import { AlertCircle } from 'lucide-react';

const grammarSuggestions = [
  {
    id: 1,
    original: "I think the movie was very good",
    improved: "I found the movie exceptional",
    explanation: "More precise and engaging vocabulary choice"
  },
  {
    id: 2,
    original: "I went to store yesterday",
    improved: "I went to the store yesterday",
    explanation: "Missing article 'the'"
  },
  {
    id: 3,
    original: "The data are showing interesting results",
    improved: "The data shows interesting results",
    explanation: "Subject-verb agreement correction"
  }
];

export default function GrammarAnalysis() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Grammar Analysis</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="space-y-6">
          {grammarSuggestions.map((suggestion) => (
            <div key={suggestion.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-amber-500 mt-1" />
                <div className="flex-1">
                  <div className="space-y-2">
                    <p className="text-gray-800">
                      Original: <span className="line-through text-red-500">{suggestion.original}</span>
                    </p>
                    <p className="text-gray-800">
                      Improved: <span className="text-green-600 font-medium">{suggestion.improved}</span>
                    </p>
                    <p className="text-sm text-gray-600">{suggestion.explanation}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}