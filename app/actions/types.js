import Config from 'react-native-config'

export const API_URL = __DEV__
  ? (Config.API_URL || 'http://localhost:3000') + '/api/v1'
  : (Config.API_URL || 'https://intro-backend.herokuapp.com') + '/api/v1'

export const API_URL_V2 = __DEV__
  ? (Config.API_URL || 'http://localhost:3000') + '/api/v2'
  : (Config.API_URL || 'https://intro-backend.herokuapp.com') + '/api/v2'

export const AUTH_INITAL_STATE = 'AUTH_INITAL_STATE'
export const INTRODUCTION_ERROR = 'INTRODUCTION_ERROR'
export const INTRODUCTION_REQUEST = 'INTRODUCTION_REQUEST'
export const INTRODUCTION_REQUEST_FULL_FETCH = 'INTRODUCTION_REQUEST_FULL_FETCH'
export const SHOW_INTRODUCTION_REQUEST = 'SHOW_INTRODUCTION_REQUEST'
export const AUTH_LOGIN_REQUEST = 'AUTH_LOGIN_REQUEST'
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS'
export const AUTH_LOGIN_FAILED = 'AUTH_LOGIN_FAILED'
export const AUTH_LOGOUT = 'AUTH_LOGOUT'
export const AUTH_TOKEN_FAILED = 'AUTH_TOKEN_FAILED'
export const AUTH_REGISTER_REQUEST = 'AUTH_REGISTER_REQUEST'
export const AUTH_REGISTER_SUCCESS = 'AUTH_REGISTER_SUCCESS'
export const AUTH_REGISTER_FAILED = 'AUTH_REGISTER_FAILED'
export const AUTH_FORGOT_PASSWORD_REQUEST = 'AUTH_FORGOT_PASSWORD_REQUEST'
export const AUTH_FORGOT_PASSWORD_SUCCESS = 'AUTH_FORGOT_PASSWORD_SUCCESS'
export const AUTH_FORGOT_PASSWORD_FAILED = 'AUTH_FORGOT_PASSWORD_FAILED'
export const AUTH_ADD_TOKEN = 'AUTH_ADD_TOKEN'
export const AUTH_REMOVE_TOKEN = 'AUTH_REMOVE_TOKEN'
export const AUTH_SET_PRIMARY_TOKEN = 'AUTH_SET_PRIMARY_TOKEN'
export const USER_SOFT_DELETE_REQUEST = 'USER_SOFT_DELETE_REQUEST'
export const USER_SOFT_DELETE_SUCCESS = 'USER_SOFT_DELETE_SUCCESS'
export const USER_RECOVER_REQUEST = 'USER_RECOVER_REQUEST'
export const USER_FETCH_REQUEST = 'USER_FETCH_REQUEST'
export const USER_FETCH_SUCCESS = 'USER_FETCH_SUCCESS'
export const USER_FETCH_FAILED = 'USER_FETCH_FAILED'
export const USER_UPDATE_REQUEST = 'USER_UPDATE_REQUEST'
export const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS'
export const USER_UPDATE_FAILED = 'USER_UPDATE_FAILED'
export const USER_INITIAL_STATE = 'USER_INITIAL_STATE'
export const INTRO_LIST_GET_REQUEST = 'INTRO_LIST_GET_REQUEST'
export const INTRO_LIST_GET_SUCCESS = 'INTRO_LIST_GET_SUCCESS'
export const INTRO_LIST_GET_FAILED = 'INTRO_LIST_GET_FAILED'
export const INTRO_CREATE_REQUEST = 'INTRO_CREATE_REQUEST'
export const INTRO_CREATE_SUCCESS = 'INTRO_CREATE_SUCCESS'
export const INTRO_CREATE_FAILED = 'INTRO_CREATE_FAILED'
export const INTRO_REJECT_REQUEST = 'INTRO_REJECT_REQUEST'
export const INTRO_REJECT_SUCCESS = 'INTRO_REJECT_SUCCESS'
export const INTRO_REJECT_FAILED = 'INTRO_REJECT_FAILED'
export const INTRO_ACCEPT_REQUEST = 'INTRO_ACCEPT_REQUEST'
export const INTRO_ACCEPT_SUCCESS = 'INTRO_ACCEPT_SUCCESS'
export const INTRO_ACCEPT_FAILED = 'INTRO_ACCEPT_FAILED'
export const INTRO_PUBLISH_REQUEST = 'INTRO_PUBLISH_REQUEST'
export const INTRO_PUBLISH_SUCCESS = 'INTRO_PUBLISH_SUCCESS'
export const INTRO_PUBLISH_FAILED = 'INTRO_PUBLISH_FAILED'
export const INTRO_CANCEL_REQUEST = 'INTRO_CANCEL_REQUEST'
export const INTRO_CANCEL_SUCCESS = 'INTRO_CANCEL_SUCCESS'
export const INTRO_CANCEL_FAILED = 'INTRO_CANCEL_FAILED'
export const INTRO_CONFIRM_REQUEST = 'INTRO_CONFIRM_REQUEST'
export const INTRO_CONFIRM_SUCCESS = 'INTRO_CONFIRM_SUCCESS'
export const INTRO_CONFIRM_FAILED = 'INTRO_CONFIRM_FAILED'
export const INTRO_DELAY_REQUEST = 'INTRO_DELAY_REQUEST'
export const INTRO_DELAY_SUCCESS = 'INTRO_DELAY_SUCCESS'
export const INTRO_DELAY_FAILED = 'INTRO_DELAY_FAILED'
export const INTRO_CLEAR_MESSAGES = 'INTRO_CLEAR_MESSAGES'
export const INTRO_DASHBOARD_GET_SUCCESS = 'INTRO_DASHBOARD_GET_SUCCESS'
export const INTRO_DASHBOARD_GET_REQUEST = 'INTRO_DASHBOARD_GET_REQUEST'
export const INTRO_DASHBOARD_GET_FAILED = 'INTRO_DASHBOARD_GET_FAILED'
export const INTRO_SET_LIST_NAME = 'INTRO_SET_LIST_NAME'
export const INSERT_INTRO_MESSAGE = 'INSERT_INTRO_MESSAGE'
export const CONTACT_REQUEST = 'CONTACT_REQUEST'
export const CLEAR_LOADED_CONTACT = 'CLEAR_LOADED_CONTACT'
export const CONTACT_REQUEST_FULL_FETCH = 'CONTACT_REQUEST_FULL_FETCH'
export const CONTACTS_REQUEST = 'CONTACTS_REQUEST'
export const CONTACT_RECEIVE = 'CONTACT_RECEIVE'
export const FETCH_CONTACTS_SUCCESS = 'FETCH_CONTACTS_SUCCESS'
export const UPADTE_LOADED_CONTACT = 'UPADTE_LOADED_CONTACT'
export const CONTACTS_ERROR = 'CONTACTS_ERROR'
export const CONTACTS_CLEAR_MESSAGES = 'CONTACTS_CLEAR_MESSAGES'
export const CONTACTS_PAGINATE_FETCH_MORE_RECEIVE =
  'CONTACTS_PAGINATE_FETCH_MORE_RECEIVE'
export const CONTACT_PAGINATE_FETCH_MORE_REQUEST =
  'CONTACT_PAGINATE_FETCH_MORE_REQUEST'
export const CONTACTS_PAGINATE_RECEIVE = 'CONTACTS_PAGINATE_RECEIVE'
export const CONTACTS_PAGINATE_REQUEST = 'CONTACTS_PAGINATE_REQUEST'
export const SIDE_MENU_TOGGLE = 'SIDE_MENU_TOGGLE'
export const SIDE_MENU_SET = 'SIDE_MENU_SET'
export const COUNT_OVERVIEW_FETCHING = 'COUNT_OVERVIEW_FETCHING'
export const COUNT_OVERVIEW_SUCCESS = 'COUNT_OVERVIEW_SUCCESS'
export const COUNT_OVERVIEW_FAILED = 'COUNT_OVERVIEW_FAILED'
export const COUNT_INTROS_FETCHING = 'COUNT_INTROS_FETCHING'
export const COUNT_INTROS_SUCCESS = 'COUNT_INTROS_SUCCESS'
export const COUNT_INTROS_FAILED = 'COUNT_INTROS_FAILED'
export const COUNT_INITIAL_STATE = 'COUNT_INITIAL_STATE'
export const INTRODUCTION_CANCEL_BY_OWNER_REQUEST =
  'INTRODUCTION_CANCEL_BY_OWNER_REQUEST'
export const FETCH_INTRODUCTIONS_SUCCESS = 'FETCH_INTRODUCTIONS_SUCCESS'
export const FETCH_INTRODUCTION_SUCCESS = 'FETCH_INTRODUCTION_SUCCESS'
export const UPDATE_INTRODUCTION_SUCCESS = 'UPDATE_INTRODUCTION_SUCCESS'
export const RATE_INTRODUCTION_SUCCESS = 'RATE_INTRODUCTION_SUCCESS'
export const RESET_INTRODUCTION = 'RESET_INTRODUCTION'
export const OPT_IN_INTRO_RESENT = 'OPT_IN_INTRO_RESENT'
export const INTRO_UPDATE_REQUEST = 'INTRO_UPDATE_REQUEST'
export const INTRO_UPDATE_SUCCESS = 'INTRO_UPDATE_SUCCESS'
export const INTRO_UPDATE_FAILED = 'INTRO_UPDATE_FAILED'

export const ACTIVITY_SUCCESS = 'ACTIVITY_SUCCESS'
export const ACTIVITY_FAILED = 'ACTIVITY_FAILED'
export const ACTIVITY_FETCHING = 'ACTIVITY_FETCHING'
export const CONTACT_SYNC_SUCCESS = 'CONTACT_SYNC_SUCCESS'

export const NAVIGATE = 'NAVIGATE'
