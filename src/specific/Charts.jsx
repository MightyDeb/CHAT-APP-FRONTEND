import React from 'react'
import {Line,Doughnut} from 'react-chartjs-2'
import { CategoryScale, Chart as ChartJs, Tooltip, Filler, LinearScale, PointElement, LineElement, ArcElement, Legend } from 'chart.js'
import { getLast7Days } from '../lib/features'
ChartJs.register(CategoryScale,Tooltip, Filler, LinearScale, LineElement, PointElement, ArcElement, Legend)

const labels= getLast7Days()

const lineChartOptions={
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },           
  },
  title: {
    display: false
  },
  scales: {
    x: {
      grid: {
        display: false
      }
    },
    y: {
      beginAtZero: true,
      grid: {
        display: false
      }
    }
  }
}

const LineChart = ({value=[]}) => {
  const data={
    labels,
    datasets: [{
      data: value,
      label: 'Days',
      fill: true,
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,1)'
    }]
  }
  return <Line data={data} options={lineChartOptions}/>
  
}

const doughnutChartOptions={
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },           
  },
  cutout: 120
}

const DoughnutChart= ({value=[],labels=[]})=>{
  const data={
    labels,
    datasets: [{
      data: value,
      label: 'Total Chats vs Group Chats',
      backgroundColor: ['rgba(75,192,192,0.2)','#ea7070'],
      hoverBackgroundColor: ['lightblue','red'],
      borderColor: ['rgba(75,192,192,1)', '#ea7070'],
      offset: 30
    }]
  }
  return <Doughnut style={{zIndex: 10}} data={data} options={doughnutChartOptions}/>
}

export {LineChart, DoughnutChart }