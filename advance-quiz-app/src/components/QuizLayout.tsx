import Questions from "./Questions";
import Sidebar from "./Sidebar";

const QuizLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex items-center justify-center flex-col flex-1">
        <Questions />
      </div>
    </div>
  );
};

export default QuizLayout;
