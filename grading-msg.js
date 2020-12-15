const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
const standardFeedbackText = `
## 👍 What you did well


## ❌ Required changes to pass the assignment


## 💡 Optional changes / Ideas / Improvements


## 🛠️ Resources for further learning
`;

// Needs to be global as we want to keep the original message intact even after refreshing message
let contentInTextArea = '';

// Receive a message from options.js (the extension popup) to refreeh the message
chrome.runtime.onMessage.addListener((request) => {
  if (request.action === 'REFRESH_MESSAGE') {
    updateMessage('REFRESH');
  }
});

const updateMessage = (type) => {

// Populate grader options.
// Pass null to get all store
  chrome.storage.sync.get(null, (data) => {
    const graderName = data.graderName || '';
    const gradingProgram = data.gradingProgram;
    const graderSignature = `\n\nThanks,\n ${graderName && `__${graderName}__`}`;

    // Tabs here matters as its translated into HTML space.
    const createMessage = (message, studentName) =>
`${getIntroText(graderName, studentName)}
${standardFeedbackText}
\n\n
${contentInTextArea}
\n\n***\n
${message}
${graderSignature}`;

    const getProgramMessage = studentName => {
      let message = '';
      const selectedProgram = programs.find(program => program.id === gradingProgram);
      if (selectedProgram){
        message = selectedProgram.hasThinkChat ? messages.thinkChat : messages.standard;
      }
      
      return (
        message
        ? createMessage(message, studentName)
        : 'Please select which program you\'re grading in the extension options'
      );

    };

    // Use the customized intro message if there's one, otherwise the default.
    const getIntroText = (graderName, studentName) => {
      const customIntro = data.introMessage && data.introMessage
        .replace(/\${studentName}/g, studentName)
        .replace(/\${graderName}/g, graderName);

      return customIntro ? `${customIntro}\n\n` : `Hi ${studentName}! ${graderName && `${graderName} from the grading team here.`}`;
    };
      // get textzarea
      const submissionTextarea = document.getElementById('content');

      if (submissionTextarea) {

        // Get content in the text area as Thinkful adds the grading instructions there.
        if (type === 'INITIAL') {
          contentInTextArea = submissionTextarea.value;
        }
        // Ge the student's name (which doesn't have a specific class :( ).
        const fullStudentName =
          document.getElementsByClassName('submission-grader-card-top-bar')[0]
            .getElementsByTagName('a')[0]
            .innerHTML;

        // Take only the first name
        const studentName = capitalizeFirstLetter(fullStudentName.split(' ')[0]);

        // Populate the text area with the relevant message
        submissionTextarea.value = getProgramMessage(studentName);
    }
  });
};

window.onload = function () {
  updateMessage('INITIAL');
};
