import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { DashboardShell } from "@/components/shell";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { GET, UserQuizResultPath } from "@/lib/httpClient";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Prisma } from "@prisma/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Quiz result",
};

export type QuizResultPageParams = {
  params: { id: string };
};

export default async function QuizResultPage({
  params: { id },
}: QuizResultPageParams) {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  if (!id) redirect("/dashboard/quizzes");

  const userQuiz = await db.userQuiz.findFirst({
    where: {
      id: id,
      userId: user.id,
    },
    select: {
      id: true,
      answers: true,
      totalQuestion: true,
      quizId: true,
    },
  });

  let correctAnswersCount = -1;
  let addedToLeaderboard = false;
  if (userQuiz !== null) {
    await db.userQuiz.update({
      data: { endedOn: new Date() },
      where: {
        id: userQuiz.id,
      },
    });

    const answersArray = userQuiz.answers as Prisma.JsonArray;
    answersArray.forEach((i) => {
      if (i && typeof i === "object" && !Array.isArray(i)) {
        const answerObject = i as Prisma.JsonObject;

        if (answerObject["isCorrect"] == true) correctAnswersCount += 1;
      }
    });

    const leaderboardEntry = await db.leaderboard.findFirst({
      where: {
        quizId: userQuiz.id,
        userId: user.id,
      },
      select: {
        id: true,
      },
    });

    if (leaderboardEntry === null) {
      const leaderboard = await db.leaderboard.create({
        data: {
          maxScore: userQuiz.totalQuestion,
          score: correctAnswersCount,
          quizId: userQuiz.quizId,
          userId: user.id,
        },
      });
      if (leaderboard) addedToLeaderboard = true;
    }
  }

  if (userQuiz == null)
    return (
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Whoops! 404</AlertTitle>
        <AlertDescription>
          We were not able to find the user quiz.
        </AlertDescription>
      </Alert>
    );

  const totalQuestionsCount = userQuiz.answers as Prisma.JsonArray;

  return (
    <DashboardShell>
      {addedToLeaderboard && (
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Score added to leaderboards!</AlertTitle>
          <AlertDescription>
            Your score was added to the leaderboard, you can retake the quiz but
            the leaderboard score will not be affected.
          </AlertDescription>
        </Alert>
      )}
      <div className="flex flex-row gap-4 justify-center">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total questions.
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalQuestionsCount.length.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              total number of questions.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Correct answers.
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={cn(
                "text-2xl font-bold",
                correctAnswersCount >= totalQuestionsCount.length / 2
                  ? "text-green-700"
                  : "text-red-600"
              )}
            >
              {correctAnswersCount}
            </div>
            <p className="text-xs text-muted-foreground">
              you answered {totalQuestionsCount.length - correctAnswersCount}{" "}
              incorrectly.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
