import { getServerSession } from "next-auth/next";
import * as z from "zod";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

const resultCheckSchema = z.object({
  params: z.object({
    userQuizId: z.string(),
  }),
});

export async function GET(
  req: Request,
  context: z.infer<typeof resultCheckSchema>
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }
    const userId = session.user.id;

    const { params } = resultCheckSchema.parse(context);

    const userQuiz = await db.userQuiz.findFirst({
      where: {
        id: params.userQuizId,
        userId: userId,
      },
      select: {
        answers: true,
      },
    });

    if (userQuiz !== null) {
      const answersArray = userQuiz.answers as Prisma.JsonArray;
      let correctAnswers = 0;
      answersArray.forEach((i) => {
        if (i && typeof i === "object" && !Array.isArray(i)) {
          const answerObject = i as Prisma.JsonObject;

          if (answerObject["isCorrect"] == true) correctAnswers += 1;
        }
      });

      return new Response(JSON.stringify(correctAnswers));
    }
    return new Response(JSON.stringify(-1), { status: 422 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
