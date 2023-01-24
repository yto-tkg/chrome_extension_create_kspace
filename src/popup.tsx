import React from "react";
import ReactDOM from "react-dom";
import AppForm from "./postAppForm";
import SpaceForm from "./postSpaceForm";

const Popup = () => {
  return (
    <>
      <div style={{ minWidth: "300px" }}>
        <SpaceForm />
      </div>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
