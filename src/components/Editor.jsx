import Button from "./Button";
import "./Editor.css";
import WeatherItem from "./WeatherItem";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const weatherList = [
  {
    weatherId: 1,
    weatherName: "맑음"
  },
  {
    weatherId: 2,
    weatherName: "흐림"
  },
  {
    weatherId: 3,
    weatherName: "흐려져 비"
  },
  {
    weatherId: 4,
    weatherName: "비"
  },
  {
    weatherId: 5,
    weatherName: "눈"
  },
]

const getStringedDate = (targetDate) => {   // 날짜 객체를 문자열 형태로 변환해줌
  // 날짜 -> YYYY-MM-DD
  let year = targetDate.getFullYear();
  let month = targetDate.getMonth() + 1;
  let date = targetDate.getDate();

  if (month < 10) {   // 10 미만의 월은 두자리 수가 되지 않으므로 템플릿 리터럴로 두자리 수로 바꿔줌.
    month = `0${month}`;
  }
  if (date < 10) {
    date = `0${date}`;
  }

  return `${year}-${month}-${date}`;
}

const Editor = ({initData, onSubmit}) => {
  const [input, setInput] = useState({    // 사용자의 입력을 input state에 저장
    createdDate: new Date(),
    weatherId: 3,
    content: "",
  });

  const nav = useNavigate();

  useEffect(() => {
    if (initData) {
      setInput({
        ...initData,
        createdDate: new Date(Number(initData.createdDate)),
      });
    }
  }, [initData]);

  const onChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "createdDate") {
      value = new Date(value);    // 입력된 value 값은 문자열이므로 Date 객체로 변환해서 value 값 설정
    }

    setInput({
      ...input,   // 기존의 state 값은 유지시켜주면서
      [name]: value,  // 현재 입력이 발생한 요소만 수정
    });
  };

  const onSubmitButtonClick = () => {
    onSubmit(input);
  }

  return (
    <div className="Editor">
      <section className="date_section">
        <h4>오늘의 날짜</h4>
        <input
          name="createdDate"
          onChange={onChangeInput}
          value={getStringedDate(input.createdDate)}
          type="date"
        />
      </section>
      <section className="weather_section">
        <h4>오늘의 날씨</h4>
        <div className="weather_list_wrapper">
          {weatherList.map((item) => (
            <WeatherItem
              onClick={() => onChangeInput({
                  target: {
                    name: "weatherId",
                    value: item.weatherId,
                  },
                })
              }
              key={item.weatherId}
              {...item}
              isSelected={item.weatherId === input.weatherId} />
          ))}
        </div>
      </section>
      <section className="content_section">
        <h4>오늘의 일기</h4>
        <textarea
          name="content"
          value={input.content}
          onChange={onChangeInput}
          placeholder="오늘은 어땠나요?"
        />
      </section>
      <section className="button_section">
        <Button onClick={() => nav(-1)} text={"취소하기"} />
        <Button
          onClick={onSubmitButtonClick}
          text={"작성완료"}
          type={"POSITIVE"}
        />
      </section>
    </div>
  )
};

export default Editor;