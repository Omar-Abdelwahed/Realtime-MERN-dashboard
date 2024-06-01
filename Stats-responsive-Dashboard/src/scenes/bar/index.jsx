import { Box } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";
import BarChart2 from "../../components/BarChart2";
const Bar = () => {
  return (
    <Box m="20px">
      <Header title="Bar Chart" subtitle="Temperature and Pressure" />
      <Box height="40vh">
        <BarChart />
      </Box>
      <Box height="40vh">
        <BarChart2 />
      </Box>
    </Box>
    
  );
};

export default Bar;