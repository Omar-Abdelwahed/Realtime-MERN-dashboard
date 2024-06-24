import React from "react";
import { Box, Grid } from "@mui/material";
import Header from "../../components/Header";
import TempBarChart from "../../components/TempBarChart";
import TempLineChart from "../../components/TempLineChart";
import PressLineChart from "../../components/PressLineChart";
import PressBarChart from "../../components/PressBarChart";
import Realtime from "../realtime/index";

const Dashboard = () => {
  return (
    <Box m="20px" maxWidth="1400px">
      <Header title="Sea-Gust" subtitle="Welcome To the monitoring dashboard" />
      <Realtime showHeader={false} /> {/* Use Realtime component without Header */}
      <Grid container spacing={2} mt={2}>
        <Grid item xs={6}>
          <Box height="20vh">
            <TempLineChart />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box height="20vh">
            <PressLineChart />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box height="20vh" mt={1}>
            <TempBarChart />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box height="20vh" mt={1}>
            <PressBarChart />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
