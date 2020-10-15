// Parameter Description
// id: user id
// room: room id

// Global
const GLOBAL = '/';
const REGISTER = 'register';
const LOGIN = 'login';
const LOGOUT = 'logout';
const CHECK = 'check';

// User
const USER = '/user';
const FIND = '/find';
const LOAD_FRIENDS = '/friends';
const LOAD_ROOMS = '/rooms';
const ADD_FRIEND = '/add/:id';
const ACCEPT_FRIEND = '/accept/:id';
const REMOVE_FRIEND = '/remove/:id';

// Chat
const CHAT = '/chat';
const START_CHAT = '/start/:id';
const LEAVE_CHAT = '/leave/:room';

const routes = {
  global: GLOBAL,
  register: REGISTER,
  login: LOGIN,
  logout: LOGOUT,
  check: CHECK,
  user: USER,
  loadFriends: LOAD_FRIENDS,
  loadRooms: LOAD_ROOMS,
  find: FIND,
  addFriend: ADD_FRIEND,
  acceptFriend: ACCEPT_FRIEND,
  removeFriend: REMOVE_FRIEND,
  chat: CHAT,
  startChat: START_CHAT,
  leaveChat: LEAVE_CHAT,
};

export default routes;
