import axios from 'axios'

const service = axios.create({
  baseURL: 'http://127.0.0.1:5000', // url = base url + request url
  timeout: 5000 // request timeout
})

export function getBookDetail(book_id) {
  return service.request({
    url: `/book/${book_id}/detail`,
    method: 'get'
  })
}

export function getUserBooks(user_id) {
  return service.request({
    url: `/user/${user_id}/rated_books`,
    method: 'get'
  })
}
