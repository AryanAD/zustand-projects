import { FaCheckCircle } from "react-icons/fa";
import { useStore } from "../store";

const Sidebar = () => {
  const { questions, currentQuestion } = useStore();
  return (
    <div className="bg-gray-100 w-1/4 p-4">
      <h2 className="text-xl font-bold mb-4">Quiz Progress</h2>

      <ul>
        {questions.map((_, index) => (
          <li key={index} className="mb-2 flex items-center">
            <FaCheckCircle
              className={`mr-2 ${
                index <= currentQuestion ? "text-green-500" : "text-gray-400"
              }`}
            />
            Question: {index + 1}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
