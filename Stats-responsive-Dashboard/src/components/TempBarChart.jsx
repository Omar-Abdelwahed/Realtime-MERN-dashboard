import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { useEffect, useState } from "react"; // Added useState
import axios from "axios"; // Added axios import
import { tokens } from "../theme";

const TempBarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [aqua, setAqua] = useState([]); // State to store fetched data

  // Function to fetch data
  const getAqua = async () => {
    try {
      const response = await axios.get("http://localhost:3100/api/AquaState");
      const formattedData = response.data.map(item => ({
        id: item._id,
        ...item
      })); 
      setAqua(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getAqua(); // Fetch data on component mount
    const interval = setInterval(() => getAqua(), 10000); // Fetch data every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const customTooltip = ({ id, value, indexValue }) => (
    <div style={{
      background: colors.main,
      padding: "12px 16px",
      border: `1px solid ${colors.grey[200]}`,
      borderRadius: "4px",
      color: 'white'
    }}>
      <strong>{id}</strong>: {value}<br />
      <strong>Date and Time</strong>: {indexValue}
    </div>
  );

  // Function to format date to display only the month
  const formatMonth = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('default', { month: 'short' });
  };

  // Prepare data with original date and time for x-axis and temperature
  const formattedData = aqua.map(item => ({
    dateTime: `${item.date} ${item.time}`,
    month: formatMonth(`${item.date} ${item.time}`),
    temperature: item.temperature,
  }));

  return (
    <ResponsiveBar
      data={formattedData}
      keys={["temperature"]}
      indexBy="dateTime"
      theme={{
        axis: {
          domain: { line: { stroke: colors.grey[100] } },
          legend: { text: { fill: colors.grey[100] } },
          ticks: { line: { stroke: colors.grey[100], strokeWidth: 1 }, text: { fill: colors.grey[100] } },
        },
        legends: { text: { fill: colors.grey[100] } },
        tooltip: { container: { color: colors.main } },
      }}
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "fries",
          },
          id: "dots",
        },
        {
          match: {
            id: "sandwich",
          },
          id: "lines",
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Date and Time",
        legendPosition: "middle",
        legendOffset: 32,
        format: (value, index) => {
          // Display month label only once per unique month
          if (index === 0 || formattedData[index - 1]?.month !== formattedData[index]?.month) {
            return formatMonth(value);
          }
          return "";
        },
      }}
      axisLeft={{
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Temperature",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableGridX={false}
      enableGridY={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      ariaLabel="Temperature Bar Chart"
      barAriaLabel={(e) => `${e.id}: ${e.formattedValue} on date and time: ${e.indexValue}`}
      tooltip={customTooltip}
    />
  );
};

export default TempBarChart;
