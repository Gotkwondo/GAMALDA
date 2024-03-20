import { resizingImg } from 'utils/imageManage';
import { toast } from 'react-toastify';

interface interfaceChangedUserImg {
  e: React.ChangeEvent<HTMLInputElement>,
  setNewUserImgObj: React.Dispatch<React.SetStateAction<{
    file: File | null;
    fileName: string;
  }>>
}

export const setChangedUserImg = async ({ e, setNewUserImgObj }: interfaceChangedUserImg) => {
    if (e.target.files) {
      const resizedImg = await resizingImg(e.target.files[0], 3, 130);
      if (resizedImg.state === 'instance error' || resizedImg.state === 'fileType error') {
        return toast.error('올바르지 않은 파일 형식입니다');
      }
      return setNewUserImgObj(resizedImg);
    }
  }