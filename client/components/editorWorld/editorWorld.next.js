const getUserWorldForCurrentUser = levelId => {
  const userLevelId = Meteor.userId() + '-' + levelId;
  console.log('levelId:', levelId);
  console.log('userLevelId:', userLevelId);
};

Template.editorWorld.created = function() {
  this.editor = new SMEditor(this);
};

Template.editorWorld.rendered = function() {
  const baseLevelId = this.data.program.context.level;
  const userWorld = getUserWorldForCurrentUser(baseLevelId);

  this.editor.render('// just kidding');
}

const parseWorldDefinitionFromScript = script => {
  const defaults = Game.getDefaults();
  return window.ParseWorldDefinitionFromScript(script, defaults);
};

Template.editorWorld.helpers({
  getId() { return Template.instance().editor.editorId; }
});

Template.editorWorld.events({
  'click .worldUpdate': (evt, template) => {
    const levelId = template.data.programBaseLevelId;
    const editor = template.editor;
    const code = editor.code;
    const obj = parseWorldDefinitionFromScript(code);
    const name = obj.worldName;

    console.log('world: ', obj);

    // Get the updated tile and sprites
    const selections = [
      'player/' + obj.sprites.player,
      'enemy/' + obj.sprites.enemy,
      'gem/' + obj.sprites.gem,
      'coin/' + obj.sprites.coin,
      'shot/' + obj.sprites.shot
    ];

    // Specify the exact properties to update
    const props = {
      name,
      script,
      selections,
      tile: 'tile/' + obj.sprites.tile,
      lastUpdated: new Date(),
      updatedBy: userName()
    };

    Meteor.call('levelUpdate', levelId, props, null, function(err) {
      console.log('levelUpdate err: ', err);
      console.log('Finished updating...', template.data);
    });
  }
});