import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { VideoListingProvider, VideoPlayProvider } from "./providers";
// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <VideoPlayProvider>
        <VideoListingProvider>
          <App />
        </VideoListingProvider>
      </VideoPlayProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
