import { UserRank } from "@/app/(dashboard)/dashboard/leaderboard/page";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";

type LeaderboardListPage = {
  entries: UserRank[];
};

export default function LeaderboardList({ entries }: LeaderboardListPage) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Leaderboards</CardTitle>
        <CardDescription>
          Score well in quizzes and get your name listed here.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {entries.length > 0 &&
          entries.map((entry) => (
            <div
              key={entry.userId}
              className="flex items-center justify-between space-x-4"
            >
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={entry.image ?? "/images/avatars/01.png"} />
                  <AvatarFallback>
                    {entry.name?.replace(/\b\w/g, (char) => char.toUpperCase())}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">
                    {entry.name}
                  </p>
                  <p className="text-lg font-bold text-muted-foreground">
                    <Badge>{entry.rank}</Badge>
                  </p>
                </div>
              </div>
            </div>
          ))}
      </CardContent>
    </Card>
  );
}
