export const DEFAULT_HOST = 'http://localhost'
export const CONTEXT = 'k'
export const CONTENT_TYPE_JSON = 'appication/json'
export const ADMINISTRATOR_X_CYBOZU_AUTHORIZATION = 'QWRtaW5pc3RyYXRvcjpjeWJvenU='
export const CYBOZU_X_CYBOZU_AHTHORIZATION = 'Y3lib3p1OmN5Ym96dQ=='
export const CYBOZU_USER_ID = 1000000
export const CYBOZU_USER_NAME = 'cybozu'

export const fetcher = async (
  resource: RequestInfo,
  init?: RequestInit,
): Promise<any> => {

  const res = await fetch(resource, init)
  const resJson = await res.json()

  if (!res.ok) {
    const error = new Error(
      resJson.message ?? 'APIリクエスト中にエラーが発生しました.'
    )
    alert(`エラー: ${error.message}`)
    return null
  } else if (!resJson.success) {
    alert(`エラー: ${resJson.message}`)
    return null
  }

  return resJson
}
