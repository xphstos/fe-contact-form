import { ClassValue } from "clsx";
import { JSX, splitProps } from "solid-js";
import { cn } from "~/utils/cn";

type TextAreaProps = {
  name: string;
  label?: string;
  className?: ClassValue;
  placeholder?: string;
  value: string | undefined;
  error: string;
  required?: boolean;
  ref: (element: HTMLTextAreaElement) => void;
  onInput: JSX.EventHandler<HTMLTextAreaElement, InputEvent>;
  onChange: JSX.EventHandler<HTMLTextAreaElement, Event>;
  onBlur: JSX.EventHandler<HTMLTextAreaElement, FocusEvent>;
};

export function TextArea(props: TextAreaProps) {
  const [, inputProps] = splitProps(props, [
    "value",
    "className",
    "label",
    "error",
  ]);
  return (
    <div class={cn("", [props.className])}>
      {props.label && (
        <label class="block mb-2 cursor-pointer" for={props.name}>
          {props.label}{" "}
          {props.required && <span class="text-green-medium">*</span>}
        </label>
      )}
      <textarea
        {...inputProps}
        class={cn(
          "border border-green-light w-full min-w-1 px-6 py-3 text-base rounded-lg focus:border-green-medium hover:border-green-medium caret-green-medium focus:outline-none transition-all resize-y align-middle",
          {
            "border-red": !!props.error,
          },
        )}
        id={props.name}
        rows={4}
        value={props.value || ""}
        aria-invalid={!!props.error}
        aria-errormessage={`${props.name}-error`}
      />
      {props.error && (
        <div class="mt-2 text-sm text-red" id={`${props.name}-error`}>
          {props.error}
        </div>
      )}
    </div>
  );
}
