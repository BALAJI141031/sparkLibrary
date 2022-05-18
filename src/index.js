import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import {
  VideoListingProvider,
  VideoPlayProvider,
  AnalyticsVideoProvider,
  PlaylistProvider,
  AuthProvider,
  SnackbarProvider,
} from "./providers";
// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <SnackbarProvider>
        <AuthProvider>
          <PlaylistProvider>
            <AnalyticsVideoProvider>
              <VideoPlayProvider>
                <VideoListingProvider>
                  <App />
                </VideoListingProvider>
              </VideoPlayProvider>
            </AnalyticsVideoProvider>
          </PlaylistProvider>
        </AuthProvider>
      </SnackbarProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
