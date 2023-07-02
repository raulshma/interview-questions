import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { DashboardShell } from "@/components/shell";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { QuizForm } from "@/components/quiz-form";

export const metadata = {
  title: "Quiz start",
};

export type QuizStartPageParams = {
  params: { id: string };
};

export default async function QuizStartPage({ params }: QuizStartPageParams) {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  if (!params.id) redirect("/dashboard/quizzes");

  const quiz = await db.quiz.findFirst({
    where: {
      id: params.id,
    },
  });

  if (quiz == null)
    return (
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Whoops! 404</AlertTitle>
        <AlertDescription>We were not able to find the quiz.</AlertDescription>
      </Alert>
    );

  const everyQuestionIdsForQuiz = await db.question.findMany({
    where: {
      quizId: quiz.id,
    },
    select: { id: true },
  });

  let userQuizId = "";

  if (everyQuestionIdsForQuiz.length > 0) {
    const alreadyTaken = await db.userQuiz.findFirst({
      where: {
        quizId: quiz.id,
        userId: user.id,
        endedOn: undefined,
      },
      select: {
        id: true,
        startedOn: true,
      },
    });

    if (alreadyTaken !== null && alreadyTaken.id) {
      console.info("Repeated quiz - %o", alreadyTaken);
      userQuizId = alreadyTaken.id;
    } else {
      const userQuiz = await db.userQuiz.create({
        data: {
          quizId: quiz.id,
          userId: user.id,
          answers: [],
          startedOn: new Date(),
        },
      });
      if (userQuiz !== null && userQuiz.id) {
        console.info("Created new quiz - %o", userQuiz);
        userQuizId = userQuiz.id;
      }
    }
  }

  return (
    <DashboardShell>
      <QuizForm
        quizId={quiz.id}
        userQuizId={userQuizId}
        questionIds={everyQuestionIdsForQuiz}
      />
    </DashboardShell>
  );
}
