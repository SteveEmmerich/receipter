'use strict';

var fs = require('fs');

function handleError (res, err) {
  return res.status(500).send(err);
}


/**
 * @api {get} /userss Get a list of userss
 * @apiVersion 0.1.0
 * @apiName GetUserss
 * @apiGroup Userss
 *
 */
exports.index = function (req, res) {
  fs.readFile('server/api/users/users.data.json', 'utf-8', function (err, userss) {
    if (err) { return handleError(res, err); }
    res.status(200).json(JSON.parse(userss));
  });
};


/**
 * @api {get} /userss/:id Get a single users
 * @apiVersion 0.1.0
 * @apiName GetUsers
 * @apiGroup Userss
 *
 */
exports.show = function (req, res) {
  res.status(200).json({});
};


/**
 * @api {post} /userss Create a new users
 * @apiVersion 0.1.0
 * @apiName CreateUsers
 * @apiGroup Userss
 *
 */
exports.create = function (req, res) {
  res.status(201).json({});
};


/**
 * @api {put} /userss/:id Updates an existing users
 * @apiVersion 0.1.0
 * @apiName UpdateUsers
 * @apiGroup Userss
 *
 */
exports.update = function (req, res) {
  res.status(200).json({});
};


/**
 * @api {delete} /userss/:id Deletes a users
 * @apiVersion 0.1.0
 * @apiName RemoveUsers
 * @apiGroup Userss
 *
 */
exports.destroy = function (req, res) {
  return res.status(204);
};
