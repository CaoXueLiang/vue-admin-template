import requestHelper from '../utils/requestHelper';

export function getOrginationRequest(data) {
  return requestHelper.requestWithForm({
    url: '/unicom/teamGroup/queryCompanyList',
    data: {
      projectId: 1
    }
  });
}

export function getMointorInfo(paragram) {
  return requestHelper.getWithJson({
    url: '/queryCameraPtzInfo',
    data: {
      cameraId: 2
    }
  });
}
