import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import Header from "../components/Header";

import { useState, useContext } from "react";
import { DiaryStateContext } from "../App";
import usePageTitle from "../hooks/usePageTitle";

// ✨로직이 복잡하고 해당함수가 매개변수만으로도 필요한 데이터를 다 제공받을 수 있으며 불필요한 함수의 재생성을 방지하기 위해 컴포넌트 외부에 함수 선언
const getMonthlyData = (pivotDate, data) => {

  const beginTime = new Date( // 📌해당하는 달의 가장 시작 시간이 담겨있음
    pivotDate.getFullYear(),
    pivotDate.getMonth(),
    1,
    0,
    0,
    0
  ).getTime();   // 해당하는 달의 시작인 1일 0시 0분 0초

  const endTime = new Date(   // 📌해당하는 달의 가장 마지막 시간이 담겨있음
    pivotDate.getFullYear(),
    pivotDate.getMonth() + 1,
    0,  // pivotDate.getMonth() + 1, 0 을 하면 이전 달의 마직막 날을 뜻함.
    23,
    59,
    59  // 23시 59분 59초
  ).getTime();

  return data.filter((item) =>    // 해당 달의 일기 데이터만 추출하도록
    beginTime <= item.createdDate && item.createdDate <= endTime
  );
};

const Home = () => {
  const data = useContext(DiaryStateContext);   // useContext를 통해 DiaryStateContext로부터 diary data를 공급받음.
  const [pivotDate, setPivotDate] = useState(new Date());
  usePageTitle("MY 다이어리")

  const monthlyData = getMonthlyData(pivotDate, data);

  const onIncreaseMonth = () => { 
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1))
  };
  const onDecreaseMonth = () => { 
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1))
  };

  return (
    <div>
      <Header
        title={`${pivotDate.getFullYear()}년 
        ${pivotDate.getMonth() + 1}월`}

        leftChild={<Button onClick={onDecreaseMonth} text={"<"} />}
        rightChild={<Button onClick={onIncreaseMonth} text={">"} />}
      />
      <DiaryList data={monthlyData} />
    </div>
  )
};

export default Home;