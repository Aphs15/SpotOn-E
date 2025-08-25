'use client';

import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Pie, PieChart as RechartsPieChart, Tooltip } from 'recharts';

const engagementData = [
    { source: 'Saves', value: 450, fill: 'var(--chart-1)' },
    { source: 'Shares', value: 280, fill: 'var(--chart-2)' },
    { source: 'Views', value: 1200, fill: 'var(--chart-3)' },
];

export default function EngagementChart() {
    return (
        <ChartContainer config={{}} className="h-[300px] w-full">
            <RechartsPieChart>
                <Tooltip content={<ChartTooltipContent nameKey="source" />} />
                <Pie data={engagementData} dataKey="value" nameKey="source" cx="50%" cy="50%" outerRadius={100} label />
            </RechartsPieChart>
        </ChartContainer>
    );
}
