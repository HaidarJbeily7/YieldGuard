import { FiCalendar } from "react-icons/fi";
import dayjs from "dayjs";

export const TopBar = () => {
  const username = "Tom";
  const greetingText = "Good morning";
  const todayDate = dayjs().format("dddd, MMM D YYYY");
  const buttonLabel = "Prev 6 Months";

  return (
    <div className="border-b px-4 mb-4 mt-2 pb-4  border-gray-600">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div>
          <span className="text-sm font-bold block">
             {greetingText}, {username}!
          </span>
          <span className="text-xs block text-stone-500">{todayDate}</span>
        </div>

        <button className="flex text-sm items-center gap-2 bg-main-light20 text-main-dark40 transition-colors hover:bg-main-light30 hover:text-main-dark20 px-3 py-1.5 rounded">
          <FiCalendar />
          <span>{buttonLabel}</span>
        </button>
      </div>
    </div>
  );
};