import { ClassValue } from "clsx";
import { JSX, splitProps } from "solid-js";
import { cn } from "~/utils/cn";

type CheckboxProps = {
  name: string;
  checked?: boolean;
  className?: ClassValue;
  label?: string;
  error: string;
  required?: boolean;
  ref: (element: HTMLInputElement) => void;
  onInput: JSX.EventHandler<HTMLInputElement, InputEvent>;
  onChange: JSX.EventHandler<HTMLInputElement, Event>;
  onBlur: JSX.EventHandler<HTMLInputElement, FocusEvent>;
};

export function Checkbox(props: CheckboxProps) {
  const [, inputProps] = splitProps(props, ["label", "className", "error"]);
  return (
    <div
      class={cn("grid grid-cols-[1rem_auto] items-center gap-x-4 gap-y-2", [
        props.className,
      ])}
    >
      <input
        {...inputProps}
        type="checkbox"
        class="accent-green-medium size-4 rounded-sm border-green-light checked:border-green-medium"
        id={props.name}
        aria-invalid={!!props.error}
        aria-errormessage={`${props.name}-error`}
      />
      {props.label && (
        <label class="cursor-pointer" for={props.name}>
          {props.label}{" "}
          {props.required && <span class="text-green-medium">*</span>}
        </label>
      )}
      {props.error && (
        <div class="col-span-2 text-sm text-red" id={`${props.name}-error`}>
          {props.error}
        </div>
      )}
    </div>
  );
}
