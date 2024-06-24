import { Box } from "@mui/material";
import Header from "../../components/Header";
import TempLineChart from "../../components/TempLineChart";
import TempBarChart from "../../components/TempBarChart";
const Bar = () => {
  return (
    <Box m="20px">
      <Header title="Temperature Charts" subtitle="Temperature Data" />
      <Box height="40vh">
        <TempLineChart />
      </Box>
      <Box height="40vh">
        <TempBarChart />
      </Box>
    </Box>
    
  );
};

export default Bar;