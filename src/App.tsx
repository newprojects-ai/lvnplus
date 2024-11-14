import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { Home } from './pages/Home';
import { Mathematics } from './pages/Mathematics';
import { English } from './pages/English';
import { Progress } from './pages/Progress';
import { TestPage } from './pages/TestPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mathematics" element={<Mathematics />} />
            <Route path="/english" element={<English />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/test/:subject/:testId" element={<TestPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;