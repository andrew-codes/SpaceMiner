var bsBackgrounds = [
  'primary', 'success', 'info', 'warning', 'danger'
];

function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

Template.level.helpers({
  randomBackgroundColor: function() {
    return randomElement(bsBackgrounds);
  },
  version: function() {
    if (this.phase && this.phase !== 'build') {
      return '&nbsp;<span style="font-size:75%;color:eggshell;">v' + this.version + '</span>';
    }
    else if (this.phase && this.phase === 'build') return ''
    return '&nbsp;<span style="font-size:75%;color:eggshell;">v1</span>';
  },
  preview: function() {
    var images = '';
    for(var i = 0; i < this.selections.length-1; i++) {
      images += "<img src='/images/spriteParts/" + this.selections[i] + "' height='32' width='32' alt='' />&nbsp;";
      if (i==1) images += "<img src='/images/spriteParts/" + this.tile + "' height='32' width='32' alt='' />&nbsp;";
    }
    return images;
  },
  explorer: function() {
    if (this.updatedBy) return this.updatedBy;
    return '';
  },
  edit: function() {
    if (this.userId && this.userId === Meteor.userId())  {
      return "<div><button class='levelEdit btn btn-xs btn-danger'>Edit</button>&nbsp<button class='levelDelete btn btn-xs btn-danger'>Delete</button></div>";
    }
    return "";
  },
  del: function() {
    if (this.userId && this.userId === Meteor.userId())  {
      return "<div></div>";
    }
    return "";
  }
});

Template.level.events({
  'click button.levelPlay': function(evt, template) {
    Session.set('levelId', null);
    var id = this._id;
    Meteor.setTimeout(function() {
      Session.set('levelId', id);
      signals.gameOpened.dispatch();
      //Session.set('gameVisible', true);      
    }, 1000);
  },
  'click button.levelEdit': function(evt, template) {
    Session.set('levelId', null);
    window.location = '/build?id=' + this._id;    
  }
});