import { ReactComponent as UploadSvg } from 'assets/svg/upload.svg';
import { ReactComponent as UserIcon } from 'assets/svg/user.svg';
import { useSelector } from 'react-redux';
import { RootState } from 'modules/index';
import { useState } from 'react';
import { resizingImg } from 'utils/accountManage';
import { toast } from 'react-toastify';

const AccountManage = () => {
  const userInfo = useSelector((state: RootState) => state.userInfo);

  const [userName, setUserName] = useState('');
  const [userImg, setUserImg] = useState('');

  ///////////////// 추후 모듈화 작업 진행 예정
  // 유저 이미지 업로드시 미리보기를 위해 FileReader API를 사용(base64로 인코딩)
  // 추가 정보 링크: https://slaks1005.tistory.com/64
  const uploadUserImgToChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      let resizedImg = await resizingImg(e.target.files[0], 3, 130);
      console.log(resizedImg);
      if (resizedImg === 'instance error') {
        return;
      }
      else if (resizedImg === 'fileType error') {
        // 여기에서는 toast로 파일 형식을 제대로 지정해달라는 문구 전달.
        toast.error('옳바른 파일 형식을 선택해주십시오.');
      } else {
        setUserImg(`${resizedImg}`);
      }
    }
  }

  // 이미지(base64로 인코딩된 URL)을formData 형식으로 서버로 파일,
  // 
  // 이것도 모듈화 할 수 있음 하자
  const uploadChangedInfo = () => {
    console.log('ddddd')
  }
  ///////////////// 추후 모듈화 작업 진행 예정
  
  return (
    <div className="box_area flex_center manage_box">
      <div className="contents_area">
        <div className="user_info_area">
          <div className="user_img flex_center">
            {userInfo.profileImgUrl === process.env.REACT_APP_NAVER_DEFAULT_IMG ? <UserIcon /> : <img src={userInfo.profileImgUrl} />}
          </div>
          <div className="title_area">
            <p className="title_text">계정 설정</p>
            <p className="username_text">{userInfo.nickName}</p>
          </div>
        </div>
        <div className="manage_user_name_area flex_center">
          <p className="manage_user_text">유저 이름</p>
          <input
            className="manage_user_name_input"
            type="text"
            placeholder={userInfo.nickName}
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
          />
        </div>
        <div className="manage_user_img_area flex_center">
          <p className="manage_user_text">유저 이미지</p>
          <div className="manage_user_imgbox">
            {/*여기에 이미지 생성*/}
            <div className='img_area'>
              {userImg ? <img className='user_img' src={userImg} alt='userImg' /> : <UserIcon />}
            </div>
            <label htmlFor="mu_img_up">
              <div className="btn btn_imgupload">
                <UploadSvg />
                <p>업로드</p>
              </div>
            </label>
            <input
              id="mu_img_up"
              type="file"
              accept="image/jpg, image/png, image/jpeg"
              className="upload_img"
              onChange={(e) => uploadUserImgToChange(e)}
            />
          </div>
        </div>
        <div className='btn btn_complete' onClick={() => uploadChangedInfo()}>완료</div>
      </div>
    </div>
  )
}

export default AccountManage;