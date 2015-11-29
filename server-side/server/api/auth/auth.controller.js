'use strict';

var fs = require('fs');

function handleError (res, err) {
  return res.status(500).send(err);
}


/**
 * @api {get} /auths Get a list of auths
 * @apiVersion 0.1.0
 * @apiName GetAuths
 * @apiGroup Auths
 *
 */
exports.index = function (req, res) {
  fs.readFile('server/api/auth/auth.data.json', 'utf-8', function (err, auths) {
    if (err) { return handleError(res, err); }
    res.status(200).json(JSON.parse(auths));
  });
};


/**
 * @api {get} /auths/:id Get a single auth
 * @apiVersion 0.1.0
 * @apiName GetAuth
 * @apiGroup Auths
 *
 */
exports.show = function (req, res) {
  res.status(200).json({});
};


/**
 * @api {post} /auths Create a new auth
 * @apiVersion 0.1.0
 * @apiName CreateAuth
 * @apiGroup Auths
 *
 */
exports.create = function (req, res) {
  res.status(201).json({});
};


/**
 * @api {put} /auths/:id Updates an existing auth
 * @apiVersion 0.1.0
 * @apiName UpdateAuth
 * @apiGroup Auths
 *
 */
exports.update = function (req, res) {
  res.status(200).json({});
};


/**
 * @api {delete} /auths/:id Deletes a auth
 * @apiVersion 0.1.0
 * @apiName RemoveAuth
 * @apiGroup Auths
 *
 */
exports.destroy = function (req, res) {
  return res.status(204);
};
