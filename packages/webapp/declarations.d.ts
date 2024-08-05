// for the old connectkit version we're using
declare module "connectkit" {
  const ConnectKit: any
  const ConnectKitProvider: any
  const getDefaultConfig: any
  export default ConnectKit
  export { ConnectKitProvider, getDefaultConfig }
}