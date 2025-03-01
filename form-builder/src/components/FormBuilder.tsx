import { ChangeEvent, useState } from "react";
import { useStore } from "../store";
import FormField from "./FormField";

interface NewFiled {
  label: string;
  type: "text" | "number" | "password" | "textarea" | "date" | "file";
  value: string;
}

const FormBuilder = () => {
  const { addField, formFields, removeField, resetForm, updateField } =
    useStore();

  const [newField, setNewField] = useState<NewFiled>({
    label: "",
    type: "text",
    value: "",
  });

  const handleFieldUpdate = (index: number, updatedFields: NewFiled) =>
    updateField(index, updatedFields);

  const handleFieldRemove = (index: number) => removeField(index);

  const handleFieldChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewField((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddField = () => {
    addField(newField);

    setNewField({ label: "", type: "text", value: "" });
  };

  const handleResetForm = () => {
    resetForm();
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Form Builder</h1>

      <div className="flex flex-col mb-6">
        <input
          type="text"
          name="label"
          placeholder="Field label"
          value={newField.label}
          onChange={handleFieldChange}
          className="p-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          name="type"
          value={newField.type}
          onChange={handleFieldChange}
          className="p-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="textarea">Textarea</option>
          <option value="date">Date</option>
          <option value="file">File</option>
        </select>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleAddField}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Add Field
          </button>

          <button
            type="button"
            onClick={handleResetForm}
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
          >
            Reset Form
          </button>
        </div>
      </div>

      <form>
        {formFields.map((field, index) => (
          <FormField
            index={index}
            field={field}
            onUpdate={handleFieldUpdate}
            onRemove={handleFieldRemove}
          />
        ))}
      </form>
    </div>
  );
};

export default FormBuilder;
