const HEADER = {
  method: 'GET', // *GET, POST, PUT, DELETE, etc.
  mode: 'cors', // no-cors, *cors, same-origin
  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  credentials: 'same-origin', // include, *same-origin, omit
  headers: {
    'Content-Type': 'application/json'
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
  redirect: 'follow', // manual, *follow, error
  referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  body: null // body data type must match "Content-Type" header
} // referenced from https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

export const doGet = (url, params) => {
//   const header = new Headers()
  console.log(params)
  const newUrl = new URL(url)
  for (const [item, value] of Object.entries(params)) {
    newUrl.searchParams.append(item, value)
  }

  console.log(newUrl)
//   return fetch(url, header)
}

export const doPost = (url, params) => {
  const header = HEADER
  header.method = 'POST'
  header.body = JSON.stringify(params)
  const newUrl = new URL(url)
  return fetch(newUrl, header)
}
