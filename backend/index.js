require('dotenv').config();

const PORT = process.env.PORT || 3001;
const Koa = require('Koa');
const session = require('koa-session');
const bodyParser = require('koa-bodyParser');
const serve = require('koa-static');
// const Router = require('koa-router');
const path = require('path');
const app = new Koa();
const db = require('db');

app.use(serve(path.resolve(__dirname, 'build/')));  // client page
app.use(bodyParser());  // body parser

app.keys = ['super-secret-key'];  // session
app.use(session(app));

const passport = require('passport/index')(app);  // passport
const auth = require('passport/auth')(passport);
app.use(auth.routes());


const api = require('api');
// app.use('/api', api);
// app.use('/api', userAuth());
// router.use('/api', api.routes())
app.use(api.routes());

db.connect();

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});