import { DashboardShell } from "@/components/shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "lucide-react";

export default function QuizResultLoading() {
  return (
    <DashboardShell>
      <div className="flex flex-row gap-4 justify-center">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <Skeleton className="w-[85px] h-[18px] rounded-full" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <Skeleton className="w-[34px] h-[18px] rounded-full" />
            </div>
            <p className="text-xs text-muted-foreground">
              <Skeleton className="w-[160px] h-[18px] rounded-full" />
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <Skeleton className="w-[85px] h-[18px] rounded-full" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <Badge>
                <Skeleton className="w-[32px] h-[18px] rounded-full" />
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              <Skeleton className="w-[260px] h-[18px] rounded-full" />
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
