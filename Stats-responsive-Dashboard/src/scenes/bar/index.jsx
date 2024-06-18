import { Box } from "@mui/material";
import Header from "../../components/Header";
import LineChartPress from "../../components/LineChartPress";
import BarChart2 from "../../components/BarChart2";
const Bar = () => {
  return (
    <Box m="20px">
      <Header title="Temperature logs" subtitle="Line & Bar charts:" />
      <Box height="40vh">
        <LineChartPress />
      </Box>
      <Box height="40vh">
        <BarChart2 />
      </Box>
    </Box>
    
  );
};

export default Bar;