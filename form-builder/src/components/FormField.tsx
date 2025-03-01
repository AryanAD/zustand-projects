interface FormFieldProps {
  field: {
    label: string;
    type: "text" | "number" | "password" | "textarea" | "date" | "file";
    value: string;
  };
  index: number;
  onUpdate: (
    index: number,
    updatedFields: {
      label: string;
      type: "text" | "number" | "password" | "textarea" | "date" | "file";
      value: string;
    }
  ) => void;
  onRemove: (index: number) => void;
}

const FormField: React.FC<FormFieldProps> = ({
  index,
  field,
  onUpdate,
  onRemove,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onUpdate(index, { ...field, value: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(index, {
      ...field,
      value: e.target.files
        ? Array.from(e.target.files)
            .map((file) => file.name)
            .join(", ")
        : "",
    });
  };
  return (
    <div className="mb-4 p-4 border border-gray-300 flex flex-col items-start rounded-lg shadow-md">
      <label className="block mb-2 text-lg font-medium text-gray-700">
        {field.label}
      </label>

      {field.type === "textarea" ? (
        <>
          <textarea
            onChange={handleChange}
            rows={4}
            value={field.value}
            className="w-full mb-3 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </>
      ) : field.type === "file" ? (
        <>
          <input
            type="file"
            onChange={handleFileChange}
            className="border border-gray-300 w-full rounded-lg"
          />
        </>
      ) : (
        <>
          <input
            type={field.type}
            value={field.type === "file" ? "" : field.value}
            onChange={handleChange}
            className="w-full p-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </>
      )}

      <button
        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
        type="button"
        onClick={() => onRemove(index)}
      >
        Remove
      </button>
    </div>
  );
};

export default FormField;
