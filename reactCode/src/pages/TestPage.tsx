import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, AlertCircle, Send } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

interface Question {
  id: number;
  latex: string;
  answer: string;
}

const questions: Question[] = [
  { id: 1, latex: '11.56 - 6.41', answer: '' },
  { id: 2, latex: '3.2 \\times 0.8', answer: '' },
  { id: 3, latex: '7.5 \\times 0.04', answer: '' },
  { id: 4, latex: '\\frac{4.56}{1.2}', answer: '' },
  { id: 5, latex: '\\frac{0.75}{0.25}', answer: '' },
  { id: 6, latex: '\\frac{2}{3} + \\frac{4}{9}', answer: '' },
  { id: 7, latex: '\\frac{3}{5} - \\frac{1}{4}', answer: '' },
  { id: 8, latex: '\\frac{3}{8} \\times \\frac{1}{4}', answer: '' },
  { id: 9, latex: '\\frac{3}{4} \\div \\frac{1}{3}', answer: '' },
  { id: 10, latex: '\\text{LCM of 12 and 18}', answer: '' }
];

export function TestPage() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    // In a real app, you would send the answers to an API
    setTimeout(() => {
      navigate('/progress');
    }, 3000);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (isSubmitted) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Test Completed!</h2>
        <p className="text-gray-600">Redirecting to your progress page...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Mathematics Test</h1>
          <div className="flex items-center space-x-2 text-gray-600">
            <Clock className="h-5 w-5" />
            <span className="font-medium">{formatTime(timeLeft)}</span>
          </div>
        </div>

        <div className="space-y-8">
          {questions.map((question) => (
            <div key={question.id} className="p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-4">
                  <span className="font-medium text-gray-600">Question {question.id}</span>
                  <div className="text-xl">
                    <InlineMath math={question.latex} />
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <input
                  type="text"
                  value={answers[question.id] || ''}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  placeholder="Enter your answer"
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center space-x-2"
          >
            <span>Submit Test</span>
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}