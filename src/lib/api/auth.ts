import { postApi } from "$lib/api/api";
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


export async function tokenLogin(id: string, pw: string) {
  // try {
  //   const response = await axios.post(`${SERVER}/user/token`, {
  //     headers: {
  //       Authorization:`Bearer ${token}`
  //     }
  //   });

  //   const res = response.data;
  //   console.log(res);

  //   return res;
  // } catch (e) {
  //   console.error('Error during login:', e);
  //   throw e; 
  // }
}

