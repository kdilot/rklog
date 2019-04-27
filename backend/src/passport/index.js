module.exports = function (app) {
  const passport = require('koa-passport');
  const LocalStrategy = require('passport-local').Strategy;
  const GoogleStrategy = require('passport-google-oauth20').Strategy;
  const KakaoStrategy = require('passport-kakao').Strategy;
  const FacebookStrategy = require('passport-facebook').Strategy;
  const NaverStrategy = require('passport-naver').Strategy;
  const LinkedinStrategy = require('passport-linkedin-oauth2').Strategy;
  const config = require('passport/config');

  const Member = require('db/model/Member');

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(async (user, done) => {
    try {
      await done(null, user.authId)
    } catch (err) {
      done(null, false, { message: err })
    }
  })

  passport.deserializeUser(async (authId, done) => {
    try {
      await Member.checkUserData(authId).then(result => {
        console.log(result, 'des try')
        if (result) done(null, authId)
        else done(null, false, { message: 'DB error' })
      })
    } catch (err) {
      done(null, false, { message: err })
    }
  })

  passport.use(new GoogleStrategy({
    clientID: config.google.id,
    clientSecret: config.google.secret,
    callbackURL: config.google.callback
  },
    async function (accessToken, refreshToken, profile, done) {
      console.log(profile)
      const user = {
        authId: `google${profile.id}`,
        name: profile.displayName,
        email: Array.isArray(profile.emails) ? profile.emails[0].value : null,
        platform: 'google'
      }
      return done(null, user)
    }
  ))

  passport.use(new KakaoStrategy({
    clientID: config.kakao.id,
    clientSecret: config.kakao.secret,
    callbackURL: config.kakao.callback
  },
    async function (accessToken, refreshToken, profile, done) {
      const user = {
        authId: `kakao${profile.id}`,
        name: profile.displayName,
        email: Array.isArray(profile.emails) ? profile.emails[0].value : null,
        platform: 'kakao'
      }
      return done(null, user)
    }
  ))

  passport.use(new FacebookStrategy({
    clientID: config.facebook.id,
    clientSecret: config.facebook.secret,
    callbackURL: config.facebook.callback,
    profileFields: config.facebook.fields
  },
    async function (accessToken, refreshToken, profile, done) {
      const user = {
        authId: `facebook${profile.id}`,
        name: profile.displayName,
        email: Array.isArray(profile.emails) ? profile.emails[0].value : null,
        platform: 'facebook'
      }
      return done(null, user)
    }
  ))

  passport.use(new NaverStrategy({
    clientID: config.naver.id,
    clientSecret: config.naver.secret,
    callbackURL: config.naver.callback
  },
    async function (accessToken, refreshToken, profile, done) {
      const user = {
        authId: `naver${profile.id}`,
        displayName: profile.displayName,
        email: Array.isArray(profile.emails) ? profile.emails[0].value : null,
        platform: 'naver',
      }
      
      try {
        await Member.checkUserData(user.authId).then(result => {
          if (result) {
            done(null, result)
          } else {
            new Member(user).save((err, result) => {
              if (err) done(null, false, { message: 'DB error' })
              else if (!result) done(null, false, { message: 'DB error' })
              else done(null, user)
            })
          }
        })
      } catch (err) {
        done(null, false, { message: err })
      }
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
    function (accessToken, refreshToken, profile, done) {
      process.nextTick(function () {
        // To keep the example simple, the user's LinkedIn profile is returned to
        // represent the logged-in user. In a typical application, you would want
        // to associate the LinkedIn account with a user record in your database,
        // and return that user instead.
        return done(null, profile)
      });
    }
  ))

  return passport
}