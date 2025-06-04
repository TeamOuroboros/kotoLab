const axios = require("axios");
const getWeather = async (req, res) => {
  try {
    const lat = Number(req.query.latitude);
    const lon = Number(req.query.longitude);
    console.log("🚀 ~ getWeather ~ latitude,longitude:", lat, lon);

    const apiKey = process.env.WEATHER_API;
    console.log("🚀 ~ getWeather ~ apiKey:", apiKey);
    if (!apiKey) {
      return res
        .status(500)
        .json({ message: "OpenWeatherMapAPIキーが設定されていません" });
    }

    //今の天気
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=ja&appid=${apiKey}`;
    // console.log("🚀 ~ getWeather ~ url:", url);

    const data = await axios.get(url);
    // console.log("🚀 ~ getWeather ~ data:", data);

    //拡張性持たせるために作成しました　1Wの天気予報を取得しています 今は今朝と今晩の気温を算出しています
    const weekUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=ja&appid=${apiKey}`;
    const weekData = await axios.get(weekUrl);
    // console.log("🚀 ~ getWeather ~ weekData:", weekData);2025-06-03
    // const todaystr = new Date().toISOString().slice(0, 10); //UTCになっているので、９時間前の日時になる
    const todaystr = new Date()
      .toLocaleString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\//g, "-");
    console.log("🚀 ~ getWeather ~ todaystr:", todaystr);
    const todayList = weekData.data.list.filter((item) =>
      item.dt_txt.startsWith(todaystr)
    );

    // console.log("🚀 ~ getWeather ~ data:", data.data.weather[0].main);
    // console.log("🚀 ~ getWeather ~ data:", data.data.main.temp_max);
    // console.log("🚀 ~ getWeather ~ data:", data.data.main.temp_min);

    const weatherIconMap = {
      Thunderstorm: "⛈️", // 雷雨
      Drizzle: "🌦️", // 霧雨
      Rain: "🌧️", // 雨
      Snow: "❄️", // 雪
      Mist: "🌫️", // 霧
      Smoke: "💨", // 煙
      Haze: "🌁", // かすみ
      Dust: "💨", // 砂塵（Smoke と同じ絵文字でも可）
      Fog: "🌫️", // 濃霧（Mist と同じ絵文字でも可）
      Sand: "🏜️", // 砂嵐
      Ash: "🌋", // 火山灰
      Squall: "💨", // 突風（Windy の絵文字でも可）
      Tornado: "🌪️", // 竜巻
      Clear: "☀️", // 晴天
      Clouds: "☁️", // 雲
    };
    //今の気温を取得
    const weather = data.data.weather[0].description;
    const maxTemperature =
      parseFloat(data.data.main.temp_max.toFixed(1)) + "度";
    const minTemperature =
      parseFloat(data.data.main.temp_min.toFixed(1)) + "度";
    const icon = weatherIconMap[data.data.weather[0].main];

    // console.log("🚀 ~ getWeather ~ weather:", weather);
    // console.log("🚀 ~ getWeather ~ maxTemperature:", maxTemperature);
    // console.log("🚀 ~ getWeather ~ minTemperature:", minTemperature);
    // console.log("🚀 ~ getWeather ~ icon:", icon);

    //今日の朝夜のデータを配列で取得
    const todayFirstData = todayList[0].main.temp;
    const todayLastData = todayList[todayList.length - 1].main.temp;

    //今日の朝夜の気温取得
    const todayFirstTemp = parseFloat(todayFirstData.toFixed(1)) + "度";
    const todayLastTemp = parseFloat(todayLastData.toFixed(1)) + "度";

    //今日の朝夜のアイコン取得
    const todayFirstIcon = weatherIconMap[todayList[0].weather[0].main];
    const todayLastIcon =
      weatherIconMap[todayList[todayList.length - 1].weather[0].main];

    //今日の年月日取得
    const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const weekdayIndex = now.getDay();
    const weekday = weekdays[weekdayIndex];
    const formatted = `${month}/${day} (${weekday})`;
    // console.log(formatted);

    return res.status(200).json({
      weather,
      maxTemperature,
      minTemperature,
      icon,
      todayFist: { todayFirstTemp, todayFirstIcon },
      todayLast: { todayLastTemp, todayLastIcon },
      formatted,
    });
  } catch (error) {
    console.log("🚀 ~ getWeather ~ error:", error);
  }
};

module.exports = { getWeather };
