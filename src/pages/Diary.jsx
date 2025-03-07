import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Viewer from "../components/Viewer";
import { useNavigate } from "react-router-dom";
import useDiary from "../hooks/useDiary";
import { getStringedDate } from "../util/get-stringed-date";

const Diary = () => {
  const params = useParams();
  const nav = useNavigate();

  const curDiaryItem = useDiary(params.id);   // 해당 일기 데이터를 가져옴
  
  // useDiary 함수가 반환하는 값이 undefined 일때를 대비
  if (!curDiaryItem) {
    return <div>데이터 로딩중...!</div>
  }

  const { createdDate, weatherId, content } = curDiaryItem;   // 구조분해할당
  const title = getStringedDate(new Date(createdDate));

  return (
    <div>
      <Header
        title={`${title} 기록`}
        leftChild={
          <Button
            text={"< 뒤로 가기"}
            onClick={() => { nav(-1) }}
          />}
        rightChild={
          <Button
            text={"수정하기"}
            onClick={() => {nav(`/edit/${params.id}`)}}
          />}
      />
      <Viewer weatherId={weatherId} content={content} />
    </div>
  )
};

export default Diary;