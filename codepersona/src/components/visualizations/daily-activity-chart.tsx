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

interface DailyActivityChartProps {
  data: {
    commitFrequency: {
      [day: string]: number
    }
  }
}

export function DailyActivityChart({ data }: DailyActivityChartProps) {
  const processData = () => {
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]
    return daysOfWeek.map((day) => ({
      day,
      Commits:
        data.commitFrequency[
          day.toLowerCase() as keyof typeof data.commitFrequency
        ] || 0,
    }))
  }

  const chartData = processData()

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="Commits" fill="#6366f1" />
      </BarChart>
    </ResponsiveContainer>
  )
}
