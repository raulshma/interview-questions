import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { DashboardShell } from "@/components/shell";
import { QuizItem } from "@/components/quiz-item";
import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { PrismaClient } from "@prisma/client";
import { LeaderboardGetType } from "@/types/prismaSchemaTypes";
import LeaderboardList from "@/components/leaderboard-list";

export const metadata = {
  title: "Leaderboard",
};

export default async function LeaderboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  const leaderboardEntries = await calculateAllUsersElo(db);

  return (
    <DashboardShell>
      <div>
        <div className="divide-y divide-border rounded-md border">
          {leaderboardEntries.length > 0 ? (
            <LeaderboardList entries={leaderboardEntries} />
          ) : (
            <EmptyPlaceholder>
              <EmptyPlaceholder.Icon name="post" />
              <EmptyPlaceholder.Title>
                Empty
              </EmptyPlaceholder.Title>
            </EmptyPlaceholder>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}

export interface UserRank {
  userId: string;
  rank: number | undefined;
  image: string | null | undefined;
  name: string | null | undefined;
}

async function calculateAllUsersElo(db: PrismaClient): Promise<UserRank[]> {
  // Retrieve all users from the database
  const users = await db.user.findMany();
  const leaderboards = await db.leaderboard.groupBy({
    by: ["userId"],
    _sum: {
      score: true,
      maxScore: true
    },
    orderBy: {
      _sum: {
        score: "desc",
      },
    },
    take: 10,
  });

  console.log(leaderboards);
  return leaderboards.map((item, index) => {
    const user = users.find((e) => e.id === item.userId);
    return {
      rank: index + 1,
      userId: item.userId,
      name: user?.name ?? user?.email,
      image: user?.image ?? "/images/avatars/01.png",
    };
  });
}
