// This is an example of to protect an API route
import { getSession } from 'next-auth/client'

var mysql      = require('mysql');

export default async (req, res) => {
  const session = await getSession({ req })
  const ids = [req.body]

  if (session) {

    var connection = mysql.createConnection({
      host     : process.env.RDS_HOST,
      user     : process.env.RDS_USER,
      password : process.env.RDS_PASSWORD,
      database : process.env.RDS_DBNAME
    });

    connection.connect();

    var result = connection.query('DELETE FROM `characters` WHERE `id` IN ? AND `user_email` = ?', [ids, session.user.email], function (error, results, fields) {
      // error will be an Error if one occurred during the query
      // results will contain the results of the query
      // fields will contain information about the returned results fields (if any)
      if (error) throw error;
      console.log('deleted ' + results.affectedRows + ' rows');
      res.send({ids: ids})
    });

    connection.end();

  } else {
    res.send({ error: 'Error, unauthorized user.' })
  }
}