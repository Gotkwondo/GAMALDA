import { postApi } from 'utils/httpApi';

/**
 * 계정 관리 페이지에서 유저가 닉네임 혹은 이미지를 변경할 경우
 * 변경된 데이터를 처리해주는 API
 * @param userName 
 */
export const uploadChangedUserInfoApi = async (
  userName: string,
  // userFile: File,
  accessToken: string,
) => {
  // console.log(userName);
  // const res = await fetch(`${process.env.REACT_APP_API_URL}/account_manage/update_changes`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     userName: userName,
  // //     userFile: userFile,
  //     accessToken: accessToken
  //   })
  // })
  // return res.json();
  return postApi('/account_manage/update_changes', {
    userName,
    accessToken
  })
};