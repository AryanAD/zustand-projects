import { useStore } from "../store";

const Questions = () => {
  const {
    questions,
    currentQuestion,
    answers,
    selectAnswer,
    previousQuestion,
    nextQuestion,
    score,
    showScore,
    resetQuiz,
  } = useStore();

  if (showScore) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-6xl font-bold">Your final score is {score}/10</h1>
        <button
          onClick={resetQuiz}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Reset Quiz
        </button>
      </div>
    );
  }
  const question = questions[currentQuestion];
  const currentAnswer = answers[currentQuestion];

  const handleSelect = (optionIndex: number) => {
    selectAnswer(optionIndex);
  };

  const handleSubmit = () => {
    nextQuestion();
  };

  return (
    <div className="w-3/4 p-6">
      <h3 className="text-2xl font-semibold">{question.question}</h3>
      <div className="mt-4">
        {question.options.map((options, index) => (
          <div className="my-2" key={index}>
            <label className="flex items-center">
              <input
                type="radio"
                name={`question-${currentQuestion}`}
                checked={currentAnswer === index}
                onChange={() => handleSelect(index)}
                className="mr-2"
              />
              {options}
            </label>
          </div>
        ))}
      </div>

      <div className="mt-6 flex">
        {currentQuestion > 0 && (
          <button
            onClick={previousQuestion}
            className="mr-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Previous
          </button>
        )}

        {currentQuestion < questions.length - 1 ? (
          <button
            onClick={nextQuestion}
            className="mr-4 px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="mr-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default Questions;
