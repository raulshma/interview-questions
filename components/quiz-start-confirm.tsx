"use client";

import { useRouter } from "next/navigation";
import { AlertDialogAction, AlertDialogCancel } from "./ui/alert-dialog";

type QuizStartConfirmActionProps = {
  id?: string;
  path: string;
};

export default function QuizStartConfirmAction({
  id,
  path,
}: QuizStartConfirmActionProps) {
  const router = useRouter();
  return (
    <AlertDialogAction
      onClick={() => router.push(`${path}${id ? "/" + id : ""}`)}
    >
      Continue
    </AlertDialogAction>
  );
}
