import Button from "./Button";
import "./DiaryItem.css";
import { useNavigate } from "react-router-dom";
import { getWeatherImage } from "../util/get-weather-image";

const DiaryItem = ({id, weatherId, createdDate, content}) => {
  const nav = useNavigate();

  return (
    <div className="DiaryItem">
      <div
        onClick={() => nav(`/diary/${id}`)}   // 이미지 클릭시 해당 일기 상세 페이지로 이동
        className="img_section">
        <img src={getWeatherImage(weatherId)} />
      </div>
      <div
        onClick={() => nav(`/diary/${id}`)}
        className="info_section"
      >
        <div className="created_date">
          {new Date(createdDate).toLocaleDateString()}
        </div>
        <div className="content">
          {content}
        </div>
      </div>
      <div className="button_section">
        <Button
          onClick={() => nav(`/edit/${id}`)}
          text={"수정하기"}
        />
      </div>
    </div>)
};

export default DiaryItem;