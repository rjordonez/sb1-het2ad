import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Trash2 } from 'lucide-react';

interface Report {
  id: number;
  name: string;
  fluency: number;
  pronunciation: number;
  intonationAndStress: string;
  sentenceStructure: number;
  grammar: number;
  sessionId: string;
}

export default function Dashboard() {
  const [reports, setReports] = useState<Report[]>([]);
  const [starredReports, setStarredReports] = useState<number[]>([]);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

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

        const rows = response.data.values || [];

        // Parse the data from the spreadsheet
        const parsedReports = rows.map((row: any[], index: number) => ({
          id: index + 1, // Generate a report ID dynamically
          name: `Report ${index + 1}`,
          fluency: Number(row[2]) || 0, // Fluency
          pronunciation: Number(row[3]) || 0, // Pronunciation
          intonationAndStress: row[4] || 'Not Available', // Intonation & Stress
          sentenceStructure: Number(row[5]) || 0, // Sentence Structure
          grammar: Number(row[6]) || 0, // Grammar
          sessionId: row[1] || 'Unknown', // Session ID
        }));

        setReports(parsedReports);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Function to handle star click
  const handleStarClick = (reportId: number) => {
    setStarredReports((prevStarredReports) => {
      if (prevStarredReports.includes(reportId)) {
        // If already starred, remove it
        return prevStarredReports.filter((id) => id !== reportId);
      } else {
        // If not starred, add it
        return [...prevStarredReports, reportId];
      }
    });
  };

  // Function to handle delete report
  const handleDeleteReport = (reportId: number) => {
    setReports((prevReports) => {
      const updatedReports = prevReports.filter((report) => report.id !== reportId);

      // Reassign report IDs and names after deletion
      return updatedReports.map((report, index) => ({
        ...report,
        id: index + 1,
        name: `Report ${index + 1}`,
      }));
    });

    // Also remove from starredReports if it's starred
    setStarredReports((prevStarredReports) =>
      prevStarredReports.filter((id) => id !== reportId)
    );
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Speaking Reports</h1>
        <button
          onClick={toggleEditMode}
          className="text-indigo-600 font-medium hover:underline focus:outline-none"
        >
          {isEditMode ? 'Done' : 'Edit'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <Link
            key={report.id}
            to={isEditMode ? '#' : `/report/${report.id}`}
            className={`bg-white rounded-xl shadow-sm transition-shadow p-6 border ${
              isEditMode ? 'border-red-500' : 'border-gray-100 hover:shadow-md'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{report.name}</h3>
                <p className="text-sm text-gray-500">Session ID: {report.sessionId}</p>
              </div>
              {isEditMode ? (
                <Trash2
                  onClick={(e) => {
                    e.preventDefault(); // Prevent navigation if the icon is inside a Link
                    handleDeleteReport(report.id);
                  }}
                  className="h-6 w-6 text-red-500 cursor-pointer"
                />
              ) : (
                <Star
                  onClick={(e) => {
                    e.preventDefault(); // Prevent navigation if the star is inside a Link
                    handleStarClick(report.id);
                  }}
                  className={`h-6 w-6 cursor-pointer ${
                    starredReports.includes(report.id) ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                />
              )}
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

            {!isEditMode && (
              <div className="mt-4 flex justify-end">
                <div className="flex items-center text-indigo-600 text-sm font-medium">
                  View Details
                  <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}