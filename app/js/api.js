export const getImg = url =>
  fetch(url, {
    credentials: 'same-origin',
  });

/**
 * Handle http result.
 * The Promise returned from fetch() won’t reject on HTTP error status
 * even if the response is an HTTP 404 or 500.
 * Instead, it will resolve normally (with ok status set to false),
 * and it will only reject on network failure
 * or if anything prevented the request from completing.
 * https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 *
 * However in practice, we want to be notified of http error status
 * and react to them. This function rejects the promise if an
 * http error occurred or resolves the promise when a successful
 * response was returned
 *
 * @param response the response promise
 * @return {*} returns json response in case of a successful response
 * ,           and json error in case of a failure
 */
const handleResult = response => {
  return response.json().then(json => {
    if (response.ok) {
      return json;
    }
    return Promise.reject(json);
  });
};

export const getData = url =>
  fetch(url, {
    credentials: 'same-origin',
  }).then(handleResult);

export const postData = (url, data) =>
  fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json',
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // *client, no-referrer
  }).then(handleResult); // parses response to JSON

export const deleteData = url =>
  fetch(url, {
    credentials: 'same-origin',
    method: 'DELETE',
  }).then(handleResult);
