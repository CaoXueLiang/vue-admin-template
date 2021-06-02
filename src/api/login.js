import { requestWithForm } from '../utils/requestHelper'

export function loginManage(data) {
  return requestWithForm('/login', data)
}
