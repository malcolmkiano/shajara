import React from "react";
import { Pie, Line } from "react-chartjs-2";
import moment from "moment";

const MOODLIST = [
  { name: "Terrible", color: "#D36135" },
  { name: "Meh", color: "#F78154" },
  { name: "Neutral", color: "#E6C79C" },
  { name: "Good", color: "#A0CA92" },
  { name: "Great", color: "#D8F793" },
];

/**
 * returns a chart component
 * @param {[]} entries array of entries to base the data on
 * @param {{}} theme color theme being used in the app
 * @param {string} [type] type of chart to make
 */
function makeChart(entries, theme, type = "line") {
  let Chart = Line;
  let chartData = {
    datasets: [
      {
        data: entries.map((e) => ({
          x: moment(e.date_created).toDate(),
          y: e.mood,
        })),
        backgroundColor: "#00000000",
        borderColor: theme && theme.accent,
      },
    ],
  };

  let chartOptions = {
    layout: {
      padding: 10,
    },
    legend: { display: false },
    scales: {
      xAxes: [
        {
          type: "time",
          distribution: "series",
        },
      ],
      yAxes: [
        {
          ticks: { display: false },
          gridLines: {
            color: theme && theme.colorPale,
          },
        },
      ],
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem) {
          return MOODLIST[tooltipItem.yLabel - 1].name + " mood";
        },
        labelColor: function (tooltipItem) {
          return {
            backgroundColor: MOODLIST[tooltipItem.yLabel - 1].color,
          };
        },
      },
    },
  };

  if (type === "pie") {
    const moods = {};
    entries.forEach((e) => {
      const mood = MOODLIST[e.mood - 1].name;
      if (!moods[mood]) moods[mood] = 0;
      moods[mood]++;
    });

    const colors = Object.keys(moods).map(
      (mood) => MOODLIST.find((m) => m.name === mood).color
    );

    Chart = Pie;
    chartData = {
      labels: Object.keys(moods),
      datasets: [
        {
          data: Object.values(moods),
          backgroundColor: colors,
          borderWidth: 0,
        },
      ],
    };

    chartOptions = {
      ...chartOptions,
      scales: {},
      tooltips: {},
      legend: {
        display: true,
        position: "right",
        labels: {
          boxWidth: 15,
          fontColor: theme && theme.colorText,
        },
      },
    };
  }

  return <Chart data={chartData} options={chartOptions} />;
}

export default {
  makeChart,
};
