const credentials = require("../config");
const OracleDB = require("oracledb");

exports.insert_paintings_rented = async (req, res) => {
  await OracleDB.getConnection(credentials, (err, connection) => {
    if (err) {
      res.json(err.message);
    }
    let sql = `BEGIN get_paintings_rental_details(:p_id);END;`;

    connection.execute(
      sql,
      {
        p_id: {
          dir: OracleDB.BIND_IN,
          val: req.body.painting_id,
          type: OracleDB.VARCHAR2,
        },
      },
      (err, result) => {
        if (err) {
          res.json(err.message);
        } else {
          if (result.implicitResults.at(0).at(5) == "N") {
            res.json(
              `Painting id:${req.body.painting_id} is not available for rent`
            );
          }
        }
      }
    );

    sql = `BEGIN add_paintings_rented(
        :customer_id,
        :painting_id,
        :hire_date,
        :due_date_back
        );END;`;

    connection.execute(
      sql,
      {
        customer_id: req.body.customer_id,
        painting_id: req.body.painting_id,
        hire_date: req.body.hire_date,
        due_date_back: req.body.due_date_back,
      },
      (err) => {
        if (err) {
          res.json(err.message);
        } else {
          res.json("Painting rented successfully");
        }
      }
    );
    connection.commit();
  });
};

exports.retrieve_paintings_rented = async (req, res) => {
  await OracleDB.getConnection(credentials, (err, connection) => {
    if (err) {
      res.json(err.message);
    }
    connection.execute(`SELECT * FROM Paintings_Rented`, (err, result) => {
      if (err) {
        res.json(err.message);
      } else {
        res.json(result.rows);
      }
    });
  });
};

exports.return_paintings_rented = async (req, res) => {
  await OracleDB.getConnection(credentials, (err, connection) => {
    if (err) {
      res.json(err.message);
    }
    let sql = `UPDATE paintings_rented SET return_status = 'Y' WHERE paintings_rented.painting_id = '${req.params.id}'`;

    connection.execute(sql, (err) => {
      if (err) {
        res.json(err.message);
      } else {
        res.json(`Painting id:${req.params.id} returned successfully`);
      }
    });
    connection.commit();
  });
};

exports.retrieve_rental_report = async (req, res, next) => {
  let data;
  await OracleDB.getConnection(credentials, (err, connection) => {
    if (err) {
      res.json(err.message);
    }
    sql = `BEGIN get_customer_details(
        :c_id,
        :c_name,
        :c_address,
        :c_category_id,
        :c_category_description,
        :c_category_discount
      );END;`;
    connection.execute(
      sql,
      {
        c_id: {
          dir: OracleDB.BIND_INOUT,
          val: req.params.id,
          type: OracleDB.VARCHAR2,
        },
        c_name: { dir: OracleDB.BIND_OUT, type: OracleDB.VARCHAR2 },
        c_address: { dir: OracleDB.BIND_OUT, type: OracleDB.VARCHAR2 },
        c_category_id: { dir: OracleDB.BIND_OUT, type: OracleDB.CHAR },
        c_category_description: {
          dir: OracleDB.BIND_OUT,
          type: OracleDB.VARCHAR2,
        },
        c_category_discount: { dir: OracleDB.BIND_OUT, type: OracleDB.NUMBER },
      },
      (err, result) => {
        if (err) {
          res.json(err.message);
          next();
        } else {
          data = result.outBinds;
        }
      }
    );
    sql = `BEGIN get_rentals_report(:c_id);END;`;

    connection.execute(
      sql,
      {
        c_id: {
          dir: OracleDB.BIND_IN,
          val: req.params.id,
          type: OracleDB.VARCHAR2,
        },
      },
      (err, result) => {
        if (err) {
          res.json(err.message);
        } else {
          if (data) {
            data.paintings = result.implicitResults.at(0);
            res.json(data);
          }
        }
      }
    );
  });
};
