var mongoose = require('mongoose');

var teamSchema = new mongoose.Schema({
   Name: {
       type: String,
       required: true
   },
   Sport: {
       type: String,
       required: true
   },
   Championships: {
       type: Number,
       required: true
   },
   State: {
       type: String,
       required: true
   },
   Stadium: {
       type: String,
       required: true
   },
   Players: [String]
});

var Team = mongoose.model('Team', teamSchema);
module.exports = Team;
