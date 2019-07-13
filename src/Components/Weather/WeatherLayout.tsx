import React from "react";
import loader from "../../loader.gif";
import styled from "styled-components";
import moment from "moment";
import { Weather } from "./DataModel/Weather";

const seconds = 60 * 60 * 24;

const LoadingImage = styled.img`
  position: absolute;
  top: 50%;
  margin: auto;
  transform: translate(-50%, -50%);
`;

type TrainTrProps = {
  isLate: boolean;
};

export const WeatherLayout = () => {
  const [weather, setWeather] = React.useState<Weather>();
  const [error, setError] = React.useState<string>();
  const [isDelayed, setIsDelayed] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [lastSuccessTime, setLastSuccessTime] = React.useState<moment.Moment>();
  const [now, setNow] = React.useState(moment.now());

  React.useEffect(() => {
    const doWork = () => {
      const controller = new AbortController();
      const signal = controller.signal;

      setTimeout(() => controller.abort(), seconds * 1000);
      setIsLoading(true);
      setError(undefined);

      fetch("/.netlify/functions/getWeather", {
        signal
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          }

          throw new Error(response.statusText);
        })
        .then(response => {
          setIsDelayed(false);
          setError(undefined);
          setLastSuccessTime(moment());
          console.log(response);
          setWeather(response as Weather);
        })
        .catch(error => {
          if (error.name === "AbortError") {
            setIsDelayed(true);
            return;
          }

          console.log("There was an error", error);
          setError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    const timeout = setInterval(doWork, seconds * 1000);
    doWork();

    return () => clearInterval(timeout);
  }, []);

  React.useCallback(() => {
    const timeout = setInterval(() => {
      setNow(moment.now());
    });

    return () => clearInterval(timeout);
  }, []);

  const day =
    weather &&
    weather.daily.data.filter(d => moment.unix(d.time).isBefore(now))[0];

  return (
    <div>
      {isLoading && <LoadingImage src={loader} />}
      {error && <div>There is an error getting the Weather {error}</div>}
      {isDelayed && <div>Weather may be delayed...</div>}
      {weather && (
        <div>
          <h1>Weather Today</h1>
          {lastSuccessTime && <div>As of {lastSuccessTime.fromNow()}</div>}
          {day && (
            <div>
              <div>{day.summary}</div>
              <div>
                High: {Math.round(day.temperatureMax)}&deg;C @
                {moment.unix(day.temperatureMaxTime).format("hA")}
              </div>
              <div>
                Low: {Math.round(day.temperatureLow)}&deg;C @
                {moment.unix(day.temperatureLowTime).format("hA")}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
