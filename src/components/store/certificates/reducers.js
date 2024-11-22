import {GET_ALL_USERS,GET_ALL_SRO,GET_ALL_DISTRICT,GET_ALL_ZONE,GET_ALL_DMECERT,BLOCK_USER_ERR,GENERATE_OTP_ERR,GET_REVOKE_USERS,OTP_VERIFY_ERR,GET_LOGIN_CONSENT,GET_ALL_BLOCKED_USERS,GET_TOTAL_USER_COUNT,BLOCK_USER, GET_CERTIFICATE,GENERATE_OTP,SET_ROUTING_NAME,VERIFY_OTP,RESEND_OTP_ERR,RESEND_OTP,GET_CERTIFICATE_ERR, GET_DIGI_LOCKER ,LOGOUT_DATA_ERR,LOGOUT_DATA, GET_DIGI_LOCKER_ERR,CLOSE_MODAL, MAIN_LOGIN_DATA,MAIN_LOGIN_DATA_ERR, OTP_VERIFY, GET_ALL_EDUCERT,GET_ALL_SEVCERT , GET_CERTIFICATE_XML,GET_BULK_PULL,GET_BULK_PULL_ERR} from './types'

const initialState = {
  certDetails: {},
  openModal: false,
  redirectScreen:false,
  getLogin_res: '',
  getAll_educert:'',
  getAll_sevcert:'',
  certDetailsXml:'',
  get_bulkPull:undefined,
  get_bulk_err: undefined,
  otp_verification: undefined,
  digilockerData: undefined,
  digilockerData_err: undefined,
  loggedOut: undefined,
  loggedOut_err: undefined,
  certDetail_err:'',
  getLogin_res_err:'',
  err_resend_otp:'',
  resend_otpData:'',
  login_message:'',
  verify_otp:'',
  route_title:'',
  all_users:'',
  blocked_users:'',
  total_user_count:'',
  otp_verification_err:'',
  block_user:'',
  blockuserErr:'',
  login_consent:'',
  dmeList:'',
  errorLogin:'', 
  revUser:'',
  allZone:'',
  allDistrict:'',
  allSro:'',
}

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_ALL_SRO:
            return{...state, allSro:payload}
    case GET_ALL_DISTRICT:
            return{...state, allDistrict:payload}
    case GET_ALL_ZONE:
            return{...state, allZone:payload}
    case GET_REVOKE_USERS:
            return{...state, revUser:payload}
    case GENERATE_OTP_ERR:
            return{...state, errorLogin:payload}
    case GET_ALL_DMECERT:
            return{...state, dmeList:payload}
    case GET_LOGIN_CONSENT:
            return{...state, login_consent:payload}
    case GET_ALL_USERS:
            return{...state, all_users:payload}
        case GET_ALL_BLOCKED_USERS:
            return {...state, blocked_users:payload}
        case GET_TOTAL_USER_COUNT:
            return {...state, total_user_count:payload}
        case BLOCK_USER:
            return {...state, block_user:payload}
        case BLOCK_USER_ERR:
            return {...state,blockuserErr:payload}
    case SET_ROUTING_NAME:
      return {
        ...state,
        route_title: payload,
      }
      case RESEND_OTP_ERR:
        return {
          ...state,
          err_resend_otp: payload,
          openModal: true,
        }
      case RESEND_OTP:
        return {
          ...state,
          resend_otpData: payload,
          openModal: true,
        }
    case GET_CERTIFICATE:
      return {
        ...state,
        certDetails: payload,
        redirectScreen: true,
      }
      case GET_CERTIFICATE_ERR:
        return {
          ...state,
          certDetail_err:payload
        }
      case GET_CERTIFICATE_XML:
        return {
          ...state,
          certDetailsXml: payload,
          openModal: true,
        }
    case CLOSE_MODAL:
      return {
        ...state,
        openModal: false,
      }
      case MAIN_LOGIN_DATA:
        return {
          ...state,
          getLogin_res: payload,
        }
        case MAIN_LOGIN_DATA_ERR:
          return {
            ...state,
            getLogin_res_err: payload,
          }
      case GET_ALL_EDUCERT:
        return {
          ...state,
          getAll_educert: payload,
        }
        case GET_ALL_SEVCERT:
          return {
            ...state,
            getAll_sevcert: payload,
          }
        case GET_BULK_PULL:
          return {
            ...state,
            get_bulkPull: payload,
          }
          case GET_BULK_PULL_ERR:
            return{
              ...state,
              get_bulk_err: payload,
        }
        case OTP_VERIFY:
            return{
              ...state,
              otp_verification: payload,
        }
        case OTP_VERIFY_ERR:
          return{
            ...state,
            otp_verification_err:payload
          }
        case GET_DIGI_LOCKER:
            return{
              ...state,
              digilockerData: payload,
        }
        case GET_DIGI_LOCKER_ERR:
            return{
              ...state,
              digilockerData_err: payload,
        }
        case LOGOUT_DATA_ERR:
            return{
              ...state,
              loggedOut_err: payload,
        }
        case LOGOUT_DATA:
            return{
              ...state,
              loggedOut: payload,
        }
        case GENERATE_OTP:
            return{
                ...state,
                login_message:payload
            }
        case VERIFY_OTP:
            return{
                ...state,
                verify_otp:payload
            }
    default:
      return {
        ...state,
      }
  }
}
