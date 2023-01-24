import React from "react";
import ReactDOM from "react-dom";
import AppForm from "./postAppForm";
import SpaceForm from "./postSpaceForm";

type FormData = {
  host: string
  userName: string
  spaceName: string
  isIncliment: boolean
  count: number
  isMultiThread: boolean
  isPrivate: boolean
  isGuest: boolean
}

const Popup = () => {
  return (
    <>
      <div style={{ minWidth: "300px" }}>
        <SpaceForm />
        //<AppForm />
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
