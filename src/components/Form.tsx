import {
  createForm,
  email,
  required,
  SubmitHandler,
  FieldValues,
  reset,
  custom,
} from "@modular-forms/solid";
import { For } from "solid-js";
import { TextInput } from "~/components/TextInput";
import { Checkbox } from "./Checkbox";
import { RadioInput } from "./Radio";
import { sleep } from "~/utils/sleep";
import { useFormContext } from "~/store/store";
import { TextArea } from "./TextArea";
import { Fragment } from "solid-js/h/jsx-runtime";

type Query = "general" | "support";

interface ContactForm extends FieldValues {
  firstname: string;
  lastname: string;
  query: Query;
  email: string;
  message: string;
  terms: boolean;
}

export default function Form() {
  const { setSuccess, submitting, setSubmitting } = useFormContext();
  const [contactForm, { Form, Field }] = createForm<ContactForm>({
    validateOn: "blur",
  });

  const handleSubmit: SubmitHandler<ContactForm> = async (values) => {
    // This only runs when all validations
    // has passed. Validation happens on blur
    console.assert(values);

    // Set loading to true
    setSubmitting(true);

    // Fake simulate server response
    await sleep(2000);

    // Set loading to false
    setSubmitting(false);

    // Show the success message
    setSuccess(true);

    // Reset the form
    reset(contactForm);

    await sleep(3000);
    setSuccess(false);
  };

  return (
    <Form
      onSubmit={handleSubmit}
      class="w-[min(736px,100%)] md:mx-auto bg-white p-8 rounded-xl grid md:grid-cols-2 gap-x-4 gap-y-6"
    >
      <h1 class="text-green-dark font-bold text-3xl md:col-span-2">
        Contact us
      </h1>
      <Field name="firstname" validate={[required("This field is required")]}>
        {(field, props) => (
          <TextInput
            {...props}
            type="text"
            label="First Name"
            value={field.value}
            error={field.error}
            required
          />
        )}
      </Field>
      <Field name="lastname" validate={[required("This field is required")]}>
        {(field, props) => (
          <TextInput
            {...props}
            type="text"
            label="Last Name"
            value={field.value}
            error={field.error}
            required
          />
        )}
      </Field>
      <Field
        name="email"
        validate={[
          required("This field is required"),
          email("Please enter a valid email address"),
        ]}
      >
        {(field, props) => (
          <TextInput
            {...props}
            type="text"
            label="Email"
            className="md:col-span-2"
            value={field.value}
            error={field.error}
            required
          />
        )}
      </Field>
      <div class="md:col-span-2 ">
        <label class="block mb-4">
          Query Type <span class="text-green-medium">*</span>
        </label>
        <Field name="query" validate={[required("Please select a query type")]}>
          {(field, props) => (
            <div class="grid md:grid-cols-2 gap-x-4 gap-y-2">
              <For
                each={[
                  {
                    slug: "general",
                    label: "General Enquiry",
                  },
                  {
                    slug: "support",
                    label: "Support Request",
                  },
                ]}
              >
                {(item) => (
                  <RadioInput
                    id={item.slug}
                    label={item.label}
                    value={item.slug}
                    error={field.error}
                    {...props}
                  />
                )}
              </For>
              {field.error && (
                <div
                  class="md:col-span-2 text-sm text-red"
                  id={`${field.name}-error`}
                >
                  {field.error}
                </div>
              )}
            </div>
          )}
        </Field>
      </div>
      <Field
        name="message"
        validate={[
          required("This field is required"),
          custom((v) => {
            if (!v) return false;
            return v.length > 10;
          }, "Please say a bit more"),
        ]}
      >
        {(field, props) => (
          <TextArea
            {...props}
            className="md:col-span-2"
            label="Message"
            value={field.value}
            error={field.error}
            required
          />
        )}
      </Field>
      <Field
        name="terms"
        type="boolean"
        validate={[
          required("To submit this form, please consent to being contacted"),
        ]}
      >
        {(field, props) => (
          <Checkbox
            {...props}
            className="md:col-span-2"
            label="I consent to being contacted by the team"
            checked={field.value}
            error={field.error}
            required
          />
        )}
      </Field>
      <button
        class="text-center md:col-span-2 text-lg text-white font-bold bg-green-medium hover:bg-green-dark focus-visible:bg-green-dark hover:text-white focus-visible:text-white transition-colors px-6 py-3 rounded-md min-h-[52px]"
        type="submit"
      >
        {submitting() ? (
          <div
            aria-label="Loading"
            class="size-[1em] mx-auto border-2 rounded-full border-white animate-spin border-r-transparent"
          ></div>
        ) : (
          "Submit"
        )}
      </button>
    </Form>
  );
}
