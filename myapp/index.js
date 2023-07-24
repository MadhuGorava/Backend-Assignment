// index.js
const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

// API to initialize the database
app.get("/api/initialize-database", async (req, res) => {
  try {
    const url = "https://s3.amazonaws.com/roxiler.com/product_transaction.json";
    const response = await axios.get(url);
    // Process the JSON data and initialize the database with seed data
    // You can define your efficient table/collection structure here
    // For simplicity, we will just return the response data as is for now
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data from the third-party API:", error);
    res.status(500).json({ error: "Failed to initialize database" });
  }
});

// API for statistics
app.get("/api/statistics/:month", (req, res) => {
  // Implement logic to calculate the statistics based on the provided month
  // You can use the "req.params.month" to get the selected month
  // For simplicity, we will just return a dummy response for now
  const dummyResponse = {
    totalSaleAmount: 5000,
    totalSoldItems: 30,
    totalNotSoldItems: 10,
  };
  res.json(dummyResponse);
});

// API for bar chart
app.get("/api/bar-chart/:month", (req, res) => {
  // Implement logic to calculate the bar chart data based on the provided month
  // You can use the "req.params.month" to get the selected month
  // For simplicity, we will just return a dummy response for now
  const dummyResponse = {
    "0-100": 5,
    "101-200": 12,
    "201-300": 8,
    // ... and so on
  };
  res.json(dummyResponse);
});

// API for pie chart
app.get("/api/pie-chart/:month", (req, res) => {
  // Implement logic to calculate the pie chart data based on the provided month
  // You can use the "req.params.month" to get the selected month
  // For simplicity, we will just return a dummy response for now
  const dummyResponse = {
    "Category X": 20,
    "Category Y": 5,
    "Category Z": 3,
    // ... and so on
  };
  res.json(dummyResponse);
});

// API to fetch data from all the above APIs and combine the response
app.get("/api/combined-data/:month", async (req, res) => {
  try {
    const month = req.params.month;
    const initializeDatabaseUrl = "/api/initialize-database";
    const statisticsUrl = `/api/statistics/${month}`;
    const barChartUrl = `/api/bar-chart/${month}`;
    const pieChartUrl = `/api/pie-chart/${month}`;

    const [
      databaseData,
      statisticsData,
      barChartData,
      pieChartData,
    ] = await Promise.all([
      axios.get(initializeDatabaseUrl),
      axios.get(statisticsUrl),
      axios.get(barChartUrl),
      axios.get(pieChartUrl),
    ]);

    const combinedData = {
      databaseData: databaseData.data,
      statisticsData: statisticsData.data,
      barChartData: barChartData.data,
      pieChartData: pieChartData.data,
    };

    res.json(combinedData);
  } catch (error) {
    console.error("Error fetching combined data:", error);
    res.status(500).json({ error: "Failed to fetch combined data" });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
