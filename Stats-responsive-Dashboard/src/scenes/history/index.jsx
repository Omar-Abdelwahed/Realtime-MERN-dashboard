import { Box, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import axios from "axios";

const History = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [ 
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "time",
      headerName: "Time ",
      flex: 1,
    },
    {
      field: "temp",
      headerName: "Temperature",
      flex: 1,
    },
    {
      field: "pressure",
      headerName: "Pressure",
      flex: 1,
    },
    { field: "_id", headerName: "ID", flex: 0.5 }
  ];

  const [Aqua, setAqua] = useState([]);

  const getAqua = async () => {
    try {
      const response = await axios.get("http://localhost:3100/api/AquaState");
      const formattedData = response.data.map(item => ({
        id: item._id,
        ...item
      })); 
      setAqua(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getAqua();
  }, []);

  return (
    <Box m="20px">
      <Header title="History" subtitle="List of data Logs" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={Aqua} columns={columns} />
      </Box>
    </Box>
  );
};

export default History;