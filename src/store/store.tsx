import { Component, Setter, useContext } from "solid-js";
import { Accessor, createContext, createSignal } from "solid-js";

interface FormContextT {
  submitting: Accessor<boolean>;
  success: Accessor<boolean>;
  setSubmitting: Setter<boolean>;
  setSuccess: Setter<boolean>;
}

const FormContext = createContext<FormContextT | undefined>(undefined);

export const FormProvider: Component<{ children: any }> = (props) => {
  const [success, setSuccess] = createSignal(false);
  const [submitting, setSubmitting] = createSignal(false);

  return (
    <FormContext.Provider
      value={{ submitting, success, setSubmitting, setSuccess }}
    >
      {props.children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error(
      "useFormContext must be used within a FormContext.Provider",
    );
  }

  return context as FormContextT;
};
