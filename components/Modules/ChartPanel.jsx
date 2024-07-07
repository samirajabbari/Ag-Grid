import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { Grid, Box, Typography, Paper } from "@mui/material";

const boxStyle = {
  padding: "1rem",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#fff",
  height: "100%",
  margin: "2rem 0px",
};

function ChartPanel() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Paper sx={boxStyle}>
          <Typography sx={{ fontFamily: "IranSans" }} variant="h6" gutterBottom>
            فروش روزانه- فیک
          </Typography>
          <BarChart
            series={[
              { data: [35, 44, 24, 34] },
              { data: [51, 6, 49, 30] },
              { data: [15, 25, 30, 50] },
              { data: [60, 50, 15, 25] },
            ]}
            height={290}
            xAxis={[{ data: ["Q1", "Q2", "Q3", "Q4"], scaleType: "band" }]}
            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
          />
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper sx={boxStyle}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontFamily: "IranSans" }}
              >
                فروش ماه- فیک
              </Typography>
              <LineChart
                series={[
                  { data: [35, 44, 24, 34] },
                  { data: [51, 6, 49, 30] },
                  { data: [15, 25, 30, 50] },
                  { data: [60, 50, 15, 25] },
                ]}
                height={290}
                xAxis={[{ data: ["Q1", "Q2", "Q3", "Q4"], scaleType: "band" }]}
                margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
              />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ChartPanel;
