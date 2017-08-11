const log = message => console.log('JIRA: ', message);

class JIRAIntegration {
  static handle_userLoggedIn() {
    log('handle_userLoggedIn');
  }

  static handle_userOpenedLesson(lesson) {
    log(lesson);
  }

  static handle_userOpenedLessonSection(event) {
    log(event);
  }

  static handle_userOpenedLessonSectionPart(event) {
    log(event);
  }
};

Bus.signalByConvention(JIRAIntegration);