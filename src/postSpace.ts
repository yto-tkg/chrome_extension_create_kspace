import { PostSpaceRes } from "./types/data"
import { fetcher, DEFAULT_HOST, CONTEXT, CONTENT_TYPE_JSON, X_CYBOZU_AUTHORIZATION, CYBOZU_USER_ID, CYBOZU_USER_NAME, CYBOZU_X_CYBOZU_AHTHORIZATION, ADMINISTRATOR_X_CYBOZU_AUTHORIZATION } from "./utils"

export type PostSpaceParams = {
  host: string
  userName: string
  userCode: number
  spaceName: string
  count: number
  isMultiThread: boolean
  isPrivate: boolean
  isGuest: boolean
}

/**
 * POST /k/v1/template/space.json
 *
 * @param PostSpaceParams
 * @returns Promise
 */
const postSpace = async (
  postData: PostSpaceParams
): Promise<PostSpaceRes> => {

  const xCybozuAhThorization = postData["userName"] == CYBOZU_USER_NAME ? CYBOZU_X_CYBOZU_AHTHORIZATION : ADMINISTRATOR_X_CYBOZU_AUTHORIZATION 

  return await fetcher(`${postData["host"] ?? DEFAULT_HOST}/${CONTEXT}/api/space/add.json`, {
    method: 'POST',
    headers: {
      Origin: '*',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Cybozu-Authorization': xCybozuAhThorization,
      'Authorization': `Basic ${xCybozuAhThorization}`
    },
    body: JSON.stringify({
      name: postData["spaceName"] ?? test,
      announcementShown: true,
      appCreationRight: "EVERYONE",
      appListShown: true,
      blobCover: null,
      coverType: "PRESET",
      fixedMember: false,
      force: false,
      id: null,
      isGuest: postData["isGuest"] ?? false,
      isPrivate: postData["isPrivate"] ?? false,
      members: [
        {
          id: postData["userCode"] ?? CYBOZU_USER_ID,
          entityId: postData["userCode"] ?? CYBOZU_USER_ID,
          code: postData["userName"] ?? CYBOZU_USER_NAME,
          entityName: postData["userName"] ?? CYBOZU_USER_NAME,
          name: postData["userName"] ?? CYBOZU_USER_NAME,
          entityType: "USER",
          isAdmin: true,
          isRecursive: false,
        },
      ],
      peopleListShown: true,
      presetCover: "GREEN",
      relatedLinkListShown: true,
      threadListShown: true,
      useMultiThread: postData["isMultiThread"] ?? false,
    })
  })
}

export default postSpace
