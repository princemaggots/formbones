// This is an example of to protect an API route
import { getSession } from 'next-auth/client'

var mysql = require('mysql');

export default async (req, res) => {
  const session = await getSession({ req })
  const user = req.body

  user.user_email = session.user.email;


  if (session) {

    var connection = mysql.createConnection({
      host     : process.env.RDS_HOST,
      user     : process.env.RDS_USER,
      password : process.env.RDS_PASSWORD,
      database : process.env.RDS_DBNAME
    });

    connection.connect();

    var query = connection.query('UPDATE contacts SET ? WHERE `user_email` = ? AND `id` = ?', user, function (error, results, fields) {
      if (error) throw error;
      res.send({ content: req.body, session, user })
      // Neat!
    })
    connection.end();

  } else {
    res.send({ error: 'Error, unauthorized user.' })
  }
}


