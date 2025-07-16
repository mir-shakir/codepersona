'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar,
} from 'recharts'
import { format } from 'date-fns'

interface CommitActivityData {
  day: string // Day of the week (e.g., "Mon", "Tue")
  [hour: string]: number | string // Hours as strings (e.g., "0", "1", ..., "23")
}

interface CodingActivityHeatmapProps {
  data: {
    commitFrequency: {
      monday: number
      tuesday: number
      wednesday: number
      thursday: number
      friday: number
      saturday: number
      sunday: number
      '0': number
      '1': number
      '2': number
      '3': number
      '4': number
      '5': number
      '6': number
      '7': number
      '8': number
      '9': number
      '10': number
      '11': number
      '12': number
      '13': number
      '14': number
      '15': number
      '16': number
      '17': number
      '18': number
      '19': number
      '20': number
      '21': number
      '22': number
      '23': number
    }
  }
}

export function CodingActivityHeatmap({ data }: CodingActivityHeatmapProps) {
  const processData = (): CommitActivityData[] => {
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]
    const hoursOfDay = Array.from({ length: 24 }, (_, i) => i.toString())

    const activityMap: { [day: string]: { [hour: string]: number } } = {}

    daysOfWeek.forEach((day) => {
      activityMap[day] = {}
      hoursOfDay.forEach((hour) => {
        activityMap[day][hour] = 0
      })
    })

    // Assuming commitFrequency contains counts for each day and hour
    // This needs to be mapped to a per-day, per-hour structure
    // The current `analysis_data.commitFrequency` is flat.
    // We need to reconstruct the per-day, per-hour data from raw commits or refine analysis_data.

    // For now, let's create a dummy structure based on the flat data
    // This part needs actual commit data to be accurate.
    // For demonstration, we'll just show overall hourly activity.

    const hourlyData = hoursOfDay.map((hour) => ({
      hour: parseInt(hour),
      count:
        data.commitFrequency[hour as keyof typeof data.commitFrequency] || 0,
    }))

    return hourlyData.map((item) => ({
      day: item.hour.toString(), // Using hour as 'day' for this simplified heatmap
      count: item.count,
    }))
  }

  const heatmapData = processData()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Coding Activity Heatmap</CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={heatmapData}>
            <XAxis dataKey="day" tickFormatter={(value) => `${value}:00`} />
            <YAxis />
            <Tooltip formatter={(value) => [`${value} commits`, 'Hour']} />
            <Bar dataKey="count" fill="url(#colorGradient)" />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.8} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
