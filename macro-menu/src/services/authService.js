import http from "./httpService";
import config from "../config.json";
import jwtDecode from "jwt-decode";
const authApiEndpoint=config.backEndHtmlRoot+"auth";
const tokenKey="token";
let response;
export async function login(email, password){
    response = await http.post(authApiEndpoint,{email,password});
    const token = response.headers["x-auth-token"];
    localStorage.setItem(tokenKey,token);
    return token;
}
export function loginWithJwt(jwt){
    localStorage.setItem(tokenKey,jwt);
}
export function logout(){
    localStorage.removeItem(tokenKey);
}
export function getCurrentUser(){
    try {
        const jwt=localStorage.getItem(tokenKey);
        const currentGRFUserCont=jwtDecode(jwt);
        return currentGRFUserCont.currentGRFUser;
    } catch (ex) {
        return null;
    }
}
export function getJwt(){
    return localStorage.getItem(tokenKey);
}
export default {
    login,loginWithJwt,logout,getCurrentUser,getJwt
};