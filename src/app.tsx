import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { FormProvider } from "./store/store";
import "./app.css";
import { Message } from "./components/Message";

export default function App() {
  return (
    <FormProvider>
      <Router
        root={(props) => (
          <>
            <Suspense>{props.children}</Suspense>
          </>
        )}
      >
        <FileRoutes />
      </Router>
      <Message />
    </FormProvider>
  );
}
