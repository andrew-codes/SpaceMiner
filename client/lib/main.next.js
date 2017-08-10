Meteor.startup(function () {
  AccountsEntry.config({
    homeRoute: '/home',                    // mandatory - path to redirect to after sign-out
    dashboardRoute: '/home',      // mandatory - path to redirect to after successful sign-in
    profileRoute: 'profile',
    passwordSignupFields: 'EMAIL_ONLY',
    showOtherLoginServices: true,      // Set to false to hide oauth login buttons on the signin/signup pages. Useful if you are using something like accounts-meld or want to oauth for api access
    extraSignUpFields: [{                             // Add extra signup fields on the signup page
      field: "firstName",                             // The database property you want to store the data in
      name: "",                                       // An initial value for the field, if you want one
      label: "First Name",                      // The html lable for the field
      placeholder: "Ninja",                 // A placeholder for the field
      type: "text",                            // The type of field you want
      required: true                           // Adds html 5 required property if true
    }, {
      field: 'lastName',
      name: '',
      label: 'Last Name',
      placeholder: 'Coder',
      type: 'text',
      required: true
    }, {
      field: 'nickName',
      name: '',
      label: 'Nick Name',
      placeholder: 'KrazyKoder',
      type: 'text',
      required: true
    }
  ]
  });
  
  Accounts.onLogin(function() {
    Presence.presenceUpdate();

    const user = Meteor.user();
    const name = user.profile.nickName;
    const scopeName = `${name}'s Project`;

    const client = new V1Client(user, 'admin:admin');

    let data = {
      from: 'Member',
      where: {
        Nickname: name 
      },
      select: ['Nickname']
    };
    client.query({data})
    .catch(error => console.error("Error querying for existing Member: ", error))
    .then(result => {
      console.log('Query existing Member result: ', result);
      if (result.data && result.data[0].length === 0) {
        data = [
          {
            AssetType: 'Scope',
            Parent: 'System (All Projects)',
            Name: scopeName,
            Schedule: 'Default Schedule',
            BeginDate: '8/20/2017'
          },
          {
            AssetType: 'Member',
            Name: name,
            Password: name,
            Nickname: name,
            Username: name,
            DefaultRole: "Role.Name'Project Admin",
            Scopes: scopeName
          },
          {
            AssetType: 'TeamRoom',
            Name: `${name}'s Room`,
            Schedule: 'Default Schedule',
            Scope: scopeName
          }
        ];

        client.assetsPost({data}) 
        .catch(error => console.error("Error attempting to create new Member: ", error))
        .then(result => console.log("Create new Scope, Member, TeamRoom succeeded. Assets created", result.data.assetsCreated.oidTokens.join(',')));
      } else {
        console.log('Existing Member found, will not create a new one');
      }
    });

  });

});