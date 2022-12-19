import {KJUR} from 'jsrsasign';
import {Rowma} from 'rowma_js';

const rowma = new Rowma();
const socket = await rowma.connect()

const sdkKey = "YYdjlwLjfahvaypXrY5KvCiTbX1EOZdKtGMh"
const sdkSecret = "YGnMpzY02u3IssEsWUidKwKTpFa6mUcyX2Gv"
const role = 1 // The user role. Required. Values: 0 to specify participant, 1 to specify host.
const sessionName = "Turtlebot"
const sessionKey = "1104"
const userIdentity = "test_user"

generateSignature(sdkKey, sdkSecret, sessionName, role, sessionKey, userIdentity)

function generateSignature(sdkKey, sdkSecret, sessionName, role, sessionKey, userIdentity) {
  var iat = Math.round((new Date().getTime() - 30000) / 1000)
  var exp = iat + 3600 * 24
  var JWTtoken = set(iat, exp)
  var token = {"data": JWTtoken}
　rowma.publish("turtlebot", "/token", token)
  //console.log(sdkJWT)
  setInterval(function(){
    var JWTverify = KJUR.jws.JWS.verifyJWT(JWTtoken , sdkSecret, {alg: ['HS256']})
    //console.log(JWTverify)
    if(JWTverify == false){
      console.log("JWT token is expired")
      iat = Math.round((new Date().getTime() - 30000) / 1000)
      exp = iat + 3600 * 24
      JWTtoken = set(iat, exp)
      token = {"data": JWTtoken}
    }
  　  rowma.publish("turtlebot", "/token", token)
      //console.log(token)
  },5000);
}

function set(iat, exp){
  var oHeader = { alg: 'HS256', typ: 'JWT' }
  var oPayload = {
    app_key: sdkKey,
    tpc: sessionName,
    role_type: role,
    session_key: sessionKey,
    user_identity: userIdentity,
    iat: iat,
    exp: exp
  }
  var sHeader = JSON.stringify(oHeader)
  var sPayload = JSON.stringify(oPayload)
  var sdkJWT = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, sdkSecret)
  console.log('=============================================')
  console.log(sdkJWT)
  console.log('=============================================')
  return sdkJWT
}
