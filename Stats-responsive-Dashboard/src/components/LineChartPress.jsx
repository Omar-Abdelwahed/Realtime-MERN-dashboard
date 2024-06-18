import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { tokens } from "../theme";
import dayjs from "dayjs";
import { MenuItem, Select, FormControl, InputLabel, Box } from "@mui/material";

const LineChartPress = ({ isCustomLineColors = false, isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [aquaData, setAquaData] = useState([]);
  const [view, setView] = useState("this_week");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3100/api/AquaState");
        const formattedData = response.data.map(item => ({
          dateTime: `${item.date} ${item.time}`,
          date: item.date,
          pressure: item.pressure,
        }));
        setAquaData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000); // fetch data every 10 seconds

    return () => clearInterval(interval); // clean up interval on component unmount
  }, []);

  useEffect(() => {
    setFilteredData(filterData(aquaData, view));
  }, [aquaData, view]);

  const filterData = (data, view) => {
    console.log("Original Data:", data);
    const now = dayjs();
    let filtered = [];
    if (view === "this_week") {
      const startOfWeek = now.startOf("week");
      filtered = data.filter(item => dayjs(item.date).isAfter(startOfWeek));
    } else if (view === "this_month") {
      const startOfMonth = now.startOf("month");
      filtered = data.filter(item => dayjs(item.date).isAfter(startOfMonth));
    } else if (view === "overall") {
      filtered = data; // Return all data
    }
    console.log("Filtered Data:", filtered);
    return filtered;
  };
  

  const customTooltip = ({ point }) => (
    <div
      style={{
        background: colors.primary[500],
        padding: "12px 16px",
        border: `1px solid ${colors.grey[200]}`,
        borderRadius: "4px",
        color: 'white', // Set text color to white
      }}
    >
      <strong>Time:</strong> {point.data.xFormatted}<br />
      <strong>{point.serieId}:</strong> {point.data.yFormatted}
    </div>
  );

  return (
    <Box>
      <FormControl variant="outlined" style={{ marginBottom: '20px' }}>
        <InputLabel id="view-select-label">View</InputLabel>
        <Select
          labelId="view-select-label"
          id="view-select"
          value={view}
          onChange={(e) => setView(e.target.value)}
          label="View"
        >
          <MenuItem value="this_week">This Week</MenuItem>
          <MenuItem value="this_month">This Month</MenuItem>
          <MenuItem value="overall">Overall</MenuItem>
        </Select>
      </FormControl>
      <ResponsiveLine
        data={[
          {
            id: "Pressure",
            data: filteredData.map(item => ({
              x: item.dateTime,
              y: item.pressure,
            })),
          },
        ]}
        theme={{
          // Theme configuration
        }}
        // Other props
        tooltip={customTooltip}
      />
    </Box>
  );
};

export default LineChartPress;
