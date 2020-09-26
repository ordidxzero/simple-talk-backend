// Global
const GLOBAL = '/';
const REGISTER = 'register';
const LOGIN = 'login';
const LOGOUT = 'logout';

// User
const USER = '/user';
const FIND = '/find';
const LOAD_FRIENDS = '/friends';
const ADD_FRIEND = (id?: string): string => (id ? `/add/${id}` : `/add/:id`);
const REMOVE_FRIEND = (id?: string): string => (id ? `/remove/${id}` : `/remove/:id`);

const routes = {
  global: GLOBAL,
  register: REGISTER,
  login: LOGIN,
  logout: LOGOUT,
  user: USER,
  loadFriends: LOAD_FRIENDS,
  find: FIND,
  addFriend: ADD_FRIEND,
  removeFriend: REMOVE_FRIEND,
};

export default routes;
