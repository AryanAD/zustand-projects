import { create } from "zustand";

interface FormFields {
  label: string;
  type: "text" | "number" | "password" | "textarea" | "date" | "file";
  value: string;
}

interface FormStoreState {
  formFields: FormFields[];
  addField: (field: FormFields) => void;
  removeField: (index: number) => void;
  updateField: (index: number, updateFields: FormFields) => void;
  resetForm: () => void;
}

export const useStore = create<FormStoreState>((set) => ({
  formFields: [],

  addField: (field) =>
    set((state) => ({ formFields: [...state.formFields, field] })),

  removeField: (index) =>
    set((state) => ({
      formFields: state.formFields.filter((_, i) => i !== index),
    })),
  updateField: (index, updateFields) =>
    set((state) => ({
      formFields: state.formFields.map((field, i) =>
        i === index ? updateFields : field
      ),
    })),
  resetForm: () => set({ formFields: [] }),
}));
