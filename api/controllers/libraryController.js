const connection = require('../db');

module.exports = {
  // getAll = ()=>{
  //   return new Promise((reject,resolve)=>{
  //     connection.query('SELECT * FROM library ')
  //   })
  // },
  getSong: songID => {
    return new Promise((reject, resolve) => {
      connection.query('SELECT * FROM library WHERE songID = ?', [songID], (err, data) => {
        if (err) throw err;
        console.log(data);
        resolve(data);
      });
    });
  },
};
