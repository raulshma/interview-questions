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

  if (!quiz) {
    return (
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Whoops! 404</AlertTitle>
        <AlertDescription>We were not able to find the quiz.</AlertDescription>
      </Alert>
    );
  }

  return <DashboardShell>404</DashboardShell>;
}
