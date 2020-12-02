// This is an example of to protect an API route
import { getSession } from "next-auth/client";

var mysql = require("mysql");
var characters_per_page = 6;

export default async (req, res) => {
  const session = await getSession({ req });

  console.log(req.query);
  const user_email = req.query.user_email ? req.query.user_email : "nothing";
  const page = req.query.page ? req.query.page : 1;

  console.log(characters_per_page, page);

  var connection = mysql.createConnection({
    host: process.env.RDS_HOST,
    user: process.env.RDS_USER,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DBNAME,
  });

  connection.connect();
  
  connection.query(
    "SELECT * FROM `characters` WHERE `visibility` = 'public' OR `user_email` = ? LIMIT ?, ?",
    [user_email, (page - 1) * characters_per_page, characters_per_page],
    function (error, results, fields) {
      connection.query(
        "SELECT count(*) AS total FROM characters WHERE `visibility` = 'public' OR `user_email` = ?",
        user_email,
        function (error, [results2], fields) {
          const number_of_pages = Math.ceil(
            Number(results2.total) / characters_per_page
          );
          console.log({ number_of_pages });
          res.send({ results, number_of_pages });
          connection.end();
        }
      );
    }
  );
};