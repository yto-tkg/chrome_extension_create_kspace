import { PostSpaceRes } from "./types/data"
import { fetcher, DEFAULT_HOST, CONTEXT, CONTENT_TYPE_JSON, X_CYBOZU_AUTHORIZATION, CYBOZU_USER_ID, CYBOZU_USER_NAME } from "./utils"

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

  return await fetcher(`${postData["host"] ?? DEFAULT_HOST}/${CONTEXT}/api/space/add.json`, {
    method: 'POST',
    headers: {
      Origin: '*',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Cybozu-Authorization': X_CYBOZU_AUTHORIZATION,
      'Authorization': `Basic ${X_CYBOZU_AUTHORIZATION}`
    },
    body: JSON.stringify({
      name: postData["spaceName"],
      announcementShown: true,
      appCreationRight: "EVERYONE",
      appListShown: true,
      blobCover: null,
      coverType: "PRESET",
      fixedMember: false,
      force: false,
      id: null,
      isGuest : postData["isGuest"],
      isPrivate: postData["isPrivate"],
      members: [
          {
              id: CYBOZU_USER_ID,
              entityId: CYBOZU_USER_ID,
              code: CYBOZU_USER_ID,
              entityName: CYBOZU_USER_NAME,
              name: CYBOZU_USER_NAME,
              entityType: "USER",
              isAdmin: true,
              isRecursive: false,
          },
      ],
      peopleListShown : true,
      presetCover : "GREEN",
      relatedLinkListShown : true,
      threadListShown : true,
      useMultiThread : postData["isMultiThread"],
    })
  })
}

export default postSpace
