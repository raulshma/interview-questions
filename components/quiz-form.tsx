"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { GET, QuestionsPath } from "@/lib/httpClient";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Terminal } from "lucide-react";
import { QuestionWithOptions } from "@/types/prismaSchemaTypes";

type QuestionId = {
  id: string;
};

interface QuizFormProps extends React.HTMLAttributes<HTMLDivElement> {
  quizId: string;
  questionIds: QuestionId[];
}
type OptionNumberType = {
  [id: number]: string;
};
const optionsMap: OptionNumberType = {
  0: "i.",
  1: "ii.",
  2: "iii.",
  3: "iv.",
};

export function QuizForm({
  className,
  quizId,
  questionIds,
  ...props
}: QuizFormProps) {
  const [usedQuestionIds, setUsedQuestionIds] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionWithOptions>();
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getQuestion();
  }, []);

  function getRandomId(questionIds: QuestionId[]) {
    const idArray = questionIds.map((element) => element.id);
    const randomIndex = Math.floor(Math.random() * idArray.length);
    const randomIdFromTable = idArray[randomIndex];
    return randomIdFromTable;
  }

  async function getQuestion() {
    setIsLoading(true);
    const randomQuestionId = getRandomId(questionIds);
    if (questionIds.length === usedQuestionIds.length) {
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

  function handleSelectionAnswer(optionId: string) {
    getQuestion();
    setCurrentQuestionNumber((prev) => prev + 1);
  }

  if (isLoading) return <div>Please wait while we load the questions.</div>;

  if (showResult)
    return (
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Quiz completed</AlertTitle>
        <AlertDescription>
          Total question answered {usedQuestionIds.length}
        </AlertDescription>
      </Alert>
    );

  if (currentQuestion == null)
    return (
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Whoops! 404</AlertTitle>
        <AlertDescription>
          We were not able to find the question.
        </AlertDescription>
      </Alert>
    );

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>
            {currentQuestionNumber}.&nbsp;{currentQuestion.text}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-white rounded-lg border border-gray-200 text-gray-900 text-sm font-medium">
            {currentQuestion.options.map((option, index) => {
              return (
                <div
                  onClick={() => {
                    handleSelectionAnswer(option.id);
                  }}
                  key={option.id}
                  className="block px-4 py-2 border-b border-gray-200 w-full hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 cursor-pointer"
                >
                  {optionsMap[index]}
                  &nbsp;
                  {option.text}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
