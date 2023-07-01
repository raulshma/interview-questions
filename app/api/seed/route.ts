import { getServerSession } from "next-auth/next";
import * as z from "zod";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { questionWithOptions } from "@/types/prismaSchemaTypes";

const routeContextSchema = z.object({
  params: z.object({
    questionId: z.string(),
  }),
});

export async function GET(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // Validate the route params.
    // await db.question.create({
    //   data: {
    //     text: "How many Bytes are stored by ‘Long’ Data type in C# .net?",
    //     quizId: "cljg24cum0000wwv8sy1au7iv",
    //     options: {
    //       createMany: {
    //         data: [
    //           {
    //             text: "8",
    //             isAnswer: true,
    //             explanation:
    //               " ‘Long’ is the data type keyword used for storing data of unlimited length so by definition its size is always maximum i.e 8",
    //           },
    //           {
    //             text: "4",
    //           },
    //           {
    //             text: "2",
    //           },
    //           {
    //             text: "1",
    //           },
    //         ],
    //       },
    //     },
    //   },
    // });
    // await db.question.create({
    //   data: {
    //     text: "Choose “.NET class” name from which data type “UInt” is derived?",
    //     quizId: "cljg24cum0000wwv8sy1au7iv",
    //     options: {
    //       createMany: {
    //         data: [
    //           {
    //             text: "System.Int16",
    //           },
    //           {
    //             text: "System.UInt32",
    //             isAnswer: true,
    //           },
    //           {
    //             text: "System.UInt64",
    //           },
    //           {
    //             text: "System.UInt16",
    //           },
    //         ],
    //       },
    //     },
    //   },
    // });

    return new Response("ok");
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}
