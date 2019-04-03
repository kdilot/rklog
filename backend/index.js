require('dotenv').config();

const PORT = process.env.PORT || 3001;
const Koa = require('Koa');
const session = require('koa-session');
const bodyParser = require('koa-bodyParser');
const serve = require('koa-static');
// const Router = require('koa-router');
const path = require('path');
const app = new Koa();


const passport = require('passport/index')(app);
const auth = require('passport/auth')(passport);
app.use(auth.routes());

app.keys = ['super-secret-key'];  // session
app.use(session(app));
app.use(bodyParser());
app.use(serve(path.resolve(__dirname, 'build/')));  // client page

const api = require('api');
// app.use('/api', api);
// app.use('/api', userAuth());
// router.use('/api', api.routes())
app.use(api.routes());

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});