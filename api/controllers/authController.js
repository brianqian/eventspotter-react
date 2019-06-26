const connection = require('../db');
const bcrypt = require('bcrypt');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').OAuth2Strategy;

module.exports = {
  googleSignIn: (req, res) => {
    passport.use(
      new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://www.example.com/auth/google/callback',
      })
    );
  },
  login: (req, res) => {
    console.log('logging in', req.body);
    let { email, password } = req.body;
    password = password.toString();
    email = email.toString();
    connection.query('SELECT * FROM userInfo WHERE email = ?', [email], async (err, data) => {
      if (err) throw err;
      [data] = data;
      if (!data) {
        res.json({ ok: false, message: 'Email not found' });
        return;
      }
      //Bcrypt password compare
      const match = await bcrypt.compare(password, data.password);
      if (match) {
        delete data.password;
        data.ok = true;
        data.token = jwt.sign({ userId: data.id }, process.env.SECRET_KEY, {
          expiresIn: '60d',
        });
        res.json(data);
      } else {
        res.json({ ok: false, message: 'Incorrect password' });
      }
    });
  },
  jwtLogin: (req, res) => {
    const { token } = req.body;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded, decoded.userId);
    connection.query('SELECT * FROM userInfo WHERE id = ?', [decoded.userId], (err, data) => {
      if (err) throw err;
      [data] = data;

      if (!data) {
        res.json({ ok: false, message: '' });
      } else {
        delete data.password;
        data.ok = true;
        res.json(data);
      }
    });
  },
  signUp: (req, res) => {
    console.log('starting creating new user...');
    console.log(req.body);
    let { email, password } = req.body;
    password = password.toString();
    email = email.toString();
    console.log('creating email with ', email, password);
    bcrypt.hash(password, 10, function(err, hash) {
      if (err) throw err;
      connection.query(`SELECT email FROM userInfo WHERE email= ?`, [email], (err, data) => {
        if (err) throw err;
        if (data.length) {
          //If a email with same name is found return error
          res.json({
            ok: false,
            message: 'email not available, please try again',
          });
        } else {
          connection.query(
            `INSERT INTO userInfo (email, password) VALUES (?,?)`,
            [email, hash],
            (err, data) => {
              if (err) console.error(err);
              res.json({ ...data, ok: true });
            }
          );
        }
      });
    });
  },
};
