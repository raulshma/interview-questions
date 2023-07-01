export const ApiPath = "/api/";
export const QuestionsPath = ApiPath + "questions";

export async function GET<T>(path: string, id: string) {
  const url = id ? `${path}/${id}` : path;

  const response = await fetch(url);
  if (response.ok) {
    return (await response.json()) as T;
  }
  throw new Error(response.statusText);
}
