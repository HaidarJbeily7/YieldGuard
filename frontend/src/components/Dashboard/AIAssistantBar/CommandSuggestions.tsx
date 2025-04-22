import { CommandButton } from "./CommandButton";

const commands: string[] = ["/ajuda", "/inventario", "/estatisticas", "/mapa"];

export function CommandSuggestions() {
  return (
    <div className="mt-2 flex gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-[#5271ff]/20 scrollbar-track-transparent">
      {commands.map((cmd) => (
        <CommandButton key={cmd} label={cmd} />
      ))}
    </div>
  );
}
