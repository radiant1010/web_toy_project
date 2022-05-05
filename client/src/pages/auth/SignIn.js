
import axios from 'axios';

const SignIn = () => {

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    axios.post('http://localhost:3030/birds/login', {
      email: data.get('email'), password: data.get('password')
    }, { withCredentials: true }).then((res) => {
      console.log(res);
      //success 값을 받아왔다면 페이지 넘김 기능 추가
      if (res.status === 200) window.location.href = '/';
    }).catch((err) => {
      //err 처리 status 500
      console.log({ err: err.response.request.status });
      console.log({ err: err.response.data });

      if (err.response.request.status === 400 || err.response.request.status === 404) {
        alert(JSON.stringify(err.response.data));
      }
    })

  };

  return (
    <>
      <div>
        <h1>로그인 페이지 입니다.</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            E-mail: <input type="email" name="email" />
          </label>
          <br />
          <label>
            Password: <input type="password" name="password" />
          </label>
          <br />
          <button type="submit">로그인 하기</button>
        </form>
      </div>
    </>
  );
};

export default SignIn;