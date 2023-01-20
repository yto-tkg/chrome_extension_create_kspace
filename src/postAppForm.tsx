import React, { ChangeEvent, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import postSpace from "./postSpace";
import { PostSpaceRes } from "./types/data";
import { ADMINISTRATOR_USER_NAME, CYBOZU_USER_NAME, DEFAULT_HOST } from "./utils";
import { countValidateRules, nameValidateRules } from "./validateRules";

type FormData = {
  host: string
  appName: string
  count: number
}
const AppForm = () => {

  const [message, setMessage] = useState<string>('')

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      appName: 'test',
      count: 1
    }
  });

  const onSubmit = handleSubmit(async (data) => {
    setMessage('アプリを作成中...')

    const spaceName = data["spaceName"]
    let resCount = 0
    for (let i = 1; i <= data["count"]; i++) {
      if (data["isIncliment"]) {
        data["spaceName"] = spaceName + i
      }
      await postSpaceFetch(data).then((res) => {
        if (!res) {
          setMessage('アプリの作成に失敗しました')
        } else {
          resCount++
          resCount == data["count"] && setMessage('アプリの作成が完了しました')
        }
      }).catch(err => {
        setMessage('アプリの作成に失敗しました')
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
        <div style={{ fontWeight: "bold", fontSize: "x-large" }}>アプリ</div>
        <div>ホスト: {DEFAULT_HOST}</div>
        <div>アプリ名: <span style={{ color: 'red' }}>*</span>
          <input type="text" {...register("appName", nameValidateRules)} />
          <div style={{ color: 'red' }}>{errors.appName && errors.appName.message}</div>
          <div style={{ marginLeft: '3px' }}><input type="checkbox" {...register("isIncliment")} />アプリ名に添字+1を付与する(i.e. 1,...,n)</div>
        </div>
        <div>作成数: <span style={{ color: 'red' }}>*</span>
          <input type="text" {...register("count", countValidateRules)} />
          <div style={{ color: 'red' }}>{errors.count && errors.count.message}</div>
        </div>
        <button type="submit">アプリを作成</button>
        <p style={{ color: 'red' }}>{message}</p>
      </form>
    </>
  );
};

export default AppForm
