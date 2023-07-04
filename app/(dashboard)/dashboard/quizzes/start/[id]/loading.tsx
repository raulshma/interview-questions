import { DashboardShell } from "@/components/shell";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";

export default function QuizStartLoading() {
  return (
    <DashboardShell>
      <AlertDialog defaultOpen={true}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              <Skeleton className="w-[160px] h-[18px] rounded-full" />
            </AlertDialogTitle>
            <AlertDialogDescription>
              <Skeleton className="w-full h-[18px] rounded-full" />
              <Skeleton className="w-full h-[18px] rounded-full" />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel><Skeleton className="w-[50px] h-[32px] rounded-full" /></AlertDialogCancel>
            <AlertDialogAction><Skeleton className="w-[50px] h-[32px] rounded-full" /></AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardShell>
  );
}
