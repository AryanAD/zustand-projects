import { create } from "zustand";

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizState {
  currentQuestion: number;
  answers: (number | null)[];
  score: number;
  showScore: boolean;
  questions: Question[];
  selectAnswer: (optionIndex: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  resetQuiz: () => void;
}
export const useStore = create<QuizState>((set) => ({
  currentQuestion: 0,
  answers: Array(3).fill(null),
  score: 0,
  showScore: false,

  questions: [
    {
      question: "What is the full form of CSS?",
      options: [
        "Common Sync Style",
        "Computer Styling System",
        "Cascading Style Sheets",
        "Concrete Style Sheets",
      ],
      correctAnswer: 2,
    },
    {
      question: "Who is the founder of Microsoft?",
      options: ["Bill Gates", "Steve Ballmer", "Bill Clinton", "Tony Stark"],
      correctAnswer: 0,
    },
    {
      question: "What does CPU stand for?",
      options: [
        "Central Processing Unit",
        "Computer Processing Utility",
        "Central Performance Unit",
        "Control Processing Unit",
      ],
      correctAnswer: 0,
    },
    {
      question:
        "Which programming language is known as the 'mother of all languages'?",
      options: ["C", "Python", "Assembly", "Fortran"],
      correctAnswer: 3,
    },
    {
      question: "What is the primary function of RAM in a computer?",
      options: [
        "Store permanent data",
        "Process images",
        "Temporarily store active data",
        "Control internet speed",
      ],
      correctAnswer: 2,
    },
    {
      question: "Which company developed the Java programming language?",
      options: ["Microsoft", "Apple", "Sun Microsystems", "Google"],
      correctAnswer: 2,
    },
    {
      question: "What does HTTP stand for?",
      options: [
        "Hyper Text Transfer Protocol",
        "High Tech Transfer Process",
        "Hyperlink Transfer Process",
        "Hyper Terminal Transfer Protocol",
      ],
      correctAnswer: 0,
    },
    {
      question: "Which type of memory is non-volatile?",
      options: ["RAM", "Cache", "ROM", "Register"],
      correctAnswer: 2,
    },
    {
      question:
        "Which of the following is an example of an open-source operating system?",
      options: ["Windows 10", "MacOS", "Linux", "iOS"],
      correctAnswer: 2,
    },
    {
      question: "What does GPU stand for?",
      options: [
        "General Processing Unit",
        "Graphical Processing Unit",
        "Graphics Power Utility",
        "Gaming Processing Unit",
      ],
      correctAnswer: 1,
    },
    {
      question: "Who is the creator of the Python programming language?",
      options: [
        "Dennis Ritchie",
        "Guido van Rossum",
        "James Gosling",
        "Bjarne Stroustrup",
      ],
      correctAnswer: 1,
    },
    {
      question: "What does SQL stand for?",
      options: [
        "Structured Query Language",
        "Systematic Question Logic",
        "Sequential Query Line",
        "Software Query Language",
      ],
      correctAnswer: 0,
    },
    {
      question: "Which company created the first graphical web browser?",
      options: ["Microsoft", "Netscape", "Apple", "Mozilla"],
      correctAnswer: 1,
    },
    {
      question: "Which protocol is used to send emails?",
      options: ["HTTP", "FTP", "SMTP", "TCP"],
      correctAnswer: 2,
    },
    {
      question: "What is the name of Google's AI-powered chatbot?",
      options: ["Alexa", "Cortana", "Gemini", "Siri"],
      correctAnswer: 2,
    },
  ],

  selectAnswer: (optionIndex) =>
    set((state) => {
      const answers = [...state.answers];

      answers[state.currentQuestion] = optionIndex;

      return { answers };
    }),

  nextQuestion: () =>
    set((state) => {
      const isLastQuestion =
        state.currentQuestion === state.questions.length - 1;

      if (isLastQuestion) {
        let score = 0;

        state.questions.forEach((question, index) => {
          if (state.answers[index] === question.correctAnswer) {
            score++;
          }
        });
        return {
          showScore: true,
          score,
        };
      }
      return { currentQuestion: state.currentQuestion + 1 };
    }),

  previousQuestion: () =>
    set((state) => ({
      currentQuestion: Math.max(state.currentQuestion - 1, 0),
    })),

  resetQuiz: () =>
    set(() => ({
      currentQuestion: 0,
      answers: Array(3).fill(null),
      score: 0,
      showScore: false,
    })),
}));
