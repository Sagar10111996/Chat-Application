const APIConstant = {
  CONTENT_TYPE: 'application/json',
}

const PathPram = {
  PATH_PARAM_USER_ID: '{user_id}'
}

const Constants = {
  STORAGE_ITEM_ACCESS_TOKEN: 'accessToken',
  STORAGE_ITEM_REFRESH_TOKEN: 'refreshToken',
  STORAGE_ITEM_USER_ROLE: ''
}

const Request = {
  LOGIN_USER: '/auth/login',
  REGISTER_USER: '/auth/register',
  REFRESH_TOKEN: '/auth/login/refresh',
}

export {
  APIConstant,
  PathPram,
  Request,
  Constants,
}