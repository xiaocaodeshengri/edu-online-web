import Cookies from 'js-cookie'

const TokenKey = 'admin_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

const UserIdKey = 'admin_id'

export function getUserId() {
  return Cookies.get(UserIdKey)
}

export function setUserId(userId) {
  return Cookies.set(UserIdKey, userId)
}

export function removeUserId() {
  return Cookies.remove(UserIdKey)
}

var storage = window.localStorage
export function getMenu() {
  return storage.getItem('permissionMenu')
}

export function setMenu(menu) {
  storage.setItem('permissionMenu', menu)
  // storage. = menu
}

export function removeMenu() {
  storage.removeItem('permissionMenu')
}
