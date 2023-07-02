import { QuizItem } from "@/components/quiz-item";
import { DashboardShell } from "@/components/shell";

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <div className="divide-border-200 divide-y rounded-md border">
        <QuizItem.Skeleton />
        <QuizItem.Skeleton />
        <QuizItem.Skeleton />
      </div>
    </DashboardShell>
  );
}
