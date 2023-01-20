import React, { ChangeEvent, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import postSpace from "./postSpace";
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
const SpaceForm = () => {

  const [message, setMessage] = useState<string>('')
  const [selectedUser, setSelectedUser] = useState<string>(ADMINISTRATOR_USER_NAME)
  const [userValidate, setUserValidate] = useState<string>('')

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      spaceName: 'test',
      count: 1
    }
  });

  const onSubmit = handleSubmit(async (data) => {
    setMessage('スペースを作成中...')

    const spaceName = data["spaceName"]
    let resCount = 0
    for (let i = 1; i <= data["count"]; i++) {
      if (data["isIncliment"]) {
        data["spaceName"] = spaceName + i
      }
      await postSpaceFetch(data).then((res) => {
        if (!res) {
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
    const selected = e.target.value
    if (selected !== ADMINISTRATOR_USER_NAME && selected !== CYBOZU_USER_NAME) {
      setUserValidate('Administrator又はcybozuを選択してください')
    }

    setValue("userName", selected)
    setSelectedUser(selected)
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <div style={{ fontWeight: "bold", fontSize: "x-large" }}>スペース</div>
        <div>ホスト: {DEFAULT_HOST}</div>
        <div>ユーザー:<span style={{ color: 'red' }}>*</span>
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
          <div style={{ color: 'red' }}>{userValidate}</div>
        </div>
        <div>スペース名: <span style={{ color: 'red' }}>*</span>
          <input type="text" {...register("spaceName", nameValidateRules)} />
          <div style={{ color: 'red' }}>{errors.spaceName && errors.spaceName.message}</div>
          <div style={{ marginLeft: '3px' }}><input type="checkbox" {...register("isIncliment")} />スペース名に添字+1を付与する(i.e. 1,...,n)</div>
        </div>
        <div>作成数: <span style={{ color: 'red' }}>*</span>
          <input type="text" {...register("count", countValidateRules)} />
          <div style={{ color: 'red' }}>{errors.count && errors.count.message}</div>
        </div>
        <div><input type="checkbox" {...register("isMultiThread")} />マルチスレッド</div>
        <div><input type="checkbox" {...register("isPrivate")} />非公開</div>
        <div><input type="checkbox" {...register("isGuest")} />ゲストスペース</div>
        <button type="submit">スペースを作成</button>
        <p style={{ color: 'red' }}>{message}</p>
      </form>
    </>
  );
};

export default SpaceForm
