import Config from 'react-native-config';

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';

const iconToEmoji = (icon: string): string => {
  const id = icon.slice(0, 2);
  const isDay = icon.endsWith('d');
  switch (id) {
    case '01': return isDay ? '☀️' : '🌙';
    case '02': return '⛅';
    case '03': return '🌥️';
    case '04': return '☁️';
    case '09': return '🌧️';
    case '10': return isDay ? '🌦️' : '🌧️';
    case '11': return '⛈️';
    case '13': return '❄️';
    case '50': return '🌫️';
    default:   return '🌡️';
  }
};

export interface WeatherData {
  temperature: number;
  feelsLike: number;
  description: string;
  emoji: string;
  city: string;
  humidity: number;
  windSpeed: number;
}

interface OpenWeatherResponse {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
}

/** Condition IDs 200–699 cover thunderstorm, drizzle, rain, and snow. */
const isRainConditionId = (id: number): boolean => id >= 200 && id < 700;

export interface ForecastSlot {
  dt: number;
  isRain: boolean;
  description: string;
  emoji: string;
}

interface OpenWeatherForecastResponse {
  list: Array<{
    dt: number;
    weather: Array<{ id: number; description: string; icon: string }>;
  }>;
}

/**
 * Fetches the 5-day / 3-hour forecast and returns all slots.
 * Each slot's `dt` is a Unix timestamp (seconds).
 */
export const fetchForecastSlots = async (
  latitude: number,
  longitude: number,
): Promise<ForecastSlot[]> => {
  const apiKey = Config.OPENWEATHER_API_KEY;
  const url = `${FORECAST_URL}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Forecast fetch failed: ${response.status}`);
  }

  const data = (await response.json()) as OpenWeatherForecastResponse;

  return data.list.map(slot => {
    const condition = slot.weather[0];
    return {
      dt: slot.dt * 1000, // convert to ms
      isRain: isRainConditionId(condition.id),
      description: condition.description,
      emoji: iconToEmoji(condition.icon),
    };
  });
};

/**
 * Finds the forecast slot whose timestamp is closest to `targetMs`.
 * Returns null if the list is empty or the nearest slot is more than 3 hours away.
 */
export const findSlotForTime = (
  slots: ForecastSlot[],
  targetMs: number,
): ForecastSlot | null => {
  let closest: ForecastSlot | null = null;
  let minDiff = Infinity;

  for (const slot of slots) {
    const diff = Math.abs(slot.dt - targetMs);
    if (diff < minDiff) {
      minDiff = diff;
      closest = slot;
    }
  }

  // Ignore if the nearest slot is more than 3 hours from the task time
  return minDiff <= 3 * 3600 * 1000 ? closest : null;
};

export const fetchWeather = async (
  latitude: number,
  longitude: number,
): Promise<WeatherData> => {
  const apiKey = Config.OPENWEATHER_API_KEY;
  const url = `${BASE_URL}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Weather fetch failed: ${response.status}`);
  }

  const data = (await response.json()) as OpenWeatherResponse;
  const condition = data.weather[0];

  return {
    temperature: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    description: condition.description,
    emoji: iconToEmoji(condition.icon),
    city: data.name,
    humidity: data.main.humidity,
    windSpeed: Math.round(data.wind.speed),
  };
};
