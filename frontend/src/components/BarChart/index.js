import React, { useState, useEffect } from "react";
import { Chart, registerables } from "chart.js";
import "./chart.scss";

export default function BarChart() {
  const barChart = document.getElementById("barChart");

  useEffect(() => {
    const myChart = new Chart(barChart, {
      type: "bar",
      data: {
        labels: ["Hà Nội", "Hà Giang", "Cao Bằng", "Bắc Cạn", "Tuyên Quang"],
        datasets: [
          {
            label: "Area",
            data: [3, 358.6, 7, 929.5, 6, 700.3, 4, 860.0, 5, 867.9],
          },
        ],
      },
      options: {},
    });
  }, []);
  return <canvas id="barChart"></canvas>;
}
