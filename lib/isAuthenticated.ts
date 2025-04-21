import Cookies from "js-cookie";

export const isAuthenticated = Cookies.get("token") ? true : false;
