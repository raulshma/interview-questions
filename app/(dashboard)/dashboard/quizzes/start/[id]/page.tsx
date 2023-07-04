import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { DashboardShell } from "@/components/shell";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import QuizStartCancelAction from "@/components/quiz-start-cancel";
import QuizStartConfirmAction from "@/components/quiz-start-confirm";

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

  const userQuiz = await db.userQuiz.findFirst({
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

  const alreadyTaken = userQuiz && userQuiz.id;

  return (
    <DashboardShell>
      <AlertDialog defaultOpen={true}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {alreadyTaken ? "Overwrite" : "Confirm"}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              {alreadyTaken
                ? `You have already taken this quiz on ${userQuiz.startedOn.toLocaleString()}, starting this quiz now will overwrite the existing one.`
                : "Are you sure you want to start the quiz now, you can come back later after finishing to try again."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <QuizStartCancelAction />
            <QuizStartConfirmAction
              path="/dashboard/quizzes/active"
              id={params.id}
            />
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardShell>
  );
}
