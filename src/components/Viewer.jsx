import { getWeatherImage } from "../util/get-weather-image";
import "./Viewer.css";
import { weatherList } from "../util/constants";

const Viewer = ({weatherId, content}) => {

  const weatherItem = weatherList.find(
    (item) => String(item.weatherId) === String(weatherId)
  );

  return (
    <div className="Viewer">
      <section className="img_section">
        <h4>오늘의 날씨</h4>
        <div className={`weather_img_wrapper weather_img_wrapper_${weatherId}`}>
          <img src={getWeatherImage(weatherId)}/>
          <div>
            {weatherItem.weatherName}
          </div>
        </div>
      </section>
      <section className="content_section">
        <h4>오늘의 일기</h4>
        <div className="content_wrapper">
          <p>{content}</p>
        </div>
      </section>
    </div>
  )
};

export default Viewer;

