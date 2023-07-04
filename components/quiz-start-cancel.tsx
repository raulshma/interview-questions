"use client";

import { useRouter } from "next/navigation";
import { AlertDialogCancel } from "./ui/alert-dialog";

export default function QuizStartCancelAction() {
  const router = useRouter();
  return (
    <AlertDialogCancel onClick={() => router.back()}>Cancel</AlertDialogCancel>
  );
}
