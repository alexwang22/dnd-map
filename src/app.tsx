// @refresh reload
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start";
import { ErrorBoundary, Suspense } from "solid-js";
import "./app.scss";

window.addEventListener("error", (error) => {
  console.log(error);
});

export default function App() {
  return (
    <Router
      root={(props) => (
        <ErrorBoundary
          fallback={(error) => {
            console.log(error);
            return null;
          }}
        >
          <Suspense>{props.children}</Suspense>
        </ErrorBoundary>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
