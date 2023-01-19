import { PostSpaceRes } from "./types/data"
import { fetcher, DEFAULT_HOST, CONTEXT, CYBOZU_USER_ID, CYBOZU_USER_NAME, CYBOZU_X_CYBOZU_AHTHORIZATION, ADMINISTRATOR_X_CYBOZU_AUTHORIZATION, ADMINISTRATOR_USER_ID } from "./utils"

export type PostSpaceParams = {
  host: string
  userName: string
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
  const userCode = postData["userName"] == CYBOZU_USER_NAME ? CYBOZU_USER_ID : ADMINISTRATOR_USER_ID

  return await fetcher(`${DEFAULT_HOST}/${CONTEXT}/api/space/add.json`, {
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
          id: userCode,
          entityId: userCode,
          code: postData["userName"],
          entityName: postData["userName"],
          name: postData["userName"],
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
