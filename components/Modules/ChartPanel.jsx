import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import {
  Grid,
  Box,
  Typography,
  Paper,
  Card,
  Stack,
  Divider,
  Chip,
} from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";

const boxStyle = {
  padding: "1rem",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#fff",
  height: "100%",
  margin: "2rem 0px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const chartContainerStyle = {
  padding: "1rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
};

const titleStyle = {
  fontFamily: "IranSans",
  marginBottom: "1rem",
};

const ChartPanel = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={5}>
        <Paper sx={boxStyle}>
          <Typography variant="h6" sx={titleStyle}>
            فروش روزانه - فیک
          </Typography>
          <Box sx={chartContainerStyle}>
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
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} md={7}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper
              sx={{
                ...boxStyle,
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <Card variant="outlined" sx={{ maxWidth: 360 }}>
                <Box sx={{ p: 2 }}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography gutterBottom variant="h5" component="div">
                      Toothbrush
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                      $4.50
                    </Typography>
                  </Stack>
                  <Typography color="text.secondary" variant="body2">
                    Pinstriped cornflower blue cotton blouse takes you on a walk
                    to the park or just down the hall.
                  </Typography>
                </Box>
                <Divider />
                <Box sx={{ p: 2 }}>
                  <Typography gutterBottom variant="body2">
                    Select type
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Chip color="primary" label="Soft" size="small" />
                    <Chip label="Medium" size="small" />
                    <Chip label="Hard" size="small" />
                  </Stack>
                </Box>
              </Card>
              <Card variant="outlined" sx={{ maxWidth: 360 }}>
                <Box sx={{ p: 2 }}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography gutterBottom variant="h5" component="div">
                      Toothbrush
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                      $4.50
                    </Typography>
                  </Stack>
                  <Typography color="text.secondary" variant="body2">
                    Pinstriped cornflower blue cotton blouse takes you on a walk
                    to the park or just down the hall.
                  </Typography>
                </Box>
                <Divider />
                <Box sx={{ p: 2 }}>
                  <Typography gutterBottom variant="body2">
                    Select type
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Chip color="primary" label="Soft" size="small" />
                    <Chip label="Medium" size="small" />
                    <Chip label="Hard" size="small" />
                  </Stack>
                </Box>
              </Card>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper sx={boxStyle}>
              <Typography variant="h6" sx={titleStyle}>
                تحلیل فروش - فیک
              </Typography>
              <Box sx={chartContainerStyle}>
                <PieChart
                  series={[
                    {
                      data: [
                        { id: 0, value: 10, label: "Series A" },
                        { id: 1, value: 15, label: "Series B" },
                        { id: 2, value: 20, label: "Series C" },
                      ],
                      innerRadius: 30,
                      outerRadius: 100,
                      paddingAngle: 5,
                      cornerRadius: 5,
                      startAngle: -90,
                      endAngle: 180,
                      cx: 150,
                      cy: 150,
                    },
                  ]}
                  height={290}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ChartPanel;
