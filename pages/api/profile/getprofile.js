// This is an example of to protect an API route
import { getSession } from "next-auth/client";

var mysql = require("mysql");

export default async (req, res) => {
  const session = await getSession({ req });
  const email =  decodeURIComponent(req.query.email);
  console.log(email);


    var connection = mysql.createConnection({
    host: process.env.RDS_HOST,
    user: process.env.RDS_USER,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DBNAME,
  });

  connection.connect();

    var result = connection.query(
      "SELECT * FROM `users` WHERE `email` = ?",
      [email],
      function (error, [results], fields) {
        // error will be an Error if one occurred during the query
        // results will contain the results of the query
        // fields will contain information about the returned results fields (if any)
        res.send(results);
      }
    );
  
    connection.end();
  
};
