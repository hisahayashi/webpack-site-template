const sleep:any = (msec:number) => {
  return new Promise<void>((resolve:any) => {
    setTimeout(resolve, msec)
  })
}
export default sleep
