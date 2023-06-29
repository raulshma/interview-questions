import Link from "next/link";
import { Quiz } from "@prisma/client";

import { formatDate } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface QuizItemProps {
  quiz: Pick<Quiz, "id" | "title" | "updatedAt" | "createdAt">;
}

export function QuizItem({ quiz }: QuizItemProps) {
  return (
    <Link href={`/dashboard/quizzes/${quiz.id}`} prefetch={false}>
      <div className="flex items-center justify-between p-4">
        <div className="grid gap-1">
          {quiz.title}
          <div>
            <p className="text-sm text-muted-foreground">
              {formatDate(quiz.createdAt?.toDateString())}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

QuizItem.Skeleton = function PostItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
};
