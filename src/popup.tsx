import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import postSpace from "./postSpace";
import { PostSpaceRes } from "./types/data";
import { DEFAULT_HOST } from "./utils";

type FormData = {
  host: string
  spaceName: string
  count: number
  isMultiThread: boolean
  isPrivate: boolean
  isGuest: boolean
}
const Popup = () => {

  const [message, setMessage] = useState<string>('')

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit(async (data) => {
    for(let i = 1; i <= data["count"]; i++) {
      data["spaceName"] = data["spaceName"] + i
      let id = await postSpaceFetch(data)
      console.log(`id: ${id}`)
      if(!id) {
        setMessage('スペースの作成に失敗しました')
        return
      }
    }
    if(!!message) {
      setMessage('スペースの作成が完了しました')
    }
  })

  const postSpaceFetch = async (data: FormData): Promise<string> => {
    return await postSpace(data).then((res: PostSpaceRes) => {
      return String(res["id"])
    })
  }

  // 初期値設定
  useEffect(() => {
    setValue("host", DEFAULT_HOST)
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
          <li><input type="checkbox" {...register("isMultiThread")} />マルチスレッド</li>
          <li><input type="checkbox" {...register("isPrivate")} />非公開</li>
          <li><input type="checkbox" {...register("isGuest")} />ゲストスペース</li>
          <li><button type="submit">作成</button></li>
          <li style={{color: 'red'}}>{message}</li>
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
