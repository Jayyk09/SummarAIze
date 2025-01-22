import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Import BrowserRouter for routing
import './index.css';
import App from './App.tsx';
import ChatBox from './content/content.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/content/content" element={<ChatBox />} />
        {/* Handle unmatched routes by redirecting to the homepage */}
        <Route path="*" element={<App />} /> {/* This redirects to the main page if no route matches */}
      </Routes>
    </Router>
  </StrictMode>,
);
