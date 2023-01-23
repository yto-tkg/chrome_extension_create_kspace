import { AddAppRes } from "./types/data"
import { fetcher, DEFAULT_HOST, CONTEXT, CYBOZU_USER_ID, CYBOZU_USER_NAME, CYBOZU_X_CYBOZU_AHTHORIZATION, ADMINISTRATOR_X_CYBOZU_AUTHORIZATION, ADMINISTRATOR_USER_ID } from "./utils"

export type AddAppParams = {
  userName: string
  appName: string
}

/**
 * POST /k/api/dev/app/add.json
 *
 * @param AddAppParams
 * @returns Promise
 */
const addApp = async (
  postData: AddAppParams
): Promise<AddAppRes> => {

  const xCybozuAhThorization = postData["userName"] == CYBOZU_USER_NAME ? CYBOZU_X_CYBOZU_AHTHORIZATION : ADMINISTRATOR_X_CYBOZU_AUTHORIZATION

  return await fetcher(`${DEFAULT_HOST}/${CONTEXT}/api/dev/app/add.json`, {
    method: 'POST',
    headers: {
      Origin: '*',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Cybozu-Authorization': xCybozuAhThorization,
      'Authorization': `Basic ${xCybozuAhThorization}`
    },
    body: JSON.stringify({
      name: postData["appName"] ?? test,
    })
  })
}

export default addApp
