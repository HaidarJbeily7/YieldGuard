import { useNavigate } from "react-router-dom";

const CloseReportButton = () => {
  const navigate = useNavigate();
  return (
    <button
      className="relative border-2 pb-1 border-white group hover:border-main w-8 h-8 duration-500 overflow-hidden"
      type="button"
      onClick={() => navigate(-1)}
    >
      <p className="font-Manrope text-3xl h-full w-full flex items-center justify-center text-white duration-500 relative z-10 group-hover:scale-0">
        ×
      </p>
      <span className="absolute w-full h-full bg-main rotate-45 group-hover:top-6 duration-500 top-9 left-0" />
      <span className="absolute w-full h-full bg-main rotate-45 top-0 group-hover:left-6 duration-500 left-9" />
      <span className="absolute w-full h-full bg-main rotate-45 top-0 group-hover:right-6 duration-500 right-9" />
      <span className="absolute w-full h-full bg-main rotate-45 group-hover:bottom-6 duration-500 bottom-9 right-0" />
    </button>
  );
};

export default CloseReportButton;
