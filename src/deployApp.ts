import { DeployAppRes } from "./types/data"
import { fetcher, DEFAULT_HOST, CONTEXT, CYBOZU_USER_ID, CYBOZU_USER_NAME, CYBOZU_X_CYBOZU_AHTHORIZATION, ADMINISTRATOR_X_CYBOZU_AUTHORIZATION, ADMINISTRATOR_USER_ID } from "./utils"

export type DeployAppParams = {
  appId: string
  userName: string
}

/**
 * POST /k/api/dev/app/deploySync.json
 *
 * @param DeployAppParams
 * @returns Promise
 */
const deployApp = async (
  postData: DeployAppParams
): Promise<DeployAppRes> => {

  const xCybozuAhThorization = postData["userName"] == CYBOZU_USER_NAME ? CYBOZU_X_CYBOZU_AHTHORIZATION : ADMINISTRATOR_X_CYBOZU_AUTHORIZATION

  return await fetcher(`${DEFAULT_HOST}/${CONTEXT}/api/dev/app/deploySync.json`, {
    method: 'POST',
    headers: {
      Origin: '*',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Cybozu-Authorization': xCybozuAhThorization,
      'Authorization': `Basic ${xCybozuAhThorization}`
    },
    body: JSON.stringify({
      app: postData["appId"]
    })
  })
}

export default deployApp
