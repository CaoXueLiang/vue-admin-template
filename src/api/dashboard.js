import {
  getWithJson,
  postWithJson,
  requestWithForm,
  requestFileForm
} from '../utils/requestHelper';

export function getFileList(data) {
  return getWithJson(
    '/workConstructionWord/queryWorkConstructionWordFiles',
    data
  );
}

export function getCameraPhotos(data) {
  return postWithJson(
    '/workConstructionWord/searchPageAreaOperationPhotoInfo',
    data
  );
}

export function getMonitorsData(data) {
  return requestWithForm('/unicom/project/cascadeNew', data);
}

export function uploadImage(data) {
  return requestFileForm('/unicom/question/questionUploadFile', data);
}
