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
    const { params } = routeContextSchema.parse(context);

    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const question = await db.question.findFirst({
      select: questionWithOptions.select,
      where: {
        id: params.questionId,
      },
    });

    return new Response(JSON.stringify(question));
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}

// export async function POST(req: Request) {
//   try {
//     const session = await getServerSession(authOptions);

//     if (!session) {
//       return new Response("Unauthorized", { status: 403 });
//     }

//     const { user } = session;
//     const subscriptionPlan = await getUserSubscriptionPlan(user.id);

//     // If user is on a free plan.
//     // Check if user has reached limit of 3 posts.
//     if (!subscriptionPlan?.isPro) {
//       const count = await db.post.count({
//         where: {
//           authorId: user.id,
//         },
//       });

//       if (count >= 3) {
//         throw new RequiresProPlanError();
//       }
//     }

//     const json = await req.json();
//     const body = postCreateSchema.parse(json);

//     const post = await db.post.create({
//       data: {
//         title: body.title,
//         content: body.content,
//         authorId: session.user.id,
//       },
//       select: {
//         id: true,
//       },
//     });

//     return new Response(JSON.stringify(post));
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return new Response(JSON.stringify(error.issues), { status: 422 });
//     }

//     return new Response(null, { status: 500 });
//   }
// }
