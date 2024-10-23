import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';

export default function ReportDetail() {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [timelineData, setTimelineData] = useState([]);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const SPREADSHEET_ID = '13uUD-6Oz56MQpQ2BD07kSWCGVRZ2w_Wy3oI8pe7LNqc';
        const RANGE = 'Sheet1!A2:G100'; // Adjust range to include all data
        const API_KEY = 'AIzaSyBu54-s1mBVoyK6H9KOkco8Q1q6HWlu7es';

        const response = await axios.get(
          `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`
        );

        const rows = response.data.values;

        // Parse the data from the spreadsheet
        const parsedReports = rows.map((row, index) => ({
          id: index + 1, // Generate a report ID dynamically
          name: row[0] || 'Unknown', // Name
          sessionId: row[1] || 'Unknown', // Session ID
          fluency: Number(row[2]) || 0, // Fluency
          pronunciation: Number(row[3]) || 0, // Pronunciation
          intonationAndStress: row[4] || 'Not Available', // Intonation & Stress
          sentenceStructure: Number(row[5]) || 0, // Sentence Structure
          grammar: Number(row[6]) || 0, // Grammar
        }));

        const reportId = parseInt(id, 10);
        const selectedReport = parsedReports.find((r) => r.id === reportId);

        if (selectedReport) {
          setReport(selectedReport);

          // Filter all sessions for the same user
          const userSessions = parsedReports.filter(
            (r) => r.name === selectedReport.name
          );

          // Prepare timeline data
          const timeline = userSessions.map((session, idx) => ({
            session: idx + 1,
            fluency: session.fluency,
            pronunciation: session.pronunciation,
            sentenceStructure: session.sentenceStructure,
            grammar: session.grammar,
          }));

          setTimelineData(timeline);
        } else {
          setReport(null);
        }
      } catch (error) {
        console.error('Error fetching report data:', error);
      }
    };

    fetchReport();
  }, [id]);

  if (!report) {
    return <div>Loading...</div>;
  }

  const radarData = [
    {
      subject: 'Fluency',
      value: report.fluency,
      fullMark: 100,
    },
    {
      subject: 'Pronunciation',
      value: report.pronunciation,
      fullMark: 100,
    },
    {
      subject: 'Sentence Structure',
      value: report.sentenceStructure,
      fullMark: 100,
    },
    {
      subject: 'Grammar',
      value: report.grammar,
      fullMark: 100,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Speaking Report</h1>
            <p className="text-gray-500">Session ID: {report.sessionId}</p>
            <p className="text-gray-500">Name: {report.name}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Performance Over Time</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="session"
                    label={{ value: 'Session', position: 'bottom' }}
                  />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="fluency"
                    stroke="#8884d8"
                    name="Fluency"
                  />
                  <Line
                    type="monotone"
                    dataKey="pronunciation"
                    stroke="#82ca9d"
                    name="Pronunciation"
                  />
                  <Line
                    type="monotone"
                    dataKey="sentenceStructure"
                    stroke="#ffc658"
                    name="Sentence Structure"
                  />
                  <Line
                    type="monotone"
                    dataKey="grammar"
                    stroke="#ff7300"
                    name="Grammar"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Overall Performance</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar
                    name="Performance"
                    dataKey="value"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Detailed Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(report).map(([key, value]) => {
              if (
                ['fluency', 'pronunciation', 'sentenceStructure', 'grammar'].includes(
                  key
                )
              ) {
                return (
                  <div key={key} className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-600 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                    <p className="text-xl font-semibold text-gray-900">{value}</p>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}