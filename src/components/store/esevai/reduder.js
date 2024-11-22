import { GET_ALL_SERVICES,LOGIN_OTP_ERR,LOGIN_ACTION_ERR, LOGIN_ACTION ,GET_CERTIFICATE, CLOSE_MODAL,CERT_DATA, LOGIN_OTP,SHARE_CERT} from './types'

const initialState = {
  serviceList: [],
  services: [],
  login_resp: '',
  get_certificate: '',
  openModal: false,
  certData : undefined,
  login_otp : '',
  login_otp_err:'',
  share_cert: '',
  action_login_err:'', 
}

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case LOGIN_ACTION_ERR:
      return {
        ...state,
        action_login_err: payload,
      }
    case GET_ALL_SERVICES:
      return {
        ...state,
        serviceList: payload.map((service) => service),
        services: payload,
      }
      case LOGIN_ACTION:
        return {
          ...state,
          login_resp: payload,
        }
        case LOGIN_OTP:
          return {
            ...state,
            login_otp: payload,
          }
          case LOGIN_OTP_ERR:
            return {
              ...state,
              login_otp_err: payload,
            }
        case CLOSE_MODAL:
          return {
            ...state,
            openModal: false,
          }
      case GET_CERTIFICATE:
          return {
            ...state,
            get_certificate: payload,
            openModal: true,
          }
      case CERT_DATA:
            return {
              ...state,
              certData: payload,
            }
      case SHARE_CERT:
              return {
                ...state,
                share_cert: payload,
              }
    default:
      return {
        ...state,
      }
  }
}
