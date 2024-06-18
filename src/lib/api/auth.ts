import { SERVER } from "$lib/value";
import { postApi } from "./api.ts";
import { goto } from '$app/navigation';
import { setToken } from "$lib/store/auth.js";
// import { setToken } from '$lib/store/auth';

export const register = async (id: string, pw: string, name: string) => {
  
  try {
    const options = {
      path: '/auth/register',
      data: {
        id:id,
        pw: pw,
        name:name
      }
    }

    await postApi(options)
    alert('registered!')
    
  }
  catch(error) {
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
      goto('/');  // 홈 화면으로 이동
    } else {
      throw new Error('No token in response');
    }
  } catch (error) {
    alert('오류가 발생했습니다. 다시 시도해 주세요.');
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

  //   return res; // 서버 응답을 반환합니다.
  // } catch (e) {
  //   console.error('Error during login:', e);
  //   throw e; // 오류를 호출자에게 전달합니다.
  // }
}

