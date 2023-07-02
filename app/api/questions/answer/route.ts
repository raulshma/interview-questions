import { getServerSession } from "next-auth/next";
import * as z from "zod";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

const answerCheckSchema = z.object({
  questionId: z.string(),
  optionId: z.string(),
  userQuizId: z.string(),
  quizId: z.string(),
});

export type AnswerCheckRequest = z.infer<typeof answerCheckSchema>;

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }
    const userId = session.user.id;
    const json = await req.json();
    const body = answerCheckSchema.parse(json);

    //fetch the user quiz and its answers
    const userQuiz = await db.userQuiz.findFirst({
      select: {
        id: true,
        answers: true,
      },
      where: {
        id: body.userQuizId,
        quizId: body.quizId,
        userId: userId,
      },
    });

    if (userQuiz !== null) {
      const answers = userQuiz.answers as Prisma.JsonArray;

      //check answer
      const answer = await db.option.findFirst({
        where: {
          id: body.optionId,
        },
        select: {
          isAnswer: true,
        },
      });
      if (answer !== null) {
        let answerAlreadyExistsAndUpdated = false;
        //check if the array already contains the answer for the option if it does then update it.
        answers.forEach((i) => {
          if (i && typeof i === "object" && !Array.isArray(i)) {
            const answerObject = i as Prisma.JsonObject;

            if (answerObject["questionId"] == body.questionId) {
              answerObject["isCorrect"] = answer.isAnswer;
              answerObject["optionId"] = body.optionId;
              answerAlreadyExistsAndUpdated = true;
            }
          }
        });
        //push new answer if not already exists
        if (!answerAlreadyExistsAndUpdated)
          answers.push({
            questionId: body.questionId,
            optionId: body.optionId,
            isCorrect: answer.isAnswer,
          });

        const whereClause = Prisma.validator<Prisma.UserQuizWhereInput>()({
          id: userQuiz.id,
        });

        const dataClause = Prisma.validator<Prisma.UserQuizUpdateInput>()({
          answers: answers,
        });
        //update the record with updated answers array
        const updatedUserQuiz = await db.userQuiz.update({
          where: whereClause,
          data: dataClause,
        });

        if (updatedUserQuiz !== null) return new Response(JSON.stringify(true));
      }
      return new Response(JSON.stringify(false), { status: 202 });
    }

    return new Response(JSON.stringify(false), { status: 202 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
