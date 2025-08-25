import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, LineChart, PieChart, TrendingUp, Users, Ticket, Share2, Heart, Eye } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart as RechartsBarChart, Line, LineChart as RechartsLineChart, Pie, PieChart as RechartsPieChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const salesData = [
  { date: 'Oct 1', sold: 50 },
  { date: 'Oct 2', sold: 75 },
  { date: 'Oct 3', sold: 120 },
  { date: 'Oct 4', sold: 90 },
  { date: 'Oct 5', sold: 150 },
  { date: 'Oct 6', sold: 130 },
  { date: 'Oct 7', sold: 200 },
];

const engagementData = [
    { source: 'Saves', value: 450, fill: 'var(--chart-1)' },
    { source: 'Shares', value: 280, fill: 'var(--chart-2)' },
    { source: 'Views', value: 1200, fill: 'var(--chart-3)' },
]

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in-up">
       <div className="mb-8">
        <h1 className="text-4xl font-bold font-headline tracking-tight">Organizer Dashboard</h1>
        <p className="text-lg text-muted-foreground mt-1">Analytics for "Cape Town International Jazz Festival"</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tickets Sold</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,254</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23,489</div>
            <p className="text-xs text-muted-foreground">+180.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Saves</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">450</div>
            <p className="text-xs text-muted-foreground">+19% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Shares</CardTitle>
            <Share2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">280</div>
            <p className="text-xs text-muted-foreground">+35 since last week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
                <LineChart className="mr-2 text-primary h-5 w-5" />
                Ticket Sales Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
                <PieChart className="mr-2 text-primary h-5 w-5" />
                Engagement Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
             <ChartContainer config={{}} className="h-[300px] w-full">
                 <RechartsPieChart>
                    <Tooltip content={<ChartTooltipContent nameKey="source" />} />
                    <Pie data={engagementData} dataKey="value" nameKey="source" cx="50%" cy="50%" outerRadius={100} label />
                </RechartsPieChart>
             </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
