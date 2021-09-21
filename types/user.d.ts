export interface User {
  id: string;
  name: string;
  image: string;
  postCount: string;
}

export interface LoginUser {
  uid: string;
  name: string;
  allowed: boolean;
  isLoggedIn: boolean;
}
