const credentials = require("../config");
const OracleDB = require("oracledb");
const { v4: uuidv4 } = require("uuid");

exports.insert_painting = async (req, res) => {
  await OracleDB.getConnection(credentials, (err, connection) => {
    if (err) {
      res.json(err.message);
    }
    let sql = `BEGIN add_painting(:p_id,
        :p_title,
        :p_theme,
        :p_rental_price,
        :p_artist_id ,
        :p_owner_id);END;`;

    connection.execute(
      sql,
      {
        p_id: uuidv4(),
        p_title: req.body.p_title,
        p_theme: req.body.p_theme,
        p_rental_price: req.body.p_rental_price,
        p_artist_id: req.body.p_artist_id,
        p_owner_id: req.body.p_owner_id,
      },
      (err) => {
        if (err) {
          res.json(err.message);
        } else {
          res.json("Painting added successfully");
        }
      }
    );
    connection.commit();
  });
};

exports.update_painting = async (req, res) => {
  await OracleDB.getConnection(credentials, (err, connection) => {
    if (err) {
      res.json(err.message);
    }
    let sql = `UPDATE PAINTINGS SET painting_title = '${req.body.painting_title}',theme = '${req.body.theme}',rental_price = '${req.body.rental_price}',artist_id = '${req.body.artist_id}',owner_id = '${req.body.owner_id}'  WHERE painting_id = '${req.body.painting_id}'`;

    connection.execute(sql, (err) => {
      if (err) {
        res.json(err.message);
      } else {
        res.json(`Painting id:${req.body.painting_id} updated successfully`);
      }
    });
    connection.commit();
  });
};

exports.retrieve_painting = async (req, res) => {
  await OracleDB.getConnection(credentials, (err, connection) => {
    if (err) {
      res.json(err.message);
    }
    sql = `BEGIN get_painting_details(
        :p_id,
        :p_title,
        :p_theme,
        :p_rental_price,
        :p_artist_id,
        :a_artist_name,
        :p_owner_id,
        :o_owner_name
      );END;`;
    connection.execute(
      sql,
      {
        p_id: {
          dir: OracleDB.BIND_INOUT,
          val: req.params.id,
          type: OracleDB.VARCHAR2,
        },
        p_title: { dir: OracleDB.BIND_OUT, type: OracleDB.VARCHAR2 },
        p_theme: { dir: OracleDB.BIND_OUT, type: OracleDB.VARCHAR2 },
        p_rental_price: { dir: OracleDB.BIND_OUT, type: OracleDB.NUMBER },
        p_artist_id: { dir: OracleDB.BIND_OUT, type: OracleDB.VARCHAR2 },
        a_artist_name: { dir: OracleDB.BIND_OUT, type: OracleDB.VARCHAR2 },
        p_owner_id: { dir: OracleDB.BIND_OUT, type: OracleDB.VARCHAR2 },
        o_owner_name: { dir: OracleDB.BIND_OUT, type: OracleDB.VARCHAR2 }
      },
      (err, result) => {
        if (err) {
          res.json(err.message);
        } else {
          res.json(result.outBinds);
        }
      }
    );
  });
};

exports.retrieve_paintings = async (req, res) => {
  await OracleDB.getConnection(credentials, (err, connection) => {
    if (err) {
      res.json(err.message);
    }
    connection.execute(`SELECT * FROM PAINTINGS`, (err, result) => {
      if (err) {
        res.json(err.message);
      } else {
        res.json(result.rows);
      }
    });
  });
};

exports.retrieve_paintings_available = async (req, res) => {
  await OracleDB.getConnection(credentials, (err, connection) => {
    if (err) {
      res.json(err.message);
    }
    connection.execute(
      `SELECT * FROM PAINTINGS WHERE AVAILABLE = 'Y'`,
      (err, result) => {
        if (err) {
          res.json(err.message);
        } else {
          res.json(result.rows);
        }
      }
    );
  });
};

exports.retrieve_paintings_available_by_theme = async (req, res) => {
  await OracleDB.getConnection(credentials, (err, connection) => {
    if (err) {
      res.json(err.message);
    }
    connection.execute(
      `SELECT * FROM PAINTINGS WHERE AVAILABLE = 'Y' AND THEME = '${req.params.theme}'`,
      (err, result) => {
        if (err) {
          res.json(err.message);
        } else {
          res.json(result.rows);
        }
      }
    );
  });
};

exports.delete_painting = async (req, res) => {
  await OracleDB.getConnection(credentials, (err, connection) => {
    if (err) {
      res.json(err.message);
    }
    let sql = `DELETE PAINTING WHERE painting_id = '${req.params.id}'`;

    connection.execute(sql, (err) => {
      if (err) {
        res.json(err.message);
      } else {
        res.json(`PAINTING with id:${req.params.id} deleted successfully`);
      }
    });
    connection.commit();
  });
};
