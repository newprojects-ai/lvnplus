import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, AlertCircle } from 'lucide-react';

export function TestPage() {
  const { subject, testId } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Mock test data - in a real app, this would come from an API
  const test = {
    id: testId,
    subject: subject,
    title: subject === 'mathematics' ? 'Numbers and Operations' : 'Grammar and Punctuation',
    timeLimit: 15,
    questions: [
      {
        id: '1',
        question: subject === 'mathematics' 
          ? 'What is 15% of 200?' 
          : 'Which sentence uses the correct form of "their"?',
        options: subject === 'mathematics'
          ? ['20', '30', '40', '50']
          : [
              'They\'re going to the store.',
              'Their going to the store.',
              'There going to the store.',
              'Theyre going to the store.'
            ],
        correctAnswer: subject === 'mathematics' ? '30' : 'They\'re going to the store.'
      },
      // Add more questions as needed
    ]
  };

  useEffect(() => {
    setTimeLeft(test.timeLimit * 60);
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

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    // In a real app, you would send the results to an API
    setTimeout(() => {
      navigate('/progress');
    }, 3000);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!test) {
    return <div>Loading...</div>;
  }

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
          <h1 className="text-2xl font-bold">{test.title}</h1>
          <div className="flex items-center space-x-2 text-gray-600">
            <Clock className="h-5 w-5" />
            <span className="font-medium">{formatTime(timeLeft)}</span>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">
              Question {currentQuestion + 1} of {test.questions.length}
            </h2>
            <span className="text-sm text-gray-500">
              {answers[currentQuestion] ? 'Answered' : 'Not answered'}
            </span>
          </div>

          <p className="text-lg mb-6">{test.questions[currentQuestion].question}</p>

          <div className="space-y-4">
            {test.questions[currentQuestion].options?.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className={`w-full text-left p-4 rounded-lg border ${
                  answers[currentQuestion] === option
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
            disabled={currentQuestion === 0}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50"
          >
            Previous
          </button>
          
          {currentQuestion === test.questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Submit Test
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestion((prev) => Math.min(test.questions.length - 1, prev + 1))}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}