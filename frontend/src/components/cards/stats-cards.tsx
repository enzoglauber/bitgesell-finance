import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Stats } from "@/interfaces/stats"
import { Skeleton } from "../ui/skeleton"

interface StatsCardsProps {
  data?: Stats
  isLoading?: boolean
}

export function StatsCards({ data, isLoading }: StatsCardsProps) {

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {[...Array(2)].map((_, i) => (
          <Skeleton key={i} className="h-[100px] w-full" />
        ))}
      </div>
    )
  }

  if (!data) {
    return <p className="text-red-500 text-sm">No stats available.</p>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium font-bebas-neue">Total Items</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-bold">{data?.total}</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium font-bebas-neue">Average Price</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-bold">${data?.averagePrice?.toFixed(2)}</CardContent>
      </Card>
    </div>
  )
}
