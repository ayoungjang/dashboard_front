import axios from "axios";
import { SERVER } from "$lib/value";
import { goto } from '$app/navigation';

const send = async ({ method = '', path = '', data = {}, access_token = '' } = {}) => {
  const commonUrl = SERVER
  const url = commonUrl + path

  const headers = {
    "Access-Control-Allow-Origin": commonUrl,
    "Access-Control-Allow-Credentials": true,
    "Content-Type": "application/json",
    "accept": "application/json,",
    "SameSite": "None",
    "Authorization": `Bearer ${access_token}`,
  }

  const options = {
    method,
    url,
    headers,
    data,
    withCredentials: true,
  }

  try {
    const response = await axios(options);
    return response.data
  }
  catch (error) {
    goto('/login');  // go home
    throw error
  }
}

const getApi = ({ path = '', access_token = '' } = {}) => {
  
  return send({ method: 'GET', path, access_token })
}

const putApi = ({ path = '', data = {}, access_token = '' } = {}) => {
  return send({ method: 'PUT', path, data, access_token })
}

const postApi = ({ path = '', data = {}, access_token = '' } = {}) => {
  return send({ method: 'POST', path, data, access_token })
}

const delApi = ({ path = '', data = {}, access_token = '' } = {}) => {
  return send({ method: 'DELETE', path, data, access_token })
}
//TODO Err 400, 500, 404,403, 401

export {
  getApi,
  putApi,
  postApi,
  delApi,
}