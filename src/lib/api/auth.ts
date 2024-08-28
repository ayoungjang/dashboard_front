import { getApi, postApi } from "$lib/api/api";
import { goto } from '$app/navigation';
import { setToken } from "$lib/store/auth";
// import { setToken } from '$lib/store/auth';

export const register = async (id: string, pw: string, name: string) => {

  try {
    const options = {
      path: '/auth/register',
      data: {
        id: id,
        pw: pw,
        name: name
      }
    }

    await postApi(options)
    alert('registered!')

  }
  catch (error) {
    alert('Error')
  }
}


export async function login(id: string, pw: string) {
  try {
    const options = {
      path: '/auth/login',
      data: {
        id: id,
        pw: pw
      }
    };

    const response = await postApi(options);

    if (response.access_token) {
      setToken(response.access_token)
      goto('/');  // go home
    } else {
      throw new Error('No token in response');
    }
  } catch (error) {
    alert('error');
    console.error('Login error:', error);
  }
}


export async function tokenLogin() {
  const savedToken = localStorage.getItem('token');

  if (savedToken == null || "") {
    goto('/login');  // go home
    return;
  }

  try {
    const options = {
      path: '/api/user/token',
      access_token: savedToken
    };

    const response = await getApi(options);

    if (response.access_token) {
      setToken(response.access_token)
      goto('/');  // go home
    } else {
      throw new Error('No token in response');
    }
  } catch (error) {
    alert('error');
    console.error('Login error:', error);
  }
}

