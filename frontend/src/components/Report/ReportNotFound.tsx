import NotFoundBG from "./NotFoundBG";
import NotFoundButton from "./NotFoundButton";

const ReportNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <h1 className="text-2xl font-bold">404</h1>
      <h2 className="text-2xl font-bold">Report Not Found</h2>
      <NotFoundButton />
      <NotFoundBG />
    </div>
  );
};

export default ReportNotFound;
