
import { Box } from "@mui/material";
import Header from "../../components/Header";
import PressBarChart from "../../components/PressBarChart";
import PressLineChart from "../../components/PressLineChart";
const Line = () => {
  return (
    <Box m="20px">
      <Header title="Pressure Charts" subtitle="Pressure Data" />
      <Box height="40vh">
        <PressLineChart/>
      </Box>
      <Box height="40vh">
        <PressBarChart />
      </Box>
    </Box>
  );
};

export default Line;
