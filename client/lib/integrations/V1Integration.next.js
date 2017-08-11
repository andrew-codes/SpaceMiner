const lessonToAssetApiPayload = (lesson, scopeName) => {
  const epic = {
    AssetType: 'Epic',
    Scope: scopeName,
    Description: lesson.description,
    Name: lesson.title,
    Subs: []
  };

  for(const section of lesson.sections) {
    const story = {
      AssetType: 'Story',
      Name: section.title,
      Description: section.description,
      Children: []
    };

    for(const part of section.parts) {
      const task = {
        AssetType: 'Task',
        Name: part.title
      };
      story.Children.push(task);
    }
    epic.Subs.push(story);
  }

  return epic;
};

class V1Integration {
  static handle_userLoggedIn() {
    const client = new V1Client('admin:admin');
    const userName = client.userName;
    const scopeName = `${userName}'s Project`;

    let data = {
      from: 'Member',
      where: {
        Nickname: userName
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
            Name: userName,
            Password: userName,
            Nickname: userName,
            Username: userName,
            DefaultRole: "Role.Name'Project Admin",
            Scopes: scopeName
          },
          {
            AssetType: 'TeamRoom',
            Name: `${userName}'s Room`,
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
  }

  static handle_userOpenedLesson(lesson) {
    const client = new V1Client();
    const userName = client.userName;
    const scopeName = `${userName}'s Project`;

    const data = {
      from: 'Epic',
      where: {
        Name: lesson.title,
        'Scope.Name': scopeName
      },
      select: ['Name']
    };

    client.query({data})
    .catch(error => console.error('Error querying existing Epic for Lesson: ', error))
    .then(result => {
      console.log('Query existing Epic for Lesson result: ', result);
      if (result.data && result.data[0].length === 0) {
        console.log('No Epic for Lesson found, will create...');
        const payload = lessonToAssetApiPayload(lesson, scopeName);
        client.assetsPost({data: payload})
        .catch(error => console.error("Error creating Epic for Lesson: ", error))
        .then(result => console.log("Epic for Lesson create succeeded. Assets created: ", result.data.assetsCreated.oidTokens.join(',')));
      } else {
        console.log('Found Epic for Lesson, will not create a new one');
      }
    });
  }

  static handle_userOpenedLessonSection(event) {
    const {lesson, sectionIndex} = event;
    const client = new V1Client();
    const userName = client.userName;
    const scopeName = `${userName}'s Project`;

    const data = {
      from: 'Story',
      where: {
        Name: lesson.sections[sectionIndex].title,
        'Scope.Name': scopeName
      },
      set: {
        Owners: userName,
        Timebox: 'Iteration 1'
      }
    };

    client.assetsPost({data})
    .catch(error => console.error('Error updating Story for Section: ', error))
    .then(result => {
      if (result.data) {
        console.log('Updating Story for Section succeeded: ', result.data.assetsModified.oidTokens.join(','));
      } else {
        console.log('Did not find Story for Section. Maybe it was deleted?');
      }
    });
  }

  static handle_userOpenedLessonSectionPart(event) {
    const {lesson, sectionIndex, partIndex, status} = event;
    const client = new V1Client();
    const userName = client.userName;
    const scopeName = `${userName}'s Project`;

    const data = {
      from: 'Task',
      where: {
        Name: lesson.sections[sectionIndex].parts[partIndex].title,
        'Scope.Name': scopeName
      },
      set: {
        Status: status
      }
    };

    client.assetsPost({data})
    .catch(error => console.error('Error updating Task for Part: ', error))
    .then(result => {
      if (result.data) {
        console.log('Updating Task for Part succeeded: ', result.data.assetsModified.oidTokens.join(','));
      } else {
        console.log('Did not find Task for Part. Maybe it was deleted?');
      }
    });
  }
};

Bus.signalByConvention(V1Integration);

this.V1Integration = V1Integration;