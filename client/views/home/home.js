onLevelComplete = function() {
  Session.set('gameComplete', true);
//function onLevelComplete() {
  try {
    OnWon();
    /* TODO use this still?
    if (!challengeAlreadySolved('variables')) challenge('variables');
    else OnWon();
    */
  } catch(ex) {
    console.log(ex);  
  }
  Q.stageScene('');
}

challenges = {
  variables : function() {
    levelClone(function(err, newLevelId) {
      // TODO handle err
      var name;
      controls.prompt("<h1><span class='fa fa-smile-o'></span> Congratulations, you win!</h1>What is your name?", function(result) {
        // Do nothing with result
        if (name === undefined) {
          controls.prompt("<h1><span class='fa fa-meh-o'></span> Sorry</h1>I do not think your name was stored in memory. What is your name?", 
            function(result) {
              // Do nothing with result
              if (name === undefined) {
                controls.confirm("<h1><span class='fa fa-frown-o'></span> Ooops!</h1> Your name is still undefined in memory! Will you <i><b>please fix</b></i> my buggy code so I can store your name in memory to congratulate you properly?", function(result) {
                  if (result) window.location = '/lesson/variables/' + newLevelId;
                });
              }
          });
        }
      });
    });
  }
};

function challengeAlreadySolved(challengeName) {
  return Challenges.findOne({userId: Meteor.userId(), challenge: challengeName}) !== undefined;
}

function challenge(challengeName) {
  challenges.variables();
}

controls = new Controls();

function levelClone(callback) {
  var levelId = Session.get('levelId');
  var doc = Levels.findOne({_id: levelId});
  delete doc._id;
  doc.published = false;
  Levels.insert(doc, callback);
}

var gameOpen = new ReactiveVar(false);

var signals = AutoSignal.register('home', {
  gameOpened: function() {
    gameOpen.set(true);
  },
  gameHidden: function() {
    gameOpen.set(false);
  }
});

Template.home.created = function() {
  Session.set('levelId', '');
};

Template.home.helpers({
  levelId: function() {
    return Session.get('levelId');
  },
  hideIfGameVisible: hideIfTrue(gameOpen)
});

Template.home.events({
  'click .gameShow': function() {
    signals.gameOpened.dispatch();
  }  
});

var sort = { sort : { lastUpdated: -1 } };

Template.levelsForming.helpers({
  levels: function() {
    return Levels.find({published:false, phase: 'build'}, sort);
  },
  hideIfGameVisible: hideIfTrue(gameOpen)
});

Template.levelsExplore.helpers({
  levels: function() {
    return Levels.find({published:true, phase: 'test'}, sort);
  },
  hideIfGameVisible: hideIfTrue(gameOpen)
});

Template.levelsConquer.helpers({
  levels: function() {
    return Levels.find({published:true, phase: { $nin: ['test'] } }, sort);
  },
  hideIfGameVisible: hideIfTrue(gameOpen)  
});