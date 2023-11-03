import {HTTP_CLIENT} from '../exporter';
import {endPoints} from '../utils/endpoint';
const loginService = (obj: any) => {
  return HTTP_CLIENT.post(endPoints.login, obj);
};
const signupService = (obj: any) => {
  return HTTP_CLIENT.post(endPoints.signUP, obj);
};
const AddAcount = (id: any, obj: any) => {
  return HTTP_CLIENT.post(`${endPoints.AddAcount}/${id}`, obj);
};
const getAmount = (id: any) => {
  return HTTP_CLIENT.get(`${endPoints.getAmont}/${id}`);
};

const forgotPaswordService = (obj: any) => {
  return HTTP_CLIENT.post(endPoints.forgot, obj);
};
const resetPaswordService = (obj: any) => {
  return HTTP_CLIENT.post(endPoints.restPassword, obj);
};

const socialLogin = (obj: any) => {
  return HTTP_CLIENT.post(endPoints.handleSocialLogin, obj);
};
// const updateAcount = (id: any, obj: any) => {
//   return HTTP_CLIENT.get(`${endPoints.getAmont}/${id}`);
// };
const updateProfile = (obj: any) => {
  return HTTP_CLIENT.post(endPoints.updateProfile, obj);
};

export {
  loginService,
  signupService,
  getAmount,
  forgotPaswordService,
  resetPaswordService,
  socialLogin,
  updateProfile,
  AddAcount,
};
