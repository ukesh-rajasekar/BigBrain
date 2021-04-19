
export const questionFormat = {
    id:0,
     question: {
    name: 'question',
    type: 'text',
    placeholder: 'Enter a Question',
    questionLabel: 'Question',
    value: '',
  },
  type: {
    name: 'type',
    type: 'options',
    placeholder: '',
    questionLabel: 'Choode the type of question',
    value: '',
    options: ['single-choice', 'multiple-choice'],
  },
  timeLimit: {
    name: 'timeLimit',
    type: 'text',
    placeholder: 'Enter the time in seconds',
    questionLabel: 'Enter the time limit',
    value: '',
  },
  points: {
    name: 'points',
    type: 'text',
    placeholder: 'Enter the points to be awarded',
    questionLabel: 'Enter the point',
    value: '',
  },
  url: {
    name: 'url',
    type: 'text',
    placeholder: 'Enter a video URL',
    questionLabel: 'Enter the youtube UR',
    value: '',
  },
  answer: {
    name: 'answer',
    type: 'text',
    placeholder: 'Enter the answer for the question',
    questionLabel: 'Enter the answer',
    value: '',
    constrains: {
      length: {
        min: 2,
        max: 6
      }
    }
  }
}