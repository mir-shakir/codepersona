'use client'

import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Bar,
} from 'recharts'

interface HourlyActivityChartProps {
  data: {
    commitFrequency: {
      [hour: string]: number
    }
  }
}

export function HourlyActivityChart({ data }: HourlyActivityChartProps) {
  const processData = () => {
    const hoursOfDay = Array.from({ length: 24 }, (_, i) => i.toString())
    return hoursOfDay.map((hour) => ({
      hour: `${hour}:00`,
      Commits:
        data.commitFrequency[hour as keyof typeof data.commitFrequency] || 0,
    }))
  }

  const chartData = processData()

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="hour" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="Commits" fill="#8b5cf6" />
      </BarChart>
    </ResponsiveContainer>
  )
}
