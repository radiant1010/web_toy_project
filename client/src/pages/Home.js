import { Link } from 'react-router-dom';

const Home = () => {
    return (
      <div>
        <h1>안녕하세요?</h1>
        <p>환영합니다!</p>
        <Link to="/auth/sign-up">회원가입</Link>
      </div>
    );
  };
  
  export default Home;