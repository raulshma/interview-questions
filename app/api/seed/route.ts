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
    const dotnetQuiz = await db.quiz.create({
      data: {
        title: ".net",
        description:
          "Dot Net is an open-source, cross-platform framework for developing and running applications. The frameworks provide a comprehensive set of tools, libraries, and services that make it easy to create robust solutions that work on both Windows and Mac computers. Dot Net also allows developers to share code between different programs, making it a powerful tool for collaboration.",
        validFrom: new Date(),
      },
    });

    const dotnetQuizId = dotnetQuiz.id;

    await db.question.create({
      data: {
        text: "CLR is the .NET equivalent of?",
        quizId: dotnetQuizId,
        options: {
          createMany: {
            data: [
              {
                text: "Java Virtual Machine",
                isAnswer: true,
              },
              {
                text: "Common Language Runtime",
              },
              {
                text: "Common Type System",
              },
              {
                text: "Common Language Specification",
              },
            ],
          },
        },
      },
    });
    await db.question.create({
      data: {
        text: "SOAP stands for?",
        quizId: dotnetQuizId,
        options: {
          createMany: {
            data: [
              {
                text: "Simple Object Access Program",
              },
              {
                text: "Simple Object Access Protocol",
                isAnswer: true,
              },
              {
                text: "Simple Object Application Protocol",
              },
              {
                text: "Simple Object Account Protocol",
              },
            ],
          },
        },
      },
    });
    await db.question.create({
      data: {
        text: "UDDI stands for?",
        quizId: dotnetQuizId,
        options: {
          createMany: {
            data: [
              {
                text: "Universal data description & integration",
              },
              {
                text: "Universal datagram description implementations",
              },
              {
                text: "Universal description discover and integration",
                isAnswer: true,
              },
              {
                text: "Universal description data & integration",
              },
            ],
          },
        },
      },
    });
    await db.question.create({
      data: {
        text: "In C#, all binary operators are?",
        quizId: dotnetQuizId,
        options: {
          createMany: {
            data: [
              {
                text: "Center-associative",
              },
              {
                text: "Right-associative",
                isAnswer: true,
              },
              {
                text: "Left-associative",
              },
              {
                text: "Top-associative",
              },
            ],
          },
        },
      },
    });
    await db.question.create({
      data: {
        text: "WSDL stands for?",
        quizId: dotnetQuizId,
        options: {
          createMany: {
            data: [
              {
                text: "Web system data limited",
              },
              {
                text: "Web service development",
              },
              {
                text: "Web service description",
                isAnswer: true,
              },
              {
                text: "World system development",
              },
            ],
          },
        },
      },
    });
    await db.question.create({
      data: {
        text: "Which of the following utilities can be used to compile managed assemblies into processor-specific native code?",
        quizId: dotnetQuizId,
        options: {
          createMany: {
            data: [
              {
                text: "gacutil",
              },
              {
                text: "ngen",
                isAnswer: true,
              },
              {
                text: "sn",
              },
              {
                text: "dumpbin",
              },
            ],
          },
        },
      },
    });
    await db.question.create({
      data: {
        text: `Which of the following are NOT true about .NET Framework?
        1 - It provides a consistent object-oriented programming environment whether object code is stored and executed locally, executed locally but Internet-distributed, or executed remotely.
        2 - It provides a code-execution environment that minimizes software deployment and versioning conflicts.
        3 - It provides a code-execution environment that promotes safe execution of code, including code created by an unknown or semi-trusted third party.
        4 - It provides different programming models for Windows-based applications and Web-based applications.
        5 - It provides an event driven programming model for building Windows Device Drivers.`,
        quizId: dotnetQuizId,
        options: {
          createMany: {
            data: [
              {
                text: "1, 2",
              },
              {
                text: "2, 4",
              },
              {
                text: "4, 5",
                isAnswer: true,
              },
              {
                text: "1, 2, 4",
              },
            ],
          },
        },
      },
    });
    await db.question.create({
      data: {
        text: `Which of the following components of the .NET framework provide an extensible set of classes that can be used by any .NET compliant programming language?`,
        quizId: dotnetQuizId,
        options: {
          createMany: {
            data: [
              {
                text: ".NET class libraries",
                isAnswer: true,
              },
              {
                text: "Common Language Runtime",
              },
              {
                text: "Common Language Infrastructure",
              },
              {
                text: "Common Type System",
              },
            ],
          },
        },
      },
    });
    await db.question.create({
      data: {
        text: `Which of the following .NET components can be used to remove unused references from the managed heap?`,
        quizId: dotnetQuizId,
        options: {
          createMany: {
            data: [
              {
                text: "Common Language Infrastructure",
              },
              {
                text: "CLR",
              },
              {
                text: "Garbage Collector",
                isAnswer: true,
              },
              {
                text: "Class Loader",
              },
            ],
          },
        },
      },
    });
    await db.question.create({
      data: {
        text: `Which of the following statements correctly define .NET Framework?`,
        quizId: dotnetQuizId,
        options: {
          createMany: {
            data: [
              {
                text: "It is an environment for developing, building, deploying and executing Desktop Applications, Web Applications and Web Services.",
                isAnswer: true,
              },
              {
                text: "It is an environment for developing, building, deploying and executing only Web Applications.",
              },
              {
                text: "It is an environment for developing, building, deploying and executing Distributed Applications.",
              },
              {
                text: "It is an environment for developing, building, deploying and executing Web Services.",
              },
            ],
          },
        },
      },
    });
    await db.question.create({
      data: {
        text: `Code that targets the Common Language Runtime is known as`,
        quizId: dotnetQuizId,
        options: {
          createMany: {
            data: [
              {
                text: "Unmanaged",
              },
              {
                text: "Distributed",
              },
              {
                text: "Native Code",
              },
              {
                text: "Managed Code",
                isAnswer: true,
              },
            ],
          },
        },
      },
    });
    await db.question.create({
      data: {
        text: `Which of the following statements is correct about the .NET Framework?`,
        quizId: dotnetQuizId,
        options: {
          createMany: {
            data: [
              {
                text: ".NET Framework uses DCOM for achieving language interoperability.",
              },
              {
                text: ".NET Framework is built on the DCOM technology.",
              },
              {
                text: ".NET Framework uses DCOM for making transition between managed and unmanaged code.",
                isAnswer: true,
              },
              {
                text: ".NET Framework uses DCOM for creating unmanaged applications.",
              },
            ],
          },
        },
      },
    });
    await db.question.create({
      data: {
        text: `Which of the following is the root of the .NET type hierarchy?`,
        quizId: dotnetQuizId,
        options: {
          createMany: {
            data: [
              {
                text: "System.Object",
                isAnswer: true,
              },
              {
                text: "System.Type",
              },
              {
                text: "System.Base",
              },
              {
                text: "System.Root",
              },
            ],
          },
        },
      },
    });
    await db.question.create({
      data: {
        text: `Which of the following is the root of the .NET type hierarchy?`,
        quizId: dotnetQuizId,
        options: {
          createMany: {
            data: [
              {
                text: "System.Object",
                isAnswer: true,
              },
              {
                text: "System.Type",
              },
              {
                text: "System.Base",
              },
              {
                text: "System.Root",
              },
            ],
          },
        },
      },
    });

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
