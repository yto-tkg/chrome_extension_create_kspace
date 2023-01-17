import React, { ChangeEvent, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import postSpace from "./postSpace";
import { PostSpaceRes } from "./types/data";
import { ADMINISTRATOR_USER_NAME, CYBOZU_USER_NAME, DEFAULT_HOST } from "./utils";

type FormData = {
  host: string
  userName: string
  spaceName: string
  count: number
  isMultiThread: boolean
  isPrivate: boolean
  isGuest: boolean
}
const Popup = () => {

  const [message, setMessage] = useState<string>('')
  const users = [ADMINISTRATOR_USER_NAME, CYBOZU_USER_NAME]
  const [selectedUser, setSelectedUser] = useState<string>(ADMINISTRATOR_USER_NAME)

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      host: DEFAULT_HOST,
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

  const userChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue("userName", e.target.value)
    setSelectedUser(e.target.value)
  }
  
  return (
    <>
      <form onSubmit={onSubmit}>
        <div style={{ minWidth: "700px" }}>
          <div>ホスト: <input type="text" {...register("host")} /></div>
          <div>ユーザー名:
              <input 
                id={ADMINISTRATOR_USER_NAME}
                type="radio"
                value={ADMINISTRATOR_USER_NAME}
                onChange={userChange}
                checked={ADMINISTRATOR_USER_NAME === selectedUser}
              />
              <label htmlFor={ADMINISTRATOR_USER_NAME}>{ADMINISTRATOR_USER_NAME}</label>
               <input 
                id={CYBOZU_USER_NAME}
                type="radio"
                value={CYBOZU_USER_NAME}
                onChange={userChange}
                checked={CYBOZU_USER_NAME === selectedUser}
              />
              <label htmlFor={CYBOZU_USER_NAME}>{CYBOZU_USER_NAME}</label>
          </div>
          <div>スペース名: <input type="text" {...register("spaceName")} /></div>
          <div>作成数: <input type="text" {...register("count")} /></div>
          <div><input type="checkbox" {...register("isMultiThread")} />マルチスレッド</div>
          <div><input type="checkbox" {...register("isPrivate")} />非公開</div>
          <div><input type="checkbox" {...register("isGuest")} />ゲストスペース</div>
          <button type="submit">作成</button>
          <p style={{color: 'red'}}>{message}</p>
        </div>
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
