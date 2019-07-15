import React from "react";
import "./App.css";
import { TrainTimes } from "./Components/TrainTimes/TrainTimes";
import { WeatherLayout } from "./Components/Weather/WeatherLayout";
import styled from "styled-components";
import { ErrorBoundary } from "./Components/ErrorBounday";

const MyApp = styled.div`
  display: flex;
`;

const App = () => {
  return (
    <ErrorBoundary>
      <MyApp>
        <TrainTimes />
        <WeatherLayout />
      </MyApp>
    </ErrorBoundary>
  );
};

export default App;
