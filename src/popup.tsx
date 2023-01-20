import React, { ChangeEvent, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import postSpace from "./postSpace";
import SpaceForm from "./postSpaceForm";
import { PostSpaceRes } from "./types/data";
import { ADMINISTRATOR_USER_NAME, CYBOZU_USER_NAME, DEFAULT_HOST } from "./utils";
import { countValidateRules, nameValidateRules } from "./validateRules";

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
