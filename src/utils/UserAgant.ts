class UserAgant {

  private ua: string = window.navigator.userAgent.toLowerCase()
  private ver: string = window.navigator.appVersion.toLowerCase()

  constructor() {
  }

  browser():string {
    let b:string = ''
    // Edge
    if (this.ua.indexOf('edge') !== -1) {
      b = 'edge'
    }
    // ieMobile
    else if (this.ua.indexOf('iemobile') !== -1) {
      b = 'iemobile'
    }
    // ie11
    else if (this.ua.indexOf('trident/7') !== -1) {
      b = 'ie11'
    }
    // ie
    else if (this.ua.indexOf('msie') !== -1 && this.ua.indexOf('opera') === -1) {
      // ie6
      if (this.ver.indexOf('msie 6.') !== -1) {
        b = 'ie6'
      }
      // ie7
      else if (this.ver.indexOf('msie 7.') !== -1) {
        b = 'ie7'
      }
      // ie8
      else if (this.ver.indexOf('msie 8.') !== -1) {
        b = 'ie8'
      }
      // ie9
      else if (this.ver.indexOf('msie 9.') !== -1) {
        b = 'ie9'
      }
      // ie10
      else if (this.ver.indexOf('msie 10.') !== -1) {
        b = 'ie10'
      }
    }
    // Chrome
    else if (this.ua.indexOf('chrome') !== -1 && this.ua.indexOf('edge') === -1) {
      b = 'chrome'
    }
    // Safari
    else if (this.ua.indexOf('safari') !== -1 && this.ua.indexOf('chrome') === -1) {
      b = 'safari'
    }
    // Opera
    else if (this.ua.indexOf('opera') !== -1) {
      b = 'opera'
    }
    // Firefox
    else if (this.ua.indexOf('firefox') !== -1) {
      b = 'firefox'
    }
    // Unknown
    else {
      b = 'unknown_browser'
    }
    return b
  }

  device():string {
    if (this.ua.indexOf('iphone') !== -1 || this.ua.indexOf('ipod') !== -1) return 'iphone'
    else if (this.ua.indexOf('ipad') !== -1) return 'ipad'
    else if (this.ua.indexOf('android') !== -1) return 'android'
    else if (this.ua.indexOf('windows') !== -1 && this.ua.indexOf('phone') !== -1) return 'windows_phone'
    else return ''
  }

  iosVersion():number {
    let value:any = 0
    if (this.isiOS()) {
    // if (/iP(hone|od|ad)/.test(navigator.platform)) {
      let v:any = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/)
      let versions:number[] = [
        parseInt(v[1], 10),
        parseInt(v[2], 10),
        parseInt(v[3] || '0', 10)
      ]
      value = versions[0]
    }
    else{
      value = 0
    }
    return value
  }

  androidVersion():number {
    let ua:string = this.ua.toLowerCase()
    let match:any = ua.match(/android\s([0-9\.]*)/)
    if(match){
      return parseFloat(match[1])
    }
    else{
      return 0
    }
  }

  isIE():boolean {
    let browser:string = this.browser()
    if(browser.substr(0, 2) === 'ie' && browser !== 'iemobile'){
      return true
    }
    else{
      return false
    }
  }

  isiOS():boolean {
    let device:string = this.device()
    return (device === 'iphone' || device === 'ipad')
  }

  isAndroid():boolean {
    let ua:string = this.ua.toLowerCase()
    if(ua.indexOf('android') > -1){
      return true
    }
    else{
      return false
    }
  }

  isMobile():boolean {
    let device:string = this.device()
    return (this.ua.indexOf('mobi') !== -1 || device === 'iphone' || (device === 'windows_phone' && this.ua.indexOf('wpdesktop') === -1) || device === 'iemobile')
  }

  isTablet():boolean {
    let device:string = this.device()
    let isMobile:boolean = this.isMobile()
    return (device === 'ipad' || (device === 'android' && !isMobile))
  }

  isTouch():boolean {
    return ('ontouchstart' in window)
  }

  isModern():boolean {
    let browser:string = this.browser()
    let iosVersion:number = this.iosVersion()
    return !(browser === 'ie6' || browser === 'ie7' || browser === 'ie8' || browser === 'ie9' || (0 < iosVersion && iosVersion < 8))
  }

  homeClass():string {
    let browser:string = this.browser()
    let device:string = this.device()
    let classStr:string = ''
    classStr += (browser !== '') ? browser + ' ' : 'browser-unknown ',
      classStr += (device !== '') ? device + ' ' : 'device-unknown ',
      classStr += (this.isMobile()) ? 'mobile ' : 'desktop ',
      classStr += (this.isTouch()) ? 'touch ' : 'mouse ',
      classStr += (this.isiOS()) ? 'ios ' : '',
      classStr += (this.isIE()) ? 'ie ' : '',
      classStr += (this.isModern()) ? 'modern ' : 'old '
    return classStr
  }

  addClass(){
    let homeClass:string = this.homeClass()
    document.addEventListener('DOMContentLoaded', function() {
      document.documentElement.className += homeClass
    })
  }

}

export default UserAgant
