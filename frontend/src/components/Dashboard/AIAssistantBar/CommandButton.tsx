type CommandButtonProps = {
    label: string;
  };
  
  export function CommandButton({ label }: CommandButtonProps) {
    return (
      <button className="px-2 py-1 bg-neutral-800/50 rounded text-xs text-neutral-400 hover:text-white hover:bg-[#5271ff]/20 whitespace-nowrap transition-colors">
        {label}
      </button>
    );
  }
  