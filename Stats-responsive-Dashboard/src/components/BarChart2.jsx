import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { useEffect, useState } from "react";
import axios from "axios";
import { tokens } from "../theme";

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [aquaData, setAquaData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3100/api/AquaState");
        const formattedData = response.data.map(item => ({
          dateTime: `${item.date} ${item.time}`,
          temperature: item.temperature,
          pressure: item.pressure,
        }));
        setAquaData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ResponsiveBar
      data={aquaData}
      keys={["pressure"]} // Display only pressure
      indexBy="dateTime"
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      borderColor={{ from: "color", modifiers: [["darker", "1.6"]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Date and Time",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Pressure",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
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
          effects: [{ on: "hover", style: { itemOpacity: 1 } }],
        },
      ]}
      tooltip={({ id, value, indexValue }) => (
        <div
          style={{
            padding: "12px 16px",
            background: "white",
            border: `1px solid ${colors.grey[200]}`,
            borderRadius: "4px",
            color: colors.grey[900],
          }}
        >
          <strong>{id}</strong>: {value}
          <br />
          <strong>Date and Time</strong>: {indexValue}
        </div>
      )}
      role="application"
      barAriaLabel={e => `${e.id}: ${e.formattedValue} at ${e.indexValue}`}
    />
  );
};

export default BarChart;
