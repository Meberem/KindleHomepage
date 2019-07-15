import React from "react";
import { Times } from "./DataModel/Times";
import loader from "../../loader.gif";
import styled from "styled-components";
import moment from "moment";

const seconds = 30;

const LoadingImage = styled.img`
  position: absolute;
  top: 50%;
  margin: auto;
  transform: translate(-50%, -50%);
`;

type TrainTrProps = {
  isLate: boolean;
};
const TrainTr = styled.tr`
  ${(props: TrainTrProps) => `
        opacity: ${props.isLate ? "0.5" : 1}
    `}
`;
const TrainTd = styled.td`
  padding-left: 1em;
  padding-right: 1em;
  text-align: left;
`;

export const TrainTimes = () => {
  const [times, setTimes] = React.useState<Times[]>();
  const [error, setError] = React.useState<string>();
  const [isDelayed, setIsDelayed] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [lastSuccessTime, setLastSuccessTime] = React.useState<moment.Moment>();

  React.useEffect(() => {
    const doWork = () => {
      const controller = new AbortController();
      const signal = controller.signal;

      setTimeout(() => controller.abort(), seconds * 1000);
      setIsLoading(true);
      setError(undefined);

      fetch("/.netlify/functions/getDepartures", {
        signal
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          }

          throw new Error(response.statusText);
        })
        .then(times => {
          setIsDelayed(false);
          setError(undefined);
          setLastSuccessTime(moment());
          console.log(times);
          setTimes(times as Times[]);
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

  const now = moment.now();

  return (
    <div>
      {isLoading && <LoadingImage src={loader} />}
      {error && <div>There is an error getting the TrainTimes {error}</div>}
      {isDelayed && <div>Train Times may be delayed...</div>}
      {times && (
        <div>
          <h1>Train Times</h1>
          {lastSuccessTime && <div>As of {lastSuccessTime.fromNow()}</div>}
          <table>
            <tbody>
              {times
                .filter(t => t.stop.type === "stop")
                .map(time => {
                  const trainTime = moment(time.when);
                  const isLate = trainTime.isBefore(now);
                  return (
                    <TrainTr key={time.tripId} isLate={isLate}>
                      <TrainTd>{time.line.name}</TrainTd>
                      <TrainTd>{time.direction}</TrainTd>
                      <TrainTd>{trainTime.fromNow()}</TrainTd>
                    </TrainTr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
