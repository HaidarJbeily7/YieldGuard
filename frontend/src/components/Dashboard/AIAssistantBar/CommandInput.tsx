export function CommandInput() {
    return (
      <div className="flex items-center gap-3">
        <span className="text-[#3bc8bd] text-lg sm:text-xl animate-pulse">{'>'}</span>
        <input
          type="text"
          className="flex-1 bg-transparent border-none text-white focus:outline-none text-base sm:text-lg placeholder-neutral-500 focus:placeholder-neutral-600"
          placeholder="Digite seu comando..."
          aria-label="Entrada de comando"
        />
        <span className="text-[#3bc8bd] text-lg sm:text-xl font-mono animate-terminal-blink">|</span>
      </div>
    );
  }
  