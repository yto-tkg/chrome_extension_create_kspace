import { PostSpaceRes } from "./types/data"
import { fetcher, DEFAULT_HOST, CONTEXT, CONTENT_TYPE_JSON, X_CYBOZU_AUTHORIZATION } from "./utils"

export type PostSpaceParams = {
  host: string
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
      id: 1,
      name: postData["spaceName"],
      members: [
        {
          entity: {
            type: "USER",
            code: "Administrator"
          }
        }
      ],
      isPrivate: postData["isPrivate"],
      isGuest: postData["isGuest"]
    })
  })
}

export default postSpace
