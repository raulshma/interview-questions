import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { DashboardShell } from "@/components/shell";
import { QuizItem } from "@/components/quiz-item";
import { EmptyPlaceholder } from "@/components/empty-placeholder";

export const metadata = {
  title: "Quizzes",
};

export default async function QuizzesPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  const quizzes = await db.quiz.findMany({
    select: {
      id: true,
      title: true,
      updatedAt: true,
      createdAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <DashboardShell>
      <div>
        <div className="divide-y divide-border rounded-md border">
          {quizzes.length ? (
            quizzes.map((quiz) => <QuizItem key={quiz.id} quiz={quiz} />)
          ) : (
            <EmptyPlaceholder>
              <EmptyPlaceholder.Icon name="post" />
              <EmptyPlaceholder.Title>
                0 Quizzes Available
              </EmptyPlaceholder.Title>
              <EmptyPlaceholder.Description>
                No quizzes to take.
              </EmptyPlaceholder.Description>
            </EmptyPlaceholder>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}
