import { Box, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import GaugeChart from "react-gauge-chart";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const Realtime = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark'; // Check if dark mode is enabled
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState({ temp: 0, pressure: 0 });

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3100/api/realtime");
      const latestData = response.data[response.data.length - 1];
      setData(latestData || { temp: 0, pressure: 0 });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 2000); // Fetch data every 2 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Dynamically calculate colors based on temperature value
  const calculateTempColors = () => {
    const { temp } = data;
    let gaugeColors = [];

    if (temp <= 8) {
      gaugeColors = ["#00bfff", "#00ff00", "#ff0000"]; // Blue to Green to Red
    } else if (temp <= 20) {
      gaugeColors = ["#00ff00", "#ffff00", "#ff0000"]; // Green to Yellow to Red
    } else {
      gaugeColors = ["#ffff00", "#ff8000", "#ff0000"]; // Yellow to Orange to Red
    }

    return gaugeColors;
  };

  return (
    <Box m="20px">
      <Header title="Realtime" subtitle="Real-time Data Gauges" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          "& .gauge-container": {
            display: "flex",
            justifyContent: "space-around",
            width: "80%",
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
              percent={data.temp / 55}
              textColor={isDarkMode ? "#ffffff" : "#000000"} // White in dark mode, Black in light mode
              formatTextValue={value => `${data.temp} °C`}
              colors={calculateTempColors()}
              arcWidth={0.2}
              needleColor="#808080"
              needleBaseColor="#808080"
            />
          </Box>
          <Box textAlign="center">
            <h3 className="gauge-text">Pressure</h3>
            <GaugeChart
              id="pressure-gauge"
              nrOfLevels={20}
              percent={(data.pressure - 900) / 200}
              textColor={isDarkMode ? "#ffffff" : "#000000"} // White in dark mode, Black in light mode
              formatTextValue={value => `${data.pressure} hPa`}
              colors={["#00bfff", "#ff00ff", "#ff0000", "#00ff00"]}
              arcWidth={0.3}
              needleColor="#808080"
              needleBaseColor="#808080"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Realtime;
