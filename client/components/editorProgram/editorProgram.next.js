function updateUserProgram(userProgram) {
  userProgram.lastSaved = new Date();
  var obj = _.omit(userProgram, '_id', 'version');
  UserPrograms.update(userProgram._id,
    {
      $set: obj,
      $inc: {'version': 1}
    },
    {
      removeEmptyStrings: false
    }
  );
}

function getUserProgramForCurrentUser(program) {
  return UserPrograms.findOneForUser(program, Meteor.userId());
}

Template.editorProgram.created = function() {
  this.editor = new SMEditor(this);
};

Template.editorProgram.rendered = function() {
  const defaultCode = this.data.program.code;
  const userProgram = getUserProgramForCurrentUser(this.data.program);
  // Reassign program from user-specific version if it exists
  this.data.program = userProgram;

  // Get the correct code: from the program, or from defaults
  let code = this.data.program.code;
  if (!code || code.trim() === '') code = defaultCode;

  this.editor.render(code);
}

Template.editorProgram.helpers({
  getId() { return Template.instance().editor.editorId; },
  contentEditable() { return this.contentEditable ? 'contentEditable' : '' },
  contentEditableClass() { return this.contentEditable ? 'editable' : ''}
});

Template.editorProgram.events({
  'click .changesSave': (evt, template) => {
    const editor = template.editor;
    const code = editor.code;
    console.log('code: ', code);
    template.data.program.code = code;
    updateUserProgram(template.data.program);
  },
  'click .execute': function(evt, template) {
    const editor = template.editor;
    const program = $(template.firstNode);
    var useStringify = this.useStringify;
    var output = program.find('.ePrg-output');
    var code = editor.code;
    output.text('').hide();
    var printed = false;
    var console = {
      log : function(val) {
        printed = true;
        output.append(val + '\n');
      }
    };
    var print = console.log;
    var printb = function(val) {
      printed = true;
      output.append(val);
    }

    var printArray = function(array) {
      array.forEach(print);
    }
    console.write = val => output.append(val);

    var printbArray = function(array) {
      array.forEach(printb);
    }

    Meteor.call('es6compile', [code], (err, talkBabelToMe) => {
      var result;
      if (err) {
        result = '*Error executing program*';
        window.console.error(err);
      } else {
        try {
          window.BABEL_CODE = talkBabelToMe;
          result = eval(talkBabelToMe);
        } catch(ex) {
          result = '*Error executing program*';
          window.console.error(ex);
        }
      }
      output.parents().show();
      if(!printed) {
        if (useStringify === 'true') {
          result = JSON.stringify(result, ' ', 2);
        }
        output.append(result).fadeIn();
      } else {
        output.fadeIn();
      }
      var outputContainer = program.find('.ePrg-outputContainer');
      outputContainer.effect('highlight', {color:'green'});
    });
  },
  'click .clear': function(evt, template) {
    var program = $(template.firstNode);
    var output = program.find('.ePrg-output');
    var outputContainer = program.find('.ePrg-outputContainer');
    output.empty();
    outputContainer.effect('highlight', {color:'blue'});
  }
});