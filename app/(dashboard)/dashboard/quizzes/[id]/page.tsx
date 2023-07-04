import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { DashboardShell } from "@/components/shell";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export const metadata = {
  title: "Quiz",
};

export type QuizPageParams = {
  params: { id: string };
};

export default async function QuizPage({ params }: QuizPageParams) {
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

  if (!quiz) {
    return (
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Whoops! 404</AlertTitle>
        <AlertDescription>We were not able to find the quiz.</AlertDescription>
      </Alert>
    );
  }

  return (
    <DashboardShell>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>{quiz.title}</CardTitle>
            <CardDescription>
              {quiz.description}{" "}
              <Badge variant="default">
                <Link href={`/dashboard/quizzes/start/${quiz.id}`}>
                  Take this quiz now
                </Link>
              </Badge>
            </CardDescription>
          </CardHeader>
          {quiz.validFrom && (
            <CardContent className="font-mono text-sm">
              <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                {quiz.validFrom < new Date() ? "Started" : "Starts"} -{" "}
                <span>{quiz.validFrom.toLocaleString()}</span>
              </code>
              {quiz.validTo && (
                <p className="text-sm text-muted-foreground">
                  {quiz.validTo < new Date() ? "Ended" : "Ends"} -{" "}
                  <span>{quiz.validTo.toLocaleString()}</span>
                </p>
              )}
            </CardContent>
          )}
          <CardFooter className="font-mono font-thin text-xs block">
            <p className="text-sm text-muted-foreground">
              Created - <span>{quiz.createdAt.toLocaleDateString()}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Last update - <span>{quiz.updatedAt.toLocaleDateString()}</span>
            </p>
          </CardFooter>
        </Card>
      </div>
    </DashboardShell>
  );
}
