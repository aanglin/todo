import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';

export function getUserId() {
  let userId = Cookies.get('userId');

  if (!userId) {
    userId = uuidv4();
    Cookies.set('userId', userId, { expires: 365 });
  }

  return userId;
}
