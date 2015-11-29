'use strict';

var fs = require('fs');

function handleError (res, err) {
  return res.status(500).send(err);
}


/**
 * @api {get} /receipts Get a list of receipts
 * @apiVersion 0.1.0
 * @apiName GetReceipts
 * @apiGroup Receipts
 *
 */
exports.index = function (req, res) {
  fs.readFile('server/api/receipt/receipt.data.json', 'utf-8', function (err, receipts) {
    if (err) { return handleError(res, err); }
    res.status(200).json(JSON.parse(receipts));
  });
};


/**
 * @api {get} /receipts/:id Get a single receipt
 * @apiVersion 0.1.0
 * @apiName GetReceipt
 * @apiGroup Receipts
 *
 */
exports.show = function (req, res) {
  res.status(200).json({});
};


/**
 * @api {post} /receipts Create a new receipt
 * @apiVersion 0.1.0
 * @apiName CreateReceipt
 * @apiGroup Receipts
 *
 */
exports.create = function (req, res) {
  res.status(201).json({});
};


/**
 * @api {put} /receipts/:id Updates an existing receipt
 * @apiVersion 0.1.0
 * @apiName UpdateReceipt
 * @apiGroup Receipts
 *
 */
exports.update = function (req, res) {
  res.status(200).json({});
};


/**
 * @api {delete} /receipts/:id Deletes a receipt
 * @apiVersion 0.1.0
 * @apiName RemoveReceipt
 * @apiGroup Receipts
 *
 */
exports.destroy = function (req, res) {
  return res.status(204);
};
