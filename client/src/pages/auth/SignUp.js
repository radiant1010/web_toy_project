
import axios from 'axios';

const Signup = () => {

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    console.log(data.get("email"))
    console.log(data.get("user_name"))
    console.log(data.get("password"))

    axios.post('http://localhost:3030/birds/signup', { 
      email: data.get('email'), password: data.get('password'), name: data.get('user_name')}
      ).then((res) => {
      console.log(res);
      //success 값을 받아왔다면 페이지 넘김 기능 추가
      //if (res.status === 200) window.location.href = '/auth/sign-in';
    }).catch((err) => {
      //err 처리 status 500
      console.log({ err: err.response.request.status });
      console.log({ err: err.response.data });

      if (err.response.request.status === 500) {
        alert(JSON.stringify(err.response.data));
      }
    })

  };

  return (
    <>
      <div>
        <h1>회원가입 페이지 입니다.</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            E-mail: <input type="email" name="email" />
          </label>
          <br />
          <label>
            Name: <input type="text" name="user_name" />
          </label>
          <br />
          <label>
            Password: <input type="password" name="password" />
          </label>
          <br />
          <button type="submit">회원가입</button>
        </form>
      </div>
    </>
  );
};

export default Signup;