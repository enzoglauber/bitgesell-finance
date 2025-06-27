import { StatsCards } from "@/components/cards/stats-cards";
import { ItemsTable } from "@/components/tables/items-table";
import { useStats } from "@/hooks/useStats";
import { columns } from "./columns";

export default function Items() {
  const { data, isLoading } = useStats()

  return (
    <div className="container mx-auto max-w-screen-xl py-4 px-4 md:px-4 lg:px-6 ">
      <div className="flex flex-col justify-center self-start mb-4 w-full lg:w-full max-w-screen-xl">
        <StatsCards data={data} isLoading={isLoading} />
        <ItemsTable
          columns={columns}
          title="Item List"
          filterColumn="name"
        />
      </div>
    </div>
  )
}
