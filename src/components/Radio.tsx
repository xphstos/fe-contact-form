import { ClassValue } from "clsx";
import { JSX, splitProps } from "solid-js";
import { cn } from "~/utils/cn";

type RadioProps = {
  id: string;
  name: string;
  className?: ClassValue;
  label: string;
  value: string | undefined;
  error: string;
  required?: boolean;
  ref: (element: HTMLInputElement) => void;
  onInput: JSX.EventHandler<HTMLInputElement, InputEvent>;
  onChange: JSX.EventHandler<HTMLInputElement, Event>;
  onBlur: JSX.EventHandler<HTMLInputElement, FocusEvent>;
};

export function RadioInput(props: RadioProps) {
  const [, inputProps] = splitProps(props, [
    "value",
    "className",
    "label",
    "error",
  ]);
  return (
    <label
      class={cn(
        "cursor-pointer px-6 py-3 flex items-center gap-2 border rounded-lg border-green-light focus:border-green-medium hover:border-green-medium transition-all",
        "[&:has(:checked)]:border-green-medium [&:has(:checked)]:bg-green-light",
        [props.className],
      )}
      for={props.id}
    >
      <input
        {...inputProps}
        type="radio"
        class={cn(
          "accent-green-medium size-4 border-green-light checked:border-green-medium",
          {
            "border-red": !!props.error,
          },
        )}
        value={props.value || ""}
        aria-invalid={!!props.error}
        aria-errormessage={`${props.id}-error`}
      />
      <span>
        {props.label}{" "}
        {props.required && <span class="text-green-medium">*</span>}
      </span>
      {/* {props.error && <div id={`${props.id}-error`}>{props.error}</div>} */}
    </label>
  );
}
