import axios from 'axios'

export function get (url, payload) {
    return axios({
        method: 'GET',
        url: url,
        params: payload,
    })
}

export function post (url, payload = {}, headers = {}) {
    return axios({
        method: 'POST',
        headers: headers,
        url: url,
        data: payload,
    })
}

export function put (url, payload = {}, headers = {}) {
    return axios({
        method: 'PUT',
        headers: headers,
        url: url,
        data: payload,
    })
}

export function download (url, payload = {}, headers = {}) {
    return axios({
        headers: headers,
        method: 'POST',
        responseType: 'blob',
        url: url,
        data: payload,
    })
}

export function destroy(url, payload = {}, headers = {}) {
    return axios({
        headers: headers,
        method: 'DELETE',
        responseType: 'blob',
        url: url,
        data: payload,
    })
}