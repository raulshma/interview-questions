import { Prisma } from "@prisma/client";

export const questionWithOptions = Prisma.validator<Prisma.QuestionArgs>()({
  select: {
    id: true,
    options: {
      select: {
        id: true,
        text: true,
        type: true,
      },
    },
    createdAt: true,
    updatedAt: true,
    text: true,
  },
});
export type QuestionWithOptions = Prisma.QuestionGetPayload<
  typeof questionWithOptions
>;
