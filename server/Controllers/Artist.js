const credentials = require("../config");
const OracleDB = require("oracledb");
const { v4: uuidv4 } = require("uuid");

exports.insert_artist = async (req, res) => {
  await OracleDB.getConnection(credentials, (err, connection) => {
    if (err) {
      res.json(err.message);
    }
    let sql = `BEGIN add_artist(:art_id ,
        :art_name,
        :art_cob,
        :art_yob,
        :art_yod);END;`;

    connection.execute(
      sql,
      {
        art_id: uuidv4(),
        art_name: req.body.art_name,
        art_cob: req.body.art_cob,
        art_yob: req.body.art_yob,
        art_yod: req.body.art_yod,
      },
      (err) => {
        if (err) {
          res.json(err.message);
        } else {
          res.json("Artist added successfully");
        }
      }
    );
    connection.commit();
  });
};

exports.update_artist = async (req, res) => {
  await OracleDB.getConnection(credentials, (err, connection) => {
    if (err) {
      res.json(err.message);
    }
    let sql = `UPDATE ARTIST SET artist_name = '${req.body.artist_name}',country_of_birth = '${req.body.country_of_birth}',year_of_birth = '${req.body.year_of_birth}',year_of_death = '${req.body.year_of_death}'  WHERE artist_id = '${req.body.artist_id}'`;

    connection.execute(sql, (err) => {
      if (err) {
        res.json(err.message);
      } else {
        res.json(`Artist id:${req.body.artist_id} updated successfully`);
      }
    });
    connection.commit();
  });
};

exports.retrieve_artist = async (req, res) => {
  await OracleDB.getConnection(credentials, (err, connection) => {
    if (err) {
      res.json(err.message);
    }
    sql = `BEGIN get_artist_details(
        :art_id,
        :art_name,
        :art_country_of_birth,
        :art_year_of_birth,
        :art_year_of_death
          );END;`;
    connection.execute(
      sql,
      {
        art_id: {
          dir: OracleDB.BIND_INOUT,
          val: req.params.id,
          type: OracleDB.VARCHAR2,
        },
        art_name: { dir: OracleDB.BIND_OUT, type: OracleDB.VARCHAR2 },
        art_country_of_birth: {
          dir: OracleDB.BIND_OUT,
          type: OracleDB.VARCHAR2,
        },
        art_year_of_birth: { dir: OracleDB.BIND_OUT, type: OracleDB.NUMBER },
        art_year_of_death: { dir: OracleDB.BIND_OUT, type: OracleDB.NUMBER },
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

exports.retrieve_artists = async (req, res) => {
  await OracleDB.getConnection(credentials, (err, connection) => {
    if (err) {
      res.json(err.message);
    }
    connection.execute(`SELECT * FROM ARTIST`, (err, result) => {
      if (err) {
        res.json(err.message);
      } else {
        res.json(result.rows);
      }
    });
  });
};

exports.retrieve_artist_paintings_report = async (req, res) => {
  await OracleDB.getConnection(credentials, (err, connection) => {
    if (err) {
      res.json(err.message);
    }
    sql = `BEGIN get_artist_details(
        :art_id,
        :art_name,
        :art_country_of_birth,
        :art_year_of_birth,
        :art_year_of_death
          );END;`;
    connection.execute(
      sql,
      {
        art_id: {
          dir: OracleDB.BIND_INOUT,
          val: req.params.id,
          type: OracleDB.VARCHAR2,
        },
        art_name: { dir: OracleDB.BIND_OUT, type: OracleDB.VARCHAR2 },
        art_country_of_birth: {
          dir: OracleDB.BIND_OUT,
          type: OracleDB.VARCHAR2,
        },
        art_year_of_birth: { dir: OracleDB.BIND_OUT, type: OracleDB.NUMBER },
        art_year_of_death: { dir: OracleDB.BIND_OUT, type: OracleDB.NUMBER },
      },
      (err, result) => {
        if (err) {
          res.json(err.message);
        } else {
          data = result.outBinds;
        }
      }
    );

    sql = `BEGIN get_artist_paintings_report(:art_id);END;`;

    connection.execute(
      sql,
      {
        art_id: {
          dir: OracleDB.BIND_IN,
          val: req.params.id,
          type: OracleDB.VARCHAR2,
        },
      },
      (err, result) => {
        if (err) {
          res.json(err.message);
        } else {
          data.paintings = result.implicitResults.at(0);
          res.json(data);
        }
      }
    );
  });
};

exports.delete_artist = async (req, res) => {
  await OracleDB.getConnection(credentials, (err, connection) => {
    if (err) {
      res.json(err.message);
    }
    let sql = `DELETE ARTIST WHERE artist_id = '${req.params.id}'`;

    connection.execute(sql, (err) => {
      if (err) {
        res.json(err.message);
      } else {
        res.json(`ARTIST with id:${req.params.id} deleted successfully`);
      }
    });
    connection.commit();
  });
};
