import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";

type FormData = {
  host: string
  spaceName: string
  count: number
  isPrivate: boolean
  isGuest: boolean
}
const Popup = () => {

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => {
    alert(data["host"])
    alert(data.spaceName)
    alert(data.count)
    alert(data.isPrivate)
    alert(data.isGuest)
  })

  // 初期値設定
  useEffect(() => {
    setValue("host", "http://localhost")
  }, [])

  useEffect(() => {
    setValue("spaceName", "test")
  }, [])

  useEffect(() => {
    setValue("count", 1)
  }, [])

  return (
    <>
      <form onSubmit={onSubmit}>
        <ul style={{ minWidth: "700px" }}>
          <li>ホスト: <input type="text" {...register("host")} /></li>
          <li>スペース名: <input type="text" {...register("spaceName")} /></li>
          <li>作成数: <input type="text" {...register("count")} /></li>
          <li><input type="checkbox" {...register("isPrivate")} />非公開</li>
          <li><input type="checkbox" {...register("isGuest")} />ゲストスペース</li>
          <li><button type="submit">作成</button></li>
        </ul>
      </form >
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
