const express = require('express');
const router = express.Router();
const { user } = require("../models");
const bcrypt = require("bcrypt");

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// define the home page route
router.get('/', function (req, res) {

  res.send('Birds home page');
});

// define the about route
router.get('/about', function (req, res) {
  res.send('About birds');
});

//회원가입
router.post("/signup", async (req, res, next) => {
  //호출한 API에서 값을 넘겨 받아옴
  const { email, password, name } = req.body;

  try {
    //email이 중복되는지 Sequelize를 통해서 검색 
    const getUser = await user.findOne({ where: { email } });
    //결과가 있다면 "중복되는 E-mail 입니다." 메시지 출력
    if (getUser) {
      res.status(500).json({ message: "중복되는 E-mail 입니다." });
    }
    //bcrypt로 password를 암호화해줍니다.
    const encoding_PW = await bcrypt.hash(password, 10);
    //DB에 가공한 데이터를 넣어줌
    await user.create({
      email,
      password: encoding_PW,
      name,
    })
    //결과 반환(상태코드, 메시지)
    return res.status(200).json({ message: "회원가입 성공!" });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

//로그인
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  user.findOne({
    where: {
      email,
    },
  }).then((user) => {
    if (!user) {
      return res.status(404).json({ idnotfound: "ID를 찾을 수 없습니다!" });
    }
    //password 검증(입력받은 password와 DB에 입력된 password를 비교함)
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        //user이라는 session 객체를 생성(필요한 정보는 여기에 담아준다.)
        req.session.user = {
          user_email: user.email,
          user_name: user.name,
        }
        //세션을 DB에 저장
        req.session.save(function () {
          res.status(200).json({ message: "SUCCESS!" });
        });
      } else {
        return res.status(400).json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

//로그아웃
router.delete('/logout', function (req, res) {
  const session = req.session;
  console.log(session.user);

  if (session.user) {
    delete session.user;
    res.send({ message: "logout success" })
  }
});

router.patch('/mypage', function (req, res) {
  const session = req.session;
  const { user_name } = req.body;

  if (session.user) {
    console.log(session.user.user_email, "user_name", user_name)

    user.update({ name: user_name },
      {
        where: { email: session.user.user_email }
      }).then(() => {
        res.status(200).json({ message: "정보 변경 SUCCESS!" });
      });
  }
});

module.exports = router;