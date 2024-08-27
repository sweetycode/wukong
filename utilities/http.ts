import { getCsrfToken } from "./dom"

async function doRequest(uri, {method, body}: {method?: 'POST'|'PUT', body?: object} = {}) {
    return fetch(uri, {
        method: method == null? 'GET': method,
        body: body == null? undefined: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": getCsrfToken(),
        }
    }).then(resp => resp.json())
}


export async function httpGet(uri) {
    return doRequest(uri)
}


export async function httpPut(uri, json) {
    return doRequest(uri, {method: 'PUT', body: json})
}

export async function httpPost(uri, json) {
    return doRequest(uri, {method: 'POST', body: json})
}