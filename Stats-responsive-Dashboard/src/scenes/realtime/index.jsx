import { Box, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import GaugeChart from "react-gauge-chart";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const Realtime = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark'; // chouf dark mode mahtout walle
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState({ temperature: 0, pressure: 0, dateTime: "" });

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3100/api/realtime");
      const latestData = response.data[response.data.length - 1];
      setData(latestData || { temperature: 0, pressure: 0,time: " ", date: " " });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15000); // refresh koll

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Couleur yetbaddel hasb temperature
  const calculateTemperatureColors = () => {
    const { temperature } = data;
    let gaugeColors = [];

    if (temperature <= 8) {
      gaugeColors = ["#00bfff", "#00ff00", "#ff0000"]; // Blue to Green to Red
    } else if (temperature <= 20) {
      gaugeColors = ["#00ff00", "#ffff00", "#ff0000"]; // Green to Yellow to Red
    } else {
      gaugeColors = ["#ffff00", "#ff8000", "#ff0000"]; // Yellow to Orange to Red
    }

    return gaugeColors;
  };

  return (
    <Box m="20px">
      <Header title="Realtime" subtitle="Data Gauges" />
      <Box
        m="40px 0 0 0"
        height="75vh" // Adjust the height as per your requirement
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          "& .gauge-container": {
            display: "flex",
            justifyContent: "space-around",
            width: "80%", // Adjust the width as per your requirement
          },
          "& .gauge-text": {
            color: isDarkMode ? "#ffffff" : "#808080", // White in dark mode, Grey in light mode
          },
        }}
      >
        <Box className="gauge-container">
          <Box textAlign="center">
            <h3 className="gauge-text">Temperature</h3>
            <GaugeChart
              id="temperature-gauge"
              nrOfLevels={10}
              percent={data.temperature / 55}
              textColor={isDarkMode ? "#ffffff" : "#000000"} // White in dark mode, Black in light mode
              formatTextValue={value => `${data.temperature} °C`}
              colors={calculateTemperatureColors()}
              arcWidth={0.2}
              needleColor="#808080"
              needleBaseColor="#808080"
            />
            <p>Last Updated: {data.time + " " + data.date  }</p>
          </Box>
          <Box textAlign="center">
            <h3 className="gauge-text">Pressure</h3>
            <GaugeChart
              id="pressure-gauge"
              nrOfLevels={20}
              percent={(data.pressure - 900) / 400}
              textColor={isDarkMode ? "#ffffff" : "#000000"} // White in dark mode, Black in light mode
              formatTextValue={value => `${data.pressure} hPa`}
              colors={["#00bfff", "#ff00ff", "#ff0000", "#00ff00"]}
              arcWidth={0.3}
              needleColor="#808080"
              needleBaseColor="#808080"
            />
            <p>Last Updated: {data.time + " " + data.date}</p>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Realtime;
