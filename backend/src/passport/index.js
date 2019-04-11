module.exports = function (app) {
  const passport = require('koa-passport');
  const LocalStrategy = require('passport-local').Strategy;
  const GoogleStrategy = require('passport-google-oauth20').Strategy;
  const KakaoStrategy = require('passport-kakao').Strategy;
  const FacebookStrategy = require('passport-facebook').Strategy;
  const NaverStrategy = require('passport-naver').Strategy;
  const LinkedinStrategy = require('passport-linkedin-oauth2').Strategy;
  const config = require('passport/config');

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    console.log(user)
    done(null, user)
  })

  passport.deserializeUser(async (authId, done) => {
    try {
      // const user = await fetchUser()
      done(null, 'TEST')
    } catch (err) {
      done(err)
    }
  })

  passport.use(new LocalStrategy((username, password, cb) => {
    console.log(111)
    const user = {
      authId: `guest`,
      name: 'guest',
      email: '',
      platform: 'guest'
    }
    return cb(null, user)
  }))

  passport.use(new GoogleStrategy({
    clientID: config.google.id,
    clientSecret: config.google.secret,
    callbackURL: config.google.callback
  },
    async function (accessToken, refreshToken, profile, cb) {
      console.log(profile)
      const user = {
        authId: `google${profile.id}`,
        name: profile.displayName,
        email: Array.isArray(profile.emails) ? profile.emails[0].value : null,
        platform: 'google'
      }
      return cb(null, user)
    }
  ))

  passport.use(new KakaoStrategy({
    clientID: config.kakao.id,
    clientSecret: config.kakao.secret,
    callbackURL: config.kakao.callback
  },
    async function (accessToken, refreshToken, profile, cb) {
      const user = {
        authId: `kakao${profile.id}`,
        name: profile.displayName,
        email: Array.isArray(profile.emails) ? profile.emails[0].value : null,
        platform: 'kakao'
      }
      return cb(null, user)
    }
  ))

  passport.use(new FacebookStrategy({
    clientID: config.facebook.id,
    clientSecret: config.facebook.secret,
    callbackURL: config.facebook.callback,
    profileFields: config.facebook.fields
  },
    async function (accessToken, refreshToken, profile, cb) {
      const user = {
        authId: `facebook${profile.id}`,
        name: profile.displayName,
        email: Array.isArray(profile.emails) ? profile.emails[0].value : null,
        platform: 'facebook'
      }
      return cb(null, user)
    }
  ))

  passport.use(new NaverStrategy({
    clientID: config.naver.id,
    clientSecret: config.naver.secret,
    callbackURL: config.naver.callback
  },
    async function (accessToken, refreshToken, profile, cb) {
      const user = {
        authId: `naver${profile.id}`,
        name: profile.displayName,
        email: Array.isArray(profile.emails) ? profile.emails[0].value : null,
        platform: 'naver'
      }
      return cb(null, user)
    }
  ))

  passport.use(new LinkedinStrategy({
    clientID: config.linkedin.id,
    clientSecret: config.linkedin.secret,
    callbackURL: config.linkedin.callback,
    scope: config.linkedin.fields,
    profileFields: [
      "id",
      "first-name",
      "location",
      "last-name",
      "picture-url",
      "email-address",
      "public-profile-url",
      "positions",
    ],
  },
    function (accessToken, refreshToken, profile, cb) {
      process.nextTick(function () {
        // To keep the example simple, the user's LinkedIn profile is returned to
        // represent the logged-in user. In a typical application, you would want
        // to associate the LinkedIn account with a user record in your database,
        // and return that user instead.
        return cb(null, profile)
      });
    }
  ))

  return passport
}