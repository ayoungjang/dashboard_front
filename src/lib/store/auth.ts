import { writable } from 'svelte/store';

export const token = ""

export function getToken() {
  return localStorage.getItem("token");
}
export function setToken(newToken: string) {
  localStorage.setItem('token', newToken);
  // token.set(newToken);
}

export function clearToken() {
  localStorage.clear();
}
