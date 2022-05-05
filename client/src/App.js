import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import MyPage from './pages/auth/MyPage';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth/sign-in" element={<SignIn />} />
      <Route path="/auth/sign-up" element={<SignUp />} />
      <Route path="/auth/mypage/:id" element={<MyPage />} />
    </Routes>
  );
};

export default App;