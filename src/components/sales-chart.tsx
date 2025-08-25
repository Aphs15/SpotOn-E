'use client';

import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Line, LineChart as RechartsLineChart, XAxis, YAxis, Tooltip } from 'recharts';

const salesData = [
  { date: 'Oct 1', sold: 50 },
  { date: 'Oct 2', sold: 75 },
  { date: 'Oct 3', sold: 120 },
  { date: 'Oct 4', sold: 90 },
  { date: 'Oct 5', sold: 150 },
  { date: 'Oct 6', sold: 130 },
  { date: 'Oct 7', sold: 200 },
];

export default function SalesChart() {
    return (
        <ChartContainer config={{}} className="h-[300px] w-full">
            <RechartsLineChart data={salesData}>
                <Tooltip
                    content={<ChartTooltipContent />}
                    cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 2, strokeDasharray: '3 3' }}
                />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Line type="monotone" dataKey="sold" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: 'hsl(var(--primary))' }} />
            </RechartsLineChart>
        </ChartContainer>
    );
}
