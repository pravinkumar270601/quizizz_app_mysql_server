const db = require("../models");
const expense = db.expensetracker_t_shootingspot_m;

const RESPONSE = require("../constants/response");
const { MESSAGE } = require("../constants/message");
const { StatusCode } = require("../constants/HttpStatusCode");
const { QueryTypes } = require("sequelize");

//create and save new movie
exports.createSpot = async (req, res) => {
  try {
    const data = {
      movie_id: req.body.movie_id,
      contact_no: req.body.contact_no,
      location: req.body.location,
      active_status: req.body.active_status,
      created_on: req.body.created_on,
    };
    const response = await expense.create(data);

    RESPONSE.Success.Message = MESSAGE.SUCCESS;
    RESPONSE.Success.data = {
      spot_id: response.spot_id,
    };
    res.status(StatusCode.CREATED.code).send(RESPONSE.Success);
  } catch (err) {
    RESPONSE.Failure.Message = StatusCode.SERVER_ERROR.message;
    RESPONSE.Failure.Error = err.message;
    res.status(StatusCode.SERVER_ERROR.code).send(RESPONSE.Failure);
  }
};

// Retrieve all spotdetail from the database.
exports.getspotDetails = async (req, res) => {
  try {
    const query = `SELECT 
    m.movie_id,
    m.movie_name,
    s.location,
    s.contact_no,
    s.created_on
FROM 
    expensetracker_t_movie_m m
LEFT JOIN 
    expensetracker_t_shootingspot_m s ON m.movie_id = s.movie_id`;

    const response = await db.sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    // console.log("response",response)

    RESPONSE.Success.Message = MESSAGE.SUCCESS;
    RESPONSE.Success.data = response;
    res.status(StatusCode.CREATED.code).send(RESPONSE.Success);
  } catch (error) {
    // RESPONSE.Success.data = {data:response};

    RESPONSE.Failure.Message = error.message;
    res.status(StatusCode.SERVER_ERROR.code).send(RESPONSE.Failure);
  }
};

// Find a single spot with an id
exports.findOnespot = async (req, res) => {
  try {
    const spot_id = req.params.spot_id;

    const query = `
        SELECT
        m.movie_name,
        s.location,
        s.contact_no,
        s.created_on
    FROM
        expensetracker_t_shootingspot_m s
    LEFT JOIN
        expensetracker_t_movie_m m ON s.movie_id = m.movie_id
    WHERE
        s.active_status = 1
        AND s.spot_id = :spot_id`;

    const response = await db.sequelize.query(query, {
      replacements: { spot_id: spot_id },
      type: QueryTypes.SELECT,
    });

    RESPONSE.Success.Message = MESSAGE.SUCCESS;
    RESPONSE.Success.data = response;
    res.status(StatusCode.CREATED.code).send(RESPONSE.Success);
  } catch (error) {
    RESPONSE.Failure.Message = error.message;
    res.status(StatusCode.SERVER_ERROR.code).send(RESPONSE.Failure);
  }
};

// Update a movie by the id in the request
exports.updatespot = async (req, res) => {
  try {
    const spot_id = req.params.id;
    const { location, contact_no, active_status, updated_on } = req.body;
    const spot = await expense.findByPk(spot_id);

    const result = await spot.update({
      spot_id,
      location,
      contact_no,
      active_status,
      updated_on,
    });

    RESPONSE.Success.Message = MESSAGE.UPDATE;
    RESPONSE.Success.data = {};
    res.status(StatusCode.CREATED.code).send(RESPONSE.Success);
  } catch (error) {
    RESPONSE.Failure.Message = error.message;
    res.status(StatusCode.SERVER_ERROR.code).send(RESPONSE.Failure);
  }
};

// Delete a spot with the specified id in the request
exports.deletespot = async (req, res) => {
  console.log("Entered delete function");
  try {
    const spot_id = req.params.id;
    const data = { delete_status: 1 };
    const spot = await expense.findByPk(spot_id);

    const result = await spot.update(data);

    RESPONSE.Success.Message = MESSAGE.DELETE;
    RESPONSE.Success.data = {};
    res.status(StatusCode.CREATED.code).send(RESPONSE.Success);
  } catch (error) {
    RESPONSE.Failure.Message = error.message;
    res.status(StatusCode.SERVER_ERROR.code).send(RESPONSE.Failure);
  }
};
