import './App.css';
import './index.css';
import HomeScreen from './components/home-screen/HomeScreen';
import Login from './components/Login';
import SignUp from './components/SignUp';

import Welcome from './components/Welcome';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatPage from './components/chat-page/ChatPage';
import ChatList from './components/chat/chat-list/ChatList';
import QuizGenerator from './components/quiz-page/QuizPage';
import QuizList from './components/quiz/quiz-list/QuizList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home/*" element={<HomeScreen />}>
          <Route path="chats" element={<ChatPage />} />
          <Route path="quiz" element={<QuizGenerator />} />
          <Route
            index
            element={
              <>
                <section className="mb-10">
                  <ChatList />
                </section>
                <section className="mt-5">
                  <QuizList />
                </section>
              </>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
