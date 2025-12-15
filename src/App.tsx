import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useQuizStore } from './store/quizStore';
import { useQuizPersistence } from './hooks/useQuizPersistence';
import StartPage from './components/start/StartPage';
import QuizPage from './components/quiz/QuizPage';
import ResultsPage from './components/results/ResultsPage';

function App() {
  const currentPage = useQuizStore((state) => state.currentPage);

  // Load saved state from localStorage
  useQuizPersistence();

  // Set page title based on current page
  useEffect(() => {
    const titles = {
      start: '음악 MBTI - 당신의 음악 성향 테스트',
      quiz: '질문 중... - 음악 MBTI',
      results: '결과 - 음악 MBTI',
    };
    document.title = titles[currentPage];
  }, [currentPage]);

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        {currentPage === 'start' && <StartPage key="start" />}
        {currentPage === 'quiz' && <QuizPage key="quiz" />}
        {currentPage === 'results' && <ResultsPage key="results" />}
      </AnimatePresence>
    </div>
  );
}

export default App;
