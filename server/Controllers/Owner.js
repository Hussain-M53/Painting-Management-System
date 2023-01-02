const credentials = require("../config");
const OracleDB = require("oracledb");
const { v4: uuidv4 } = require("uuid");


exports.insert_owner = async (req, res) => {
  await OracleDB.getConnection(credentials, (err, connection) => {
    if (err) {
      res.json(err.message);
    }
    let sql = `BEGIN add_owner( :o_id,
        :o_name,
        :o_address,
        :o_telephone);END;`;

    connection.execute(
      sql,
      {
        o_id: uuidv4(),
        o_name: req.body.o_name,
        o_address: req.body.o_address,
        o_telephone: req.body.o_telephone,
      },
      (err) => {
        if (err) {
          res.json(err.message);
        } else {
          res.json("Owner added successfully");
        }
      }
    );
    connection.commit();
  });
};

exports.update_owner = async (req, res) => {
  await OracleDB.getConnection(credentials, (err, connection) => {
    if (err) {
      res.json(err.message);
    }
    let sql = `UPDATE OWNER SET owner_name = '${req.body.owner_name}',owner_address = '${req.body.owner_address}',owner_tel = '${req.body.owner_tel}' WHERE owner_id = '${req.body.owner_id}'`;

    connection.execute(sql, (err) => {
      if (err) {
        res.json(err.message);
      } else {
        res.json(`Owner id:${req.body.owner_id} updated successfully`);
      }
    });
    connection.commit();
  });
};

exports.retrieve_owner = async (req, res) => {
  await OracleDB.getConnection(credentials, (err, connection) => {
    if (err) {
      res.json(err.message);
    }
    sql = `BEGIN GET_OWNER_DETAILS(
        :o_id,
        :o_name,
        :o_address,
        :o_telephone
      );END;`;
    connection.execute(
      sql,
      {
        o_id: {
          dir: OracleDB.BIND_INOUT,
          val: req.params.id,
          type: OracleDB.VARCHAR2,
        },
        o_name: { dir: OracleDB.BIND_OUT, type: OracleDB.VARCHAR2 },
        o_address: { dir: OracleDB.BIND_OUT, type: OracleDB.VARCHAR2 },
        o_telephone: { dir: OracleDB.BIND_OUT, type: OracleDB.VARCHAR2 },
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

exports.retrieve_owners = async (req, res) => {
  await OracleDB.getConnection(credentials, (err, connection) => {
    if (err) {
      res.json(err.message);
    }
    connection.execute(`SELECT * FROM OWNER`, (err, result) => {
      if (err) {
        res.json(err.message);
      } else {
        res.json(result.rows);
      }
    });
  });
};

exports.retrieve_owners_return_report = async (req, res) => {
  let data;
  await OracleDB.getConnection(credentials, (err, connection) => {
    if (err) {
      res.json(err.message);
    }
    sql = `BEGIN GET_OWNER_DETAILS(
        :o_id,
        :o_name,
        :o_address,
        :o_telephone
      );END;`;
    connection.execute(
      sql,
      {
        o_id: {
          dir: OracleDB.BIND_INOUT,
          val: req.params.id,
          type: OracleDB.VARCHAR2,
        },
        o_name: { dir: OracleDB.BIND_OUT, type: OracleDB.VARCHAR2 },
        o_address: { dir: OracleDB.BIND_OUT, type: OracleDB.VARCHAR2 },
        o_telephone: { dir: OracleDB.BIND_OUT, type: OracleDB.VARCHAR2 },
      },
      (err, result) => {
        if (err) {
          res.json(err.message);
          return;
        } else {
          data = result.outBinds;
        }
      }
    );

  sql = `BEGIN return_to_owners_report(:o_id);END;`;

  connection.execute(
    sql,
    {
      o_id: {
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

exports.delete_owner = async (req, res) => {
  await OracleDB.getConnection(credentials, (err, connection) => {
    if (err) {
      res.json(err.message);
    }
    let sql = `DELETE OWNER WHERE owner_id = '${req.params.id}'`;

    connection.execute(sql, (err) => {
      if (err) {
        res.json(err.message);
      } else {
        res.json(`OWNER with id:${req.params.id} deleted successfully`);
      }
    });
    connection.commit();
  });
};