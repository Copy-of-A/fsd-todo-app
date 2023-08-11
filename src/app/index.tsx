import "./index.scss";
import { withProviders } from "./providers";

import { Routing } from "pages";

const App = () => (
  // Potentially you can insert here
  // A single header for the entire application
  // Or do it on separate pages
  <Routing />
);

export default withProviders(App);
