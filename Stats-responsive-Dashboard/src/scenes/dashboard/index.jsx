import React from "react";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import Realtime from "scenes/realtime";
import Line from "scenes/line";
import Bar from "scenes/bar";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
 {/* const navigate = useNavigate();
  React.useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) navigate("/login")
  },[])
    
  */}
  return (
    <Box m="20px" maxWidth="1400px" maxHeight="800px">
      <Header
        title="Dashboard"
        subtitle="Welcome To Your Dashboard"
      />
      <Box display="flex" flexDirection="column" height="100%">
        <Box mb={2} flex="1" display="flex" justifyContent="space-between">
          <Box flex="1" mr={1}>
            <Realtime style={{ height: "100%", width: "100%" }} />
          </Box>
        </Box>
        <Box mt={2} flex="1" display="flex" justifyContent="space-between">
          <Box flex="1" mr={1}>
            <Line style={{ height: "100%", width: "100%" }} />
          </Box>
          <Box flex="1" ml={1}>
            <Bar style={{ height: "100%", width: "100%" }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;