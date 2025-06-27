import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useItem } from "@/hooks/useItem";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ItemDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: item, isLoading, isError } = useItem(id!);

  useEffect(() => {
    if (isError) navigate("/");
  }, [isError, navigate]);

  return (
    <div className="container mx-auto max-w-screen-xl py-4 px-4 md:px-4 lg:px-6 ">
      <div className="flex flex-col justify-center self-start mb-4 w-full lg:w-full max-w-screen-xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Item Details</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="h-5 w-1/4" />
              </div>
            ) : item ? (
              <div className="space-y-2">
                <p><strong>Name:</strong> {item?.name}</p>
                <p><strong>Category:</strong> {item?.category}</p>
                <p><strong>Price:</strong>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(item?.price)}
                </p>
              </div>
            ) : (
              <p>Item not found.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}