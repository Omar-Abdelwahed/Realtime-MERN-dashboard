import { Box } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChartTemp";
import LineChart2 from "../../components/LineChartPress";
const Line = () => {
  return (
    <Box m="20px">
      <Header title="Line Chart" subtitle="Temperature & Pressure" />
      <Box height="40vh">
        <LineChart />
      </Box>
      <Box height="40vh">
        <LineChart2 />
      </Box>
    </Box>
  );
};

export default Line;