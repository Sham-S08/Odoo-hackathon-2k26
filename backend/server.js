import express from "express";
import prisma from "./src/config/prisma.js";

const app = express();

app.get("/health", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      status: "ok",
      database: "connected",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "error",
      database: "disconnected",
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});