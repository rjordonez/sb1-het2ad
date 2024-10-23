import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';

export default function Dashboard() {
  const [reports, setReports] = useState([]);

  // Fetch data from Google Sheets
  useEffect(() => {
    const fetchData = async () => {
      try {
        const SPREADSHEET_ID = '13uUD-6Oz56MQpQ2BD07kSWCGVRZ2w_Wy3oI8pe7LNqc';
        const RANGE = 'Sheet1!A2:G100'; // Adjust range as needed
        const API_KEY = 'AIzaSyBu54-s1mBVoyK6H9KOkco8Q1q6HWlu7es';

        const response = await axios.get(
          `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`
        );

        const rows = response.data.values;

        // Parse the data from the spreadsheet
        const parsedReports = rows.map((row, index) => ({
          id: index + 1, // Generate a report ID dynamically
          name: `Report ${index + 1}`,
          fluency: row[2] || 0, // Fluency
          pronunciation: row[3] || 0, // Pronunciation
          intonationAndStress: row[4] || 'Not Available', // Intonation & Stress
          sentenceStructure: row[5] || 0, // Sentence Structure
          grammar: row[6] || 0, // Grammar
          sessionId: row[1] || 'Unknown' // Session ID
        }));

        setReports(parsedReports);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Speaking Reports</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <Link
            key={report.id}
            to={`/report/${report.id}`}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{report.name}</h3>
                <p className="text-sm text-gray-500">Session ID: {report.sessionId}</p>
              </div>
              <Star className={`h-6 w-6 ${report.fluency >= 90 ? 'text-yellow-400' : 'text-gray-300'}`} />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Fluency</span>
                <div className="flex items-center">
                  <div className="w-32 h-2 bg-gray-200 rounded-full mr-2">
                    <div
                      className="h-full bg-indigo-600 rounded-full"
                      style={{ width: `${report.fluency}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{report.fluency}%</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Pronunciation</span>
                <div className="flex items-center">
                  <div className="w-32 h-2 bg-gray-200 rounded-full mr-2">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${report.pronunciation}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{report.pronunciation}%</span>
                </div>
              </div>

              {/* Ensure Grammar is displayed here */}
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Grammar</span>
                <div className="flex items-center">
                  <div className="w-32 h-2 bg-gray-200 rounded-full mr-2">
                    <div
                      className="h-full bg-purple-500 rounded-full"
                      style={{ width: `${report.grammar}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{report.grammar}%</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <div className="flex items-center text-indigo-600 text-sm font-medium">
                View Details
                <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
