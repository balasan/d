'use strict';


var D = require('./api/d/d.model');

var testData = [
  {
    name: "Donald Trump",
    size: 4,
    votes: 1
  },
  {
    name: "John Kasich",
    size: 4,
    votes: 1
  },
  {
    name: "Marco Rubio",
    size: 4,
    votes: 1
  },
  {
    name: "Ted Cruz",
    size: 4,
    votes: 1
  },
  {
    name: "Hillary Clinton",
    size: 4,
    votes: 1
  },
  {
    name: "Bernie Sanders",
    size: 4,
    votes: 1
  }
]

D
  .find({})
  .remove(function() {
    D.create({candidates: testData})
    console.log("SEEDING DB", testData);
  })

