export const ApiPath = "/api/";
export const QuestionsPath = ApiPath + "questions";
export const QuestionAnswerPath = QuestionsPath + "/answer";
export const UserQuizPath = ApiPath + "user-quiz";
export const UserQuizResultPath = UserQuizPath + "/result";

export async function GET<T>(path: string, id: string, host?: string | null) {
  let url = id ? `${path}/${id}` : path;
  if (host) {
    url = `https://${host}${url}`;
    if (process.env.NODE_ENV === "development") {
      url = url.replace("https", "http");
    }
  }
  console.log(url);
  const response = await fetch(url, { next: { revalidate: 10 } });
  if (response.ok) {
    return (await response.json()) as T;
  }
  throw new Error(response.statusText);
}

export async function POST<K, T>(path: string, body: T) {
  const response = await fetch(path, {
    method: "POST",
    body: JSON.stringify(body),
  });
  if (response.ok) return (await response.json()) as K;
  throw new Error(response.statusText);
}
