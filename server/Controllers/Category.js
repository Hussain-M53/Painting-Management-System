const credentials = require("../config");
const OracleDB = require("oracledb");

exports.retrieve_category = async (req, res) => {
  await OracleDB.getConnection(credentials, (err, connection) => {
    if (err) {
      res.json(err.message);
    }
    connection.execute(`SELECT * FROM CATEGORY`, (err, result) => {
      if (err) {
        res.json(err.message);
      }
      res.json(result.rows);
    });
  });
};

exports.insert_category = async (req,res) => {
    await OracleDB.getConnection(credentials, (err, connection) => {
      if (err) {
        res.json(err.message);
      }
      connection.execute(
        `INSERT INTO CATEGORY VALUES (
              'B',0,'Bronze Category'
          )`
      );
      connection.execute(
        `INSERT INTO CATEGORY VALUES (
              'S',5,'Silver Category'
          )`
      );
      connection.execute(
        `INSERT INTO CATEGORY VALUES (
              'G',10,'Gold Category'
          )`
      );
      connection
        .execute(
          `INSERT INTO CATEGORY VALUES (
              'P',15,'Platinum Category'
          )`
        )
        .then(() => {
          res.json("categories added");
        })
        .catch((err) => {
          res.json(err.message);
        });
      connection.commit();
    });
  };
  
  
  
  
  
  
  
  