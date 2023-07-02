"use client";

import * as React from "react";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  QuestionAnswerPath,
  GET,
  POST,
  QuestionsPath,
  UserQuizResultPath,
} from "@/lib/httpClient";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Terminal } from "lucide-react";
import { QuestionWithOptions } from "@/types/prismaSchemaTypes";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import QuizCard from "./quiz-card";
import { Skeleton } from "./ui/skeleton";
import { AnswerCheckRequest } from "@/app/api/questions/answer/route";
import { toast } from "./ui/use-toast";
import { Badge } from "./ui/badge";

const emptyArray = [1, 2, 3, 4];

type QuestionId = {
  id: string;
};

interface QuizFormProps extends React.HTMLAttributes<HTMLDivElement> {
  quizId: string;
  userQuizId: string;
  questionIds: QuestionId[];
}

export function QuizForm({
  className,
  quizId,
  userQuizId,
  questionIds,
  ...props
}: QuizFormProps) {
  const [usedQuestionIds, setUsedQuestionIds] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionWithOptions>();
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
  const [showResult, setShowResult] = useState(false);
  const [quizResult, setQuizResult] = useState<number>(-2);
  const [isLoading, setIsLoading] = useState(true);

  const [parent] = useAutoAnimate({
    duration: 469,
    easing: "ease-in-out",
    disrespectUserMotionPreference: false,
  });

  useEffect(() => {
    setIsLoading(true);
    getQuestion();
  }, []);

  function getRandomId(questionIds: QuestionId[]) {
    const idArray = questionIds.map((element) => element.id);
    const randomIndex = Math.floor(Math.random() * idArray.length);
    const randomIdFromTable = idArray[randomIndex];
    return randomIdFromTable;
  }

  async function getQuestion() {
    const randomQuestionId = getRandomId(questionIds);
    if (questionIds.length === usedQuestionIds.length) {
      await getResult(userQuizId);
      setShowResult(true);
      return setIsLoading(false);
    }
    if (usedQuestionIds.includes(randomQuestionId)) {
      return getQuestion();
    } else {
      setUsedQuestionIds((prev) => {
        return [...prev, randomQuestionId];
      });
    }
    const result = await GET<QuestionWithOptions>(
      `${QuestionsPath}/random`,
      randomQuestionId
    );
    setCurrentQuestion(result);
    setIsLoading(false);
  }

  async function handleSelectionAnswer(optionId: string) {
    setIsLoading(true);
    const hasSaved = await saveAnswer(optionId);
    if (hasSaved) {
      await getQuestion();
      setCurrentQuestionNumber((prev) => prev + 1);
    } else {
      return toast({
        title: "Something went wrong.",
        description: "Your answer was not processed. Please try again.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  }

  async function saveAnswer(optionId: string) {
    const questionId = currentQuestion?.id;
    if (questionId === undefined) throw new Error("Hmmm!");
    const request: AnswerCheckRequest = {
      optionId,
      questionId,
      quizId,
      userQuizId,
    };
    const result = await POST<Boolean, AnswerCheckRequest>(
      QuestionAnswerPath,
      request
    );
    return result;
  }

  async function getResult(userQuizId: string) {
    const result = await GET<number>(UserQuizResultPath, userQuizId);
    if (!isNaN(result) && result != -1) {
      setQuizResult(result);
    } else {
      setQuizResult(-2);
      return toast({
        title: "Something went wrong.",
        description: "Failed to fetch the quiz result. Please try again.",
        variant: "destructive",
      });
    }
  }

  if (showResult)
    return (
      <Alert className="transition-all duration-500">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Quiz completed</AlertTitle>
        <AlertDescription>
          <blockquote className="mt-6 border-l-2 pl-6 italic">
            Total question answered {usedQuestionIds.length}
          </blockquote>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            {quizResult >= 0 && (
              <>
                You answered <Badge>{quizResult}</Badge> questions correctly.
              </>
            )}
          </p>
        </AlertDescription>
      </Alert>
    );

  return (
    <Card className="w-full border-none shadow-none outline-none" ref={parent}>
      <CardHeader>
        <CardTitle ref={parent}>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full md:w-1/2" />
            </div>
          ) : (
            <span>
              {currentQuestionNumber}.&nbsp;{currentQuestion?.text}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          ref={parent}
          className="grid mb-1 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 md:mb-12 md:grid-cols-2"
        >
          {isLoading
            ? emptyArray.map((i) => (
                <div
                  className="flex flex-col space-y-2 items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-tl-lg md:border-r dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100"
                  key={i}
                >
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              ))
            : currentQuestion?.options.map((option, index) => {
                return (
                  <QuizCard
                    key={option.id}
                    onClick={() => handleSelectionAnswer(option.id)}
                    text={option.text}
                    itemNumber={index}
                  />
                );
              })}
        </div>
      </CardContent>
    </Card>
  );
}
