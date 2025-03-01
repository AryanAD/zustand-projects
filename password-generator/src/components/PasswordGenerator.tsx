import { useState } from "react";
import { useStore } from "../store";

const PasswordGenerator = () => {
  const {
    length,
    setLength,
    generatedPassword,
    generatePassword,
    includeLowercase,
    toggleLowercase,
    includeNumbers,
    toggleNumbers,
    includeSymbols,
    toggleSymbols,
    includeUppercase,
    toggleUppercase,
  } = useStore();

  const handleGeneratePassword = () => generatePassword();

  return (
    <div className="p-8 w-[40rem] mx-auto bg-emerald-50 shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Password Generator</h1>
      <div className="flex flex-col gap-4">
        <div>
          <label
            className="block text-sm font-medium text-gray-600"
            htmlFor="length"
          >
            Password Length
          </label>
          <input
            type="number"
            id="length"
            value={length}
            onChange={(e) => setLength(+e.target.value)}
            min={4}
            max={64}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        <div>
          <input
            type="checkbox"
            id="includeNumbers"
            checked={includeNumbers}
            onChange={toggleNumbers}
          />
          <label
            className="text-sm ml-2 font-medium text-gray-600"
            htmlFor="includeNumbers"
          >
            Include Numbers
          </label>
        </div>
        <div>
          <input
            type="checkbox"
            id="includeSymbols"
            checked={includeSymbols}
            onChange={toggleSymbols}
          />
          <label
            className="text-sm ml-2 font-medium text-gray-600"
            htmlFor="includeSymbols"
          >
            Include Symbols
          </label>
        </div>
        <div>
          <input
            type="checkbox"
            id="includeUppercase"
            checked={includeUppercase}
            onChange={toggleUppercase}
          />
          <label
            className="text-sm ml-2 font-medium text-gray-600"
            htmlFor="includeUppercase"
          >
            Include Uppercase
          </label>
        </div>
        <div>
          <input
            type="checkbox"
            id="includeLowercase"
            checked={includeLowercase}
            onChange={toggleLowercase}
          />
          <label
            className="text-sm ml-2 font-medium text-gray-600"
            htmlFor="includeLowercase"
          >
            Include Lowercase
          </label>
        </div>

        <button
          className="mt-4 px-4 py-2 bg-sky-600 text-white cursor-pointer rounded-lg hover:bg-sky-500"
          onClick={handleGeneratePassword}
        >
          Generate Password
        </button>

        {generatedPassword && (
          <div
            onClick={() =>
              navigator.clipboard
                .writeText(generatedPassword)
                .then(() => confirm("Password copied to clipboard"))
            }
            className="mt-4 cursor-pointer p-4 bg-gray-100 text-gray-500 rounded-lg"
          >
            <p className="text-lg break-all">{generatedPassword}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordGenerator;
