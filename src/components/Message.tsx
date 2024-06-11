import { Show } from "solid-js";
import { Portal } from "solid-js/web";
import { useFormContext } from "~/store/store";

export function Message() {
  const { success } = useFormContext();

  return (
    <Portal>
      <Show when={success()}>
        <div role="region" class="fixed top-0 w-full z-10">
          <ol class="flex justify-center p-6">
            <li
              role="status"
              aria-live="off"
              aria-atomic="true"
              class="rounded-lg bg-green-dark p-6 text-white"
            >
              <p class="flex items-center font-semibold gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="21"
                  fill="none"
                  viewBox="0 0 20 21"
                >
                  <path
                    fill="#fff"
                    d="M14.28 7.72a.748.748 0 0 1 0 1.06l-5.25 5.25a.748.748 0 0 1-1.06 0l-2.25-2.25a.75.75 0 1 1 1.06-1.06l1.72 1.72 4.72-4.72a.75.75 0 0 1 1.06 0Zm5.47 2.78A9.75 9.75 0 1 1 10 .75a9.76 9.76 0 0 1 9.75 9.75Zm-1.5 0A8.25 8.25 0 1 0 10 18.75a8.26 8.26 0 0 0 8.25-8.25Z"
                  />
                </svg>
                Message Sent!
              </p>
              <p>Thanks for completing the form. We'll be in touch soon!</p>
            </li>
          </ol>
        </div>
      </Show>
    </Portal>
  );
}
