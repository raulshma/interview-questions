import { DashboardShell } from "@/components/shell";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const emptyArray = [1, 2, 3, 4];

export default function QuizActiveLoading() {
  return (
    <DashboardShell>
      <Card className="w-full border-none shadow-none outline-none">
        <CardHeader>
          <CardTitle>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full md:w-1/2" />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid mb-1 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 md:mb-12 md:grid-cols-2">
            {emptyArray.map((i) => (
              <div
                className="flex flex-col space-y-2 items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-tl-lg md:border-r dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100"
                key={i}
              >
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
