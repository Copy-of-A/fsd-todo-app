import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { baseUrl } from "shared/config";

export const withRouter = (component: () => React.ReactNode) => () =>
  (
    <BrowserRouter basename={baseUrl}>
      <Suspense fallback="Loading...">{component()}</Suspense>
    </BrowserRouter>
  );
