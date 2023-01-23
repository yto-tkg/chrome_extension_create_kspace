export type PostSpaceRes = {
  id: string
}

export type AddAppRes = {
  result: AddAppResObject
  success: boolean
}

export type AddAppResObject = {
  appId: string
  items: []
}

export type DeployAppRes = {
  result: object
  success: boolean
}
