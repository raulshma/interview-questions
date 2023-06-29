import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { DashboardShell } from "@/components/shell";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
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
      <div className="flex flex-col gap-5 justify-center align-middle items-center text-center text-lg">
        <Link href="/dashboard/quizzes" className="w-full md:w-1/2 lg:w-1/3">
          Quizzes
        </Link>
        <Link
          href="/dashboard/leaderboard"
          className="w-full md:w-1/2 lg:w-1/3"
        >
          Leaderboards
        </Link>
      </div>
    </DashboardShell>
  );
}
