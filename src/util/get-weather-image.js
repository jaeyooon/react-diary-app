import w1_sunny from './../assets/w1_sunny.png';
import w2_cloud from './../assets/w2_cloud.png';
import w3_cloudy from './../assets/w3_cloudy.png';
import w4_rainy from './../assets/w4_rainy.png';
import w5_snowy from './../assets/w5_snowy.png';

export function getWeatherImage(weatherId) {
  switch (weatherId) {
    case 1:
      return w1_sunny;
    case 2:
      return w2_cloud;
    case 3:
      return w3_cloudy;
    case 4:
      return w4_rainy;
    case 5:
      return w5_snowy;
    default:
      return null;
  }
}