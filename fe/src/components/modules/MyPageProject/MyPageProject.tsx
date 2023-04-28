import minchoImg from 'assets/testImg/mincho.jpg';

/**
 * 
 * 프로젝트 이미지와 제목을 prop으로 전달해주면 이를 이용 
 */
const MyPageProject = () => {
  const mainTitle = '테스트 타이틀';
  const subTitle = '서브 타이틀'
  return (
    <div className='project_box'>
      <img src={minchoImg} alt=''></img>
      <div className='project_title_area'>
        {`${mainTitle} - ${subTitle}`}
      </div>
    </div>
  )
}

export default MyPageProject