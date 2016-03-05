/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var D = require('./d.model');


// Get list of things
exports.index = function(req, res) {
  D.find(function (err, things) {
    if(err) { return handleError(res, err); }
    return res.json(200, things);
  });
};

// Get a single thing
exports.show = function(req, res) {
  D.findById(req.params.id, function (err, thing) {
    if(err) { return handleError(res, err); }
    if(!thing) { return res.send(404); }
    return res.json(thing);
  });
};

// Creates a new thing in the DB.
exports.create = function(req, res) {
  D.create(req.body, function(err, thing) {
    if(err) { return handleError(res, err); }
    return res.json(201, thing);
  });
};

// Updates an existing thing in the DB.
exports.update = function(req, res) {


  if (req.cookies.voted == "true") return handleError(res, "You can only vote once");
  res.cookie('voted', 'true');
  console.log("Cookie", req.cookies.voted)

  var vote = req.body;

  D.find(function (err, candidates) {
    if (err) { return handleError(res, err); }
    if(!candidates) { return res.send(404); }

    var c = candidates[0];

    c.candidates.forEach(function(candidate){
      var voteSize = vote[candidate.name]
      candidate.size = (parseFloat(voteSize) + candidate.votes * candidate.size) / (candidate.votes + 1.0);
      candidate.votes++
    })

    c.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, candidates);
    });
  });
};

// Deletes a thing from the DB.
// exports.destroy = function(req, res) {
//   D.findById(req.params.id, function (err, thing) {
//     if(err) { return handleError(res, err); }
//     if(!thing) { return res.send(404); }
//     thing.remove(function(err) {
//       if(err) { return handleError(res, err); }
//       return res.send(204);
//     });
//   });
// };

function handleError(res, err) {
  return res.send(500, err);
}