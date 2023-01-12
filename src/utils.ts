export const DEFAULT_HOST = 'http://localhost'
export const CONTEXT = 'k'
export const CONTENT_TYPE_JSON = 'appication/json'
export const X_CYBOZU_AUTHORIZATION = 'QWRtaW5pc3RyYXRvcjpjeWJvenU='

export const fetcher = async (
  resource: RequestInfo,
  init?: RequestInit,
): Promise<any> => {

  debugger;
  console.log(resource)
  console.log(init?.headers)
  console.log(init?.body)

  const res = await fetch(resource, init)

  if (!res.ok) {
    const errorRes = await res.json()
    const error = new Error(
      errorRes.message ?? 'APIリクエスト中にエラーが発生しました.'
    )
    alert(`エラー: ${error.message}`)
    return ''
  }

  return res.json()
}
