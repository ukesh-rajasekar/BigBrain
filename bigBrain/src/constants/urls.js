const SERVERPORT = 5005
const SERVER = `http://localhost:${SERVERPORT}`
export const urls = {
  login: `${SERVER}/admin/auth/login`,
  register: `${SERVER}/admin/auth/register`,
  create: `${SERVER}/admin/quiz/new`,
  allGames: `${SERVER}/admin/quiz`,
  gameByID: `${SERVER}/admin/quiz`,
  updateGame: `${SERVER}/admin/quiz`,
  gameSession: `${SERVER}/admin/quiz`,
  gameResults: `${SERVER}/admin/session`,
  // gameResults: `${SERVER}/admin/session`,

}
