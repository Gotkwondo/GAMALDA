import { updateUserImgApi, updateUserNameApi } from 'api/accountManage/api';
import { deleteImgApi, uploadImgAPI } from 'api/imgServer/api';
import { toast } from 'react-toastify';
import { formData } from 'utils/imageManage';

interface updateChagedInfoType {
  newUserName: string,
  newUserImgObj: {
    file: File | null;
    fileName: string;
  },
  userImgUrl: string,
  cookie?: any
}

/**
 * 유저 계정 정보 변경 db와 이미지 서버로 요청을 보내는 로직을 담당하는 함수
 * @param param {
  newUserName: string,
  newUserImgObj: {
    file: File | null;
    fileName: string;
  },
  userImgUrl: string,
  cookie?: any
}
 * @returns () => void
 */
export const updateChangedInfo = async ({ newUserName, newUserImgObj, userImgUrl, cookie }: updateChagedInfoType) => {
  // 아무것도 변경할 것이 없을 때
  if (newUserName === '' && newUserImgObj.file === null) {
    return;
  }

  // 이름 유효성 검사
  if (newUserName.match(/[~!@#$%";'^,&*()_+|</>=>`?:{[\}]/g) || newUserName.match(/\s/g)) {
    toast.error('이름에 특수기호 및 공백의 사용은 불가능 합니다');
    return;
  }

  // 업데이트할 이미지가 있는 경우
  if (newUserImgObj.file) {
    const userImgFormData = await formData(newUserImgObj.file);
    const imgFileName = userImgUrl.split('/')[4];

    if (!userImgFormData) {
      toast.error('이미지 작업 도중 오류가 발생했습니다. 다시 시도해주세요.');
      return;
    }

    // 유저 이미지가 기본이거나 없는 경우
    if (!(userImgUrl === '' || userImgUrl === process.env.REACT_APP_NAVER_DEFAULT_IMG)) {
      const isPastImgDelete = await deleteImgApi(imgFileName);
      if (isPastImgDelete.state === "error") {
        toast.error('이미지 작업 도중 오류가 발생했습니다. 다시 시도해주세요.');
        return;
      }
    }

    // 이미지 서버로 업로드 한 이미지 주소
    const imgUploadRes = await uploadImgAPI(userImgFormData);
    // 유저 db에 이미지 데이터를 업데이트한 결과
    const updateUserImgResult = await updateUserImgApi(cookie.accessToken, imgUploadRes.imageUrl);
    // 이미지만 업데이트할 때
    if (newUserName === '') {
      updateUserImgResult ? toast.success('이미지 변경에 성공했습니다. 새로고침 후 확인해주세요') : toast.error('이미지 업데이트에 오류가 발생했습니다. 잠시후 다시 시도해주세요.');
      return;
    }
    //  이름과 이미지를 같이 업데이트할 때
    if (newUserName) {
      const updateUserNameResult = await updateUserNameApi(cookie.accessToken, newUserName);
      updateUserImgResult && updateUserNameResult ? toast.success('계정 정보 변경에 성공했습니다. 새로고침 후 확인해주세요') : toast.error('계정 정보 변경에 실패했습니다. 양식을 확인해주세요');
      return;
    }
  }
  // 이름만 업데이트할 때
  if (newUserName && newUserImgObj.fileName === '') {
    const updateUserNameResult = await updateUserNameApi(cookie.accessToken, newUserName);
    updateUserNameResult ? toast.success('계정 정보 변경에 성공했습니다. 새로고침 후 확인해주세요') : toast.error('계정 정보 변경에 실패했습니다. 양식을 확인해주세요');
    return;
  }
};