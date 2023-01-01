const credentials = require("../config");
const OracleDB = require("oracledb");
const { v4: uuidv4 } = require("uuid");


exports.insert_customer = async (req, res) => {
    await OracleDB.getConnection(credentials, (err, connection) => {
      if (err) {
        res.json(err.message);
      }
      let sql = `BEGIN add_customer(:c_id,:c_name,:c_address);END;`;
  
      connection.execute(
        sql,
        {
          c_id: uuidv4(),
          c_name: req.body.c_name,
          c_address: req.body.c_address,
        },
        (err) => {
          if (err) {
            res.json(err.message);
          } else {
            res.json("Customer added successfully");
          }
        }
      );
      connection.commit();
    });
  };
  
  exports.retrieve_customers = async (req, res) => {
    await OracleDB.getConnection(credentials, (err, connection) => {
      if (err) {
        res.json(err.message);
      }
      connection.execute(`SELECT * FROM CUSTOMER`, (err, result) => {
        if (err) {
          res.json(err.message);
        } else {
          res.json(result.rows);
        }
      });
    });
  };
  
  exports.retrieve_customer = async (req, res) => {
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
          } else {
            res.json(result.outBinds);
          }
        }
      );
    });
  };

  exports.update_customer = async (req, res) => {
    await OracleDB.getConnection(credentials, (err, connection) => {
      if (err) {
        res.json(err.message);
      }
      let sql = `UPDATE CUSTOMER SET customer_name = '${req.body.customer_name}',customer_address = '${req.body.customer_address}'  WHERE CUSTOMER.customer_id = '${req.body.customer_id}'`;
  
      connection.execute(sql, (err) => {
        if (err) {
          res.json(err.message);
        } else {
          res.json(`Customer id:${req.body.customer_id} updated successfully`);
        }
      });
      connection.commit();
    });
  };
  

  exports.delete_customer = async (req, res) => {
    await OracleDB.getConnection(credentials, (err, connection) => {
      if (err) {
        res.json(err.message);
      }
      let sql = `DELETE CUSTOMER WHERE customer_id = '${req.params.id}'`;
  
      connection.execute(sql, (err) => {
        if (err) {
          res.json(err.message);
        } else {
          res.json(`Customer with id:${req.params.id} deleted successfully`);
        }
      });
      connection.commit();
    });
  };