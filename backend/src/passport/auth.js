module.exports = function (passport) {
  const Router = require('koa-router');
  const route = new Router();
  const config = require('passport/config');

  route.get(config.google.link,
    passport.authenticate('google', { scope: 'email' })
  )

  route.get(config.google.callback, passport.authenticate('google', {
    successRedirect: '/welcome',
    failureRedirect: '/'
  }))

  route.get(config.kakao.link,
    passport.authenticate('kakao')
  )

  route.get(config.kakao.callback, passport.authenticate('kakao', {
    successRedirect: '/welcome',
    failureRedirect: '/'
  }))

  route.get(config.facebook.link,
    passport.authenticate('facebook')
  )

  route.get(config.facebook.callback, passport.authenticate('facebook', {
    successRedirect: '/welcome',
    failureRedirect: '/'
  }))

  route.get(config.naver.link,
    passport.authenticate('naver')
  )

  route.get(config.naver.callback, passport.authenticate('naver', {
    successRedirect: '/welcome',
    failureRedirect: '/'
  }))

  route.get(config.linkedin.link,
    passport.authenticate('linkedin')
  )

  route.get(config.linkedin.callback, passport.authenticate('linkedin', {
    successRedirect: '/welcome',
    failureRedirect: '/'
  }))

  route.get('/test2', async (ctx) => {
    ctx.body = 'adsf123'
  })
  return route
}