import { Box } from "@mui/material";
import Header from "../../components/Header";
import LineChart2 from "../../components/PressLineChart";
import BarChart2 from "../../components/PressBarChart";
const Line = () => {
  return (
    <Box m="20px">
      <Header title="Pressure Charts" subtitle="Pressure Data" />
      <Box height="40vh">
        <LineChart2 />
      </Box>
      <Box height="40vh">
        <BarChart2 />
      </Box>
    </Box>
  );
};

export default Line;