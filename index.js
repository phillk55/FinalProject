var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var dataUtil = require("./data-util");
var mongoose = require('mongoose');
var _ = require('underscore');
var dotenv = require('dotenv');
var Team = require('./models/Team');

dotenv.load();
console.log(process.env.MONGODB);

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

mongoose.connect(process.env.MONGODB);

mongoose.connection.on('error', function() {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
});

/* Add whatever endpoints you need! Remember that your API endpoints must
 * have '/api' prepended to them. Please remember that you need at least 5
 * endpoints for the API, and 5 others.
 */
app.get('/', function(req, res) {
    Team.find({}, function(err, teams){
      if (err) throw err;
      var teamNames = [];
      for (var i = 0; i < teams.length; i++) {
        teamNames.push(teams[i].Name)
      }
      res.render('teams', {teams: teamNames})
    });
})

 app.get('/api/Teams', function(req, res) {
     Team.find({}, function(err, teams){
         if (err) throw err;
         res.send(teams);
     });
 })

 app.get("/create", function(req, res) {
     res.render('create');
 });

 app.post("/create",function(req,res){
     var body = req.body;

     body.Players = body.Players.split(",");
     console.log(body)
     var team = new Team({
         Name: body.Name,
         Sport: body.Sport,
         Championships: body.Championships,
         State: body.State,
         Stadium: body.Stadium,
         Players: body.Players,
     });

     team.save(function(err) {
         if (err) throw err;
     });
     res.redirect('/');
 });

app.post('/api/addTeam', function(req, res) {

     var team = new Team({
         Name: req.body.Name,
         Sport: req.body.Sport,
         Championships: req.body.Championships,
         State: req.body.State,
         Stadium: req.body.Stadium,
         Players: req.body.Players.split(","),
     });

     team.save(function(err) {
         if (err) throw err;
     });
});

app.delete('/api/deleteTeam/:Name', function(req, res) {
  Team.findOneAndRemove({'Name': req.body.Name}, function(err, team){
      if (err) throw err;
      if (!team) return res.send("No team by that Name found");

      return res.send("Team "+req.body.Name+" was deleted!");
  });
})

app.delete('/api/deleteSport/:Sport', function(req, res) {
  Team.remove({'Sport': req.body.Sport}, function(err){
      if (err) throw err;
      return res.send("Sport "+req.body.Sport+" was deleted!");
  });
})

app.delete('/api/deleteState/:State', function(req, res) {
  Team.remove({'State': req.body.State}, function(err){
      if (err) throw err;
      return res.send("State "+req.body.State+" was deleted!");
  });
})

app.get('/Sports', function(req, res) {
  Team.find({}, function(err, teams){
      if (err) throw err;
      var sports = [];
      for (var i = 0; i < teams.length; i++) {
        sports.push(teams[i].Sport)
      }
      sports = _.uniq(sports)
      res.render('sports', {sports: sports})
  });
})

app.get('/States', function(req, res) {
  Team.find({}, function(err, teams){
      if (err) throw err;
      var states = [];
      for (var i = 0; i < teams.length; i++) {
        states.push(teams[i].State)
      }
      states = _.uniq(states)
      res.render('states', {states: states})
  });
})

app.get('/Players', function(req, res) {
  Team.find({}, function(err, teams){
      if (err) throw err;
      var players = [];
      for (var i = 0; i < teams.length; i++) {
        for (var j=0; j < teams[i].Players.length; j++) {
          players.push(teams[i].Players[j])
        }
      }
      res.render('players', {players: players})
  });
})

app.get('/Alphabetical', function(req, res) {
  Team.find({}, function(err, teams){
      if (err) throw err;
      var teamNames = [];
      for (var i = 0; i < teams.length; i++) {
        teamNames.push(teams[i].Name)
      }
      teamNames = teamNames.sort()
      res.render('teams', {teams: teamNames})
  });
})

app.get('/Championships', function(req, res) {
  Team.find({}, function(err, teams){
      if (err) throw err;
      console.log(teams)
      res.render('championships', {teams: teams})
  });
})

app.get('/Team/:team', function(req, res) {
  Team.find({}, function(err, teams){
      if (err) throw err;
      var team = _.findWhere(teams, {Name: req.params.team});
      res.render('teamInfo', {
        team: team,
      });
  });
})

app.get('/Sport/:sport', function(req, res) {
  Team.find({}, function(err, teams){
      if (err) throw err;
      var sport = _.where(teams, {Sport: req.params.sport});
      res.render('sportInfo', {
        sport: sport,
      });
  });
})

app.get('/State/:state', function(req, res) {
  Team.find({}, function(err, teams){
      if (err) throw err;
      var state = _.where(teams, {State: req.params.state});
      res.render('stateInfo', {
        state: state,
      });
  });
})

app.listen(process.env || 3000, function() {
    console.log('Final Project listening on port 3000!');
});
