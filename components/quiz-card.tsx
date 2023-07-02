type OptionNumberType = {
  [id: number]: string;
};
const optionsMap: OptionNumberType = {
  0: "i.",
  1: "ii.",
  2: "iii.",
  3: "iv.",
};

interface QuizCardProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  itemNumber: number;
}

export default function QuizCard({
  text,
  itemNumber,
  ...props
}: QuizCardProps) {
  return (
    <div
      className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-tl-lg md:border-r dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 cursor-pointer"
      {...props}
    >
      {optionsMap[itemNumber]}&nbsp;{text}
    </div>
  );
}
