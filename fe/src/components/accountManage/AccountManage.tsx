import { ReactComponent as UploadSvg } from 'assets/svg/upload.svg';
import { ReactComponent as UserIcon } from 'assets/svg/user.svg';
import { useSelector } from 'react-redux';
import { RootState } from 'modules/index';
import { useState } from 'react';import { useCookies } from 'react-cookie';import { setChangedUserImg } from 'hooks/AccountMangae/setChangedUserImg';
import { updateChangedInfo } from 'hooks/AccountMangae/useUpdateChangedInfo';

const AccountManage = () => {
  const [profileImgUrl, nickName, userEmail] = useSelector((state: RootState) => [state.userInfo.profileImgUrl, state.userInfo.nickName, state.userInfo.userEmail]);
  const [cookies] = useCookies(['accessToken']);
  const [newUserName, setNewUserName] = useState('');
  const [newUserImgObj, setNewUserImgObj] = useState<{ file: File | null, fileName: string }>({ file: null, fileName: '' });

  return (
    <div className="box_area flex_center manage_box">
      <div className="contents_area">
        <div className="user_info_area">
          <div className="user_img flex_center">
            {profileImgUrl === process.env.REACT_APP_NAVER_DEFAULT_IMG || profileImgUrl === '' ? <UserIcon /> : <img src={profileImgUrl} alt='changedImg'/>}
          </div>
          <div className="title_area">
            <p className="title_text">계정 설정</p>
            <p className="username_text">{nickName}</p>
            <p className="useremail_text">{userEmail}</p>
          </div>
        </div>
        <div className="manage_user_name_area flex_center">
          <p className="manage_user_text">유저 이름</p>
          <input
            className="manage_user_name_input"
            type="text"
            placeholder={nickName}
            onChange={(e) => setNewUserName(e.target.value)}
            value={newUserName}
          />
        </div>
        <div className="manage_user_img_area flex_center">
          <div className="manage_user_text_area">
            <p className="manage_user_text">유저 이미지</p>
            <p className="warning_text_grey">이미지를 업로드하는 도중 화질이 낮아질 수 있습니다.</p>
          </div>
          
          <div className="manage_user_imgbox">
            <div className='img_area'>
              {
                newUserImgObj.fileName ? <img className='user_img' src={newUserImgObj.fileName} alt='userImg' />
                  : (profileImgUrl ? <img src={profileImgUrl} alt='changedImg' />
                    : <UserIcon />
                  )
              }
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
              onChange={(e) => setChangedUserImg({e: e, setNewUserImgObj: setNewUserImgObj})}
            />
          </div>
        </div>
        <div className='btn btn_complete' onClick={() => updateChangedInfo({newUserName: newUserName, newUserImgObj: newUserImgObj, userImgUrl: profileImgUrl, cookie: cookies})}>완료</div>
      </div>
    </div>
  )
};

export default AccountManage;