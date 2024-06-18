import React, { useEffect, useState } from 'react';
import { ColorModeContext, useMode } from "./theme";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from '@mui/material';
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Team from "./scenes/team";
import History from "./scenes/history";
import Temperature from "./scenes/bar";
import Pressure from "./scenes/line";
import Realtime from './scenes/realtime';
import Dashboard from './scenes/dashboard';

function App() {
  const [theme, colorMode] = useMode();
  const [data, setData] = useState([]);

  useEffect(() => {
    // Set up WebSocket connection
    const socket = new WebSocket('ws://localhost:3100');

    socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    socket.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      console.log('New data received:', newData);
      // Update state with new data
      setData((prevData) => [...prevData, newData]);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/history" element={<History />} />
              <Route path="/temp" element={<Temperature />} />
              <Route path="/press" element={<Pressure />} />
              <Route path="/Realtime" element={<Realtime />} />
            </Routes>
            {/* You can pass data as props to your components if needed */}
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;