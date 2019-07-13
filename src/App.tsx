import React from "react";
import "./App.css";
import { TrainTimes } from "./Components/TrainTimes/TrainTimes";
import { WeatherLayout } from "./Components/Weather/WeatherLayout";
import styled from "styled-components";

const MyApp = styled.div`
  display: flex;
`;

const App = () => {
  return (
    <MyApp>
      <TrainTimes />
      <WeatherLayout />
    </MyApp>
  );
};

export default App;
