import React, { ChangeEvent, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import  deployApp, { DeployAppParams } from "./deployApp";
import addApp from "./addApp";
import { AddAppRes, AddAppResObject, DeployAppRes, PostSpaceRes } from "./types/data";
import { ADMINISTRATOR_USER_NAME, CYBOZU_USER_NAME, DEFAULT_HOST } from "./utils";
import { countValidateRules, nameValidateRules } from "./validateRules";

type FormData = {
  userName: string
  appName: string
  count: number
  isIncliment: boolean
}

type DeployData = {
  appId: string
  userName: string
}

const AppForm = () => {

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
      appName: 'test',
      count: 1
    }
  });

  const onSubmit = handleSubmit(async (data) => {
    setMessage('アプリを作成中...')

    const appName = data["appName"]
    let resCount = 0
    for (let i = 1; i <= data["count"]; i++) {
      if (data["isIncliment"]) {
        data["appName"] = appName + i
      }
      await addAppFetch(data).then(async (res) => {
        console.log('res: ', res)
        if (!res) {
          alert('1')
          setMessage('アプリの作成に失敗しました')
        } else {
          const deployData = {
            appId: res,
            userName: data["userName"]
          }
          await deployAppFetch(deployData).then((deployRes) => {
            if (!deployRes) {
              alert('2')
              setMessage('アプリの作成に失敗しました')
            } else {
              resCount++
              resCount == data["count"] && setMessage('アプリの作成が完了しました')

            }
          })  
        }
      }).catch(err => {
        alert('3')
        setMessage('アプリの作成に失敗しました')
      })
    }
  })

  const addAppFetch = async (data: FormData): Promise<string> => {
    return await addApp(data).then((res: AddAppRes) => {
      return res["result"]
    }).then(((res: AddAppResObject) => {
        return res["appId"]
      }))
  }

  const deployAppFetch = async (data: DeployAppParams): Promise<boolean> => {
    return await deployApp(data).then((res: DeployAppRes) => {
      return Boolean(res["success"])
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
        <div style={{ fontWeight: "bold", fontSize: "x-large" }}>アプリ</div>
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
