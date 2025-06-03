const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
require("dotenv").config();
const crypto = require("crypto");
const Session = require("../models/Sessions");
const User = require("../models/Users");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true, //verify関数でrequestオブジェクトを使いたいならtrue.第１引数を requestにする
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        //google profileからemail, name取得
        const email = profile.email;
        const username = profile.displayName;

        const exitUser = await User.findUser(email);

        //なければusersテーブルに登録
        if (!exitUser) {
          const newUser = await User.createUser(
            email, //mail
            "", //passwordhash
            username, //name
            "", //address
            "", //lat
            "" //lon
          );
          exitUser = newUser;
          //セッショントークンをsessionsに入れる
          const token = crypto.randomBytes(16).toString("hex");
          const expires_at = new Date(Date.now() + 1000 * 60 * 60); // 1000ms×60秒×60分で１時間の期限設定
          await Session.insSession({ token, user_id: exitUser.id, expires_at });
        }

        //作成したセッションIDをrequestオブジェクトに渡す
        request.session_token = token;
        //passport.jsの認証フロー用のコールバック関数。done(error, user, [info]) errorやuserなければnull
        return done(null, exitUser); //req.user=userを設定してくれる。
      } catch (err) {
        console.error("Google認証エラー：", err);
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
