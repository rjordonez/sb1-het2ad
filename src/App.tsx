import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import ReportDetail from './pages/ReportDetail';
import GrammarAnalysis from './pages/GrammarAnalysis';
import AICoach from './pages/AICoach';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/report/:id" element={<ReportDetail />} />
            <Route path="/grammar" element={<GrammarAnalysis />} />
            <Route path="/ai-coach" element={<AICoach />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;