import React from 'react'
import { Pie, Line } from 'react-chartjs-2'
import moment from 'moment'

const APP_COLORS = {
  accent: '#FEB931'
}

const MOODLIST = [
  { name: 'Terrible', color: '#a10702'},
  { name: 'Meh', color: '#f44708'},
  { name: 'Neutral', color: APP_COLORS.accent},
  { name: 'Good', color: '#688e26'},
  { name: 'Great', color: '#66cc00'}
]
const defaultOptions = {
  layout: {
    padding: 10
  },
  scales: {
    xAxes: [{
      type: 'time',
      distribution: 'series',
      ticks: { reverse: true }
    }],
    yAxes: [{
      ticks: { display: false }
    }]
  }
}

/**
 * returns a chart component
 * @param {[]} entries array of entries to base the data on
 * @param {string} [type] type of chart to make
 */
function makeChart(entries, type = 'line') {
  let Chart = Line
  let chartData = {
    datasets: [{
      data: entries.map(e => ({
        x: moment(e.date_created).toDate(),
        y: e.mood}) ),
      backgroundColor: '#00000000',
      borderColor: APP_COLORS.accent
    }]
  }

  let chartOptions = {
    ...defaultOptions,
    legend: { display: false },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          return MOODLIST[tooltipItem.yLabel - 1] + ' mood'
        }
      }
    }
  }

  if (type === 'pie') {
    const moods = {}
    entries.forEach(e => {
      const mood = MOODLIST[e.mood - 1].name
      if (!moods[mood]) moods[mood] = 0
      moods[mood]++
    })

    const colors = Object.keys(moods)
      .map(mood => MOODLIST.find(m => m.name === mood).color)

    Chart = Pie
    chartData = {
      labels: Object.keys(moods),
      datasets: [{
        data: Object.values(moods),
        backgroundColor: colors,
      }]
    }

    chartOptions = {
      legend: {
        display: true,
        position: 'right',
        labels: { boxWidth: 15 }
      }
    }

    console.log(chartData)
  }

  return (
    <Chart
      data={chartData}
      options={chartOptions} />
  )
}

export default {
  makeChart
}