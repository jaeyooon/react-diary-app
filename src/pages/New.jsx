import Button from "../components/Button";
import Editor from "../components/Editor";
import Header from "../components/Header";

import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";

const New = () => {
  const { onCreate } = useContext(DiaryDispatchContext);
  const nav = useNavigate();

  const onSubmit = (input) => {
    onCreate(
      input.createdDate.getTime(),    // 타임스탬프 형식으로 저장하도록 변경
      input.weatherId,
      input.content
    );
    nav('/', {replace: true})   // 작성완료 후 홈페이지로 이동하고 뒤로가기 방지되도록 함
  }

  return (
    <div>
      <Header title={"새 일기 쓰기"}
        leftChild={<Button text={"< 뒤로 가기"} onClick={() => nav(-1)}/>}
      />
      <Editor onSubmit={onSubmit} />
    </div>
  )
};

export default New;