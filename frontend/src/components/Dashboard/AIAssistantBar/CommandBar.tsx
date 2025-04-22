import { CommandInput } from "./CommandInput";
import { CommandSuggestions } from "./CommandSuggestions";

export function CommandBar() {
  return (
    <div className=" z-[1000] sticky bottom-0 left-0 right-0 mt-4 sm:mt-6   p-2 sm:p-3  ">
      <div className="max-w-5xl mx-auto">
        <div className="bg-neutral-900/90 backdrop-blur border-2 border-[#3bc8bd]/30 rounded-lg p-3 sm:p-4 shadow-[0_0_15px_rgba(82,113,255,0.15)]">
          <CommandInput />
          <CommandSuggestions />
        </div>
      </div>
    </div>
  );
}
