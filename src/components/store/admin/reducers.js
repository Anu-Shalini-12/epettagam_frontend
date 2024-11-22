import { GET_ALL_USERS_ADMIN,NOT_REDIRECT,GET_STACK_DATA,GET_COUNT_ADMIN,GET_GRAPH_DATA,GET_FIRST_GRAPH_DATA,GET_COUNT_DATA,GET_COUNT_VERIFIED} from './types'

const initialState = {
    allUser: '',
    countData:'',
    graphData:'',
    firstGraphData:'',
    countValueData:'',
    VerCount:'',
    stackData:'',
    dataRed:''
}

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case NOT_REDIRECT:
      return {
        ...state,
        dataRed: payload,
      }
    case GET_STACK_DATA:
      return {
        ...state,
        stackData: payload,
      }
    case GET_COUNT_VERIFIED:
      return {
        ...state,
        VerCount: payload,
      }
    case GET_COUNT_DATA:{
      return {
        ...state,
        countValueData: payload,
      }}
    case GET_FIRST_GRAPH_DATA:{
      return {
        ...state,
        firstGraphData: payload,
      }}
    case GET_GRAPH_DATA:
      return {
        ...state,
        graphData: payload,
      }
    case GET_COUNT_ADMIN:
      return {
        ...state,
        countData: payload,
      }
    case GET_ALL_USERS_ADMIN:
      return {
        ...state,
        allUser: payload,
      }
    default:
      return {
        ...state,
      }
  }
}
