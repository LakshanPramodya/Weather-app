import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();

root.render(
  <Auth0Provider
    domain="dev-duehhs6w.us.auth0.com"
    clientId="ahqYjrTHh4rz84tSYCzBvpUHvBVpeLTh"
    redirectUri={window.location.origin}
  >
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </Auth0Provider>
);
