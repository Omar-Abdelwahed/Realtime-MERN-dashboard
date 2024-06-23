import { Box } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/TempBarChart";
import LineChart from "components/TempLineChart";
const Bar = () => {
  return (
    <Box m="20px">
      <Header title="Temperature Charts" subtitle="Temperature Data" />
      <Box height="40vh">
        <LineChart />
      </Box>
      <Box height="40vh">
        <BarChart />
      </Box>
    </Box>
    
  );
};

export default Bar;