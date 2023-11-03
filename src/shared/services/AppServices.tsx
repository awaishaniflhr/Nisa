import {HTTP_CLIENT} from '../exporter';
import {endPoints} from '../utils/endpoint';

const getRecordRequest = (id: any, cat: any, obj: any) => {
  return HTTP_CLIENT.get(`${endPoints.getRecord}/${id}/${cat}`);
};
const complteRecord = (id: any) => {
  return HTTP_CLIENT.get(`${endPoints.compleRecord}/${id}`);
};
const addRecord = (obj: any) => {
  return HTTP_CLIENT.post(`${endPoints.addRecord}`, obj);
};
const updateAmount = (id: any, obj2: any) => {
  return HTTP_CLIENT.put(`${endPoints.updateAmount}/${id}`, obj2);
};

const categoriesList = (obj: any) => {
  return HTTP_CLIENT.get(endPoints.categoriesList);
};
const updateProfile = (obj: any) => {
  return HTTP_CLIENT.post(endPoints.updateProfile, obj);
};

export {
  getRecordRequest,
  addRecord,
  updateAmount,
  categoriesList,
  updateProfile,
  complteRecord,
};
