import { urls } from '../../constants/urls';
import { doPost } from '../apiRequests';

export const registerAdmin = (params) => {
  return doPost(urls.register, params).then((res) => {
    return res.json();
  });
};
export const loginAdmin = (params) => {
  return doPost(urls.login, params).then((res) => {
    return res.json();
  });
};
