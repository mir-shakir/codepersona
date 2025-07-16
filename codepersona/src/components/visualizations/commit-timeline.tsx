'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'
import { format, parseISO } from 'date-fns'

interface CommitTimelineProps {
  data: {
    commits: {
      [repoFullName: string]: { commit: { author: { date: string } } }[]
    }
  }
}

export function CommitTimeline({ data }: CommitTimelineProps) {
  const processData = () => {
    const allCommits = Object.values(data.commits).flat()

    const dailyCommits: { [date: string]: number } = {}

    allCommits.forEach((c) => {
      const date = format(parseISO(c.commit.author.date), 'yyyy-MM-dd')
      dailyCommits[date] = (dailyCommits[date] || 0) + 1
    })

    // Convert to array of objects for Recharts
    const sortedDates = Object.keys(dailyCommits).sort()
    return sortedDates.map((date) => ({
      date,
      commits: dailyCommits[date],
    }))
  }

  const chartData = processData()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Commit Timeline</CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(str) => format(parseISO(str), 'MMM dd')}
              minTickGap={20}
            />
            <YAxis />
            <Tooltip
              labelFormatter={(label) => format(parseISO(label), 'PPP')}
            />
            <Line
              type="monotone"
              dataKey="commits"
              stroke="#6366f1"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
