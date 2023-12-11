import { Suspense } from "react";
import { HashRouter } from "react-router-dom";
import { baseUrl } from "shared/config";

export const withRouter = (component: () => React.ReactNode) => () =>
  (
    <HashRouter basename={baseUrl}>
      <Suspense fallback="Loading...">{component()}</Suspense>
    </HashRouter>
  );
