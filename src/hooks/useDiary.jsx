import { useContext, useState, useEffect } from "react";
import { DiaryStateContext } from "../App";
import { useNavigate } from "react-router-dom";

const useDiary = (id) => {    // 커스텀 훅(URL 파라미터를 통해서 하나의 일기 데이터를 context로부터 꺼내오는 작업을 하는)
  const data = useContext(DiaryStateContext);
  const [curDiaryItem, setCurDiaryItem] = useState();

  const nav = useNavigate();

  useEffect(() => {
    const currentDiaryItem = data.find(   // 수정하고자 하는 일기 데이터를 가져옴.
      (item) => String(item.id) === String(id)
    );

    if (!currentDiaryItem) {
      window.alert("⚠존재하지 않는 일기입니다.")
      nav("/", { replace: true });
    };

    setCurDiaryItem(currentDiaryItem);
  }, [id]);
  
  return curDiaryItem;
};

export default useDiary;