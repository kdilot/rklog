module.exports = function (passport) {
  const Router = require('koa-router');
  const route = new Router();
  const config = require('passport/config');

  route.get(config.google.link,
    passport.authenticate('google', { scope: 'email' })
  )

  route.get(config.google.callback, passport.authenticate('google', {
    successRedirect: config.callbackURL.suc,
    failureRedirect: config.callbackURL.fail
  }))

  route.get(config.kakao.link,
    passport.authenticate('kakao')
  )

  route.get(config.kakao.callback, passport.authenticate('kakao', {
    successRedirect: config.callbackURL.suc,
    failureRedirect: config.callbackURL.fail
  }))

  route.get(config.facebook.link,
    passport.authenticate('facebook')
  )

  route.get(config.facebook.callback, passport.authenticate('facebook', {
    successRedirect: config.callbackURL.suc,
    failureRedirect: config.callbackURL.fail
  }))

  route.get(config.naver.link,
    passport.authenticate('naver')
  )

  route.get(config.naver.callback, passport.authenticate('naver', {
    successRedirect: config.callbackURL.suc,
    failureRedirect: config.callbackURL.fail
  }))

  /*
  route.get(config.linkedin.link,
    passport.authenticate('linkedin', { state: 'SOME STATE' })
  )

  route.get(config.linkedin.callback, passport.authenticate('linkedin', {
    successRedirect: config.callbackURL.suc,
    failureRedirect: '/fail'
  }))
  */

  route.get('/test/:social', async (ctx, next) => {
    console.log(ctx.params.social)
    // ctx.body = `passport ${ctx.params.social}`
    passport.authenticate('naver')
  })

  route.get('/logout', async (ctx) => {
    ctx.logout()
    ctx.redirect('/')
  })

  return route
}