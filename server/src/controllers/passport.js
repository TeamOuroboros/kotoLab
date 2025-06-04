const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });
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

        let exitUser = await User.findUser(email);

        //なければusersテーブルに登録
        if (!exitUser) {
          const newUser = await User.createUser(
            email, //mail
            "none", //passwordhash
            username, //name
            "名古屋市", //address
            "35.1851045", //lat
            "136.899843" //lon
          );
          exitUser = newUser[0];
        }

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
