import { getWeatherImage } from "../util/get-weather-image";
import "./WeatherItem.css";

const WeatherItem = ({weatherId, weatherName, isSelected, onClick}) => {
  return (
    <div
      onClick={onClick}
      className={`WeatherItem ${
        isSelected ? `WeatherItem_selected` : ""
        }`}
    >
      <img className="weather_img" src={getWeatherImage(weatherId)} />
      <div className="weather_name">{weatherName}</div>
    </div>
  )
};

export default WeatherItem;