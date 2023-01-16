import React, { ChangeEvent, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import postSpace from "./postSpace";
import { PostSpaceRes } from "./types/data";
import { CYBOZU_USER_ID, CYBOZU_USER_NAME, DEFAULT_HOST } from "./utils";

type FormData = {
  host: string
  userName: string
  userCode: number
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
  } = useForm<FormData>({
    defaultValues: {
      userName: CYBOZU_USER_NAME,
      host: DEFAULT_HOST,
      userCode: CYBOZU_USER_ID,
      spaceName: 'test',
      count: 1
    }
  });

  const onSubmit = handleSubmit(async (data) => {
    setMessage('スペースを作成中...')

    const spaceName = data["spaceName"]
    let resCount = 0
    for(let i = 1; i <= data["count"]; i++) {
      data["spaceName"] = spaceName + i
      await postSpaceFetch(data).then((res) => {
        if(!res) {
          setMessage('スペースの作成に失敗しました')
        } else {
          resCount++
          resCount == data["count"] && setMessage('スペースの作成が完了しました')
        }
      }).catch(err => {
          setMessage('スペースの作成に失敗しました')
      })
    }
  })

  const postSpaceFetch = async (data: FormData): Promise<string> => {
    return await postSpace(data).then((res: PostSpaceRes) => {
      return String(res["id"])
    })
  }
  
  return (
    <>
      <form onSubmit={onSubmit}>
        <ul style={{ minWidth: "700px" }}>
          <li>ホスト: <input type="text" {...register("host")} /></li>
          <li>ユーザー名: <input type="text" {...register("userName")} /></li>
          <li>ユーザーコード: <input type="text" {...register("userCode")} /> ※cybozu: 1000000 / Administrator: 7532782697181632512</li>
          <li>スペース名: <input type="text" {...register("spaceName")} /></li>
          <li>作成数: <input type="text" {...register("count")} /></li>
          <li><input type="checkbox" {...register("isMultiThread")} />マルチスレッド</li>
          <li><input type="checkbox" {...register("isPrivate")} />非公開</li>
          <li><input type="checkbox" {...register("isGuest")} />ゲストスペース</li>
          <button type="submit">作成</button>
          <p style={{color: 'red'}}>{message}</p>
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
