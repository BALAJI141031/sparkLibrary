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
} from "./providers";
// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <PlaylistProvider>
        <AnalyticsVideoProvider>
          <VideoPlayProvider>
            <VideoListingProvider>
              <App />
            </VideoListingProvider>
          </VideoPlayProvider>
        </AnalyticsVideoProvider>
      </PlaylistProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
