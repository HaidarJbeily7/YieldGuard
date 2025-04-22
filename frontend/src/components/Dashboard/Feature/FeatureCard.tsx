type FeatureCardProps = {
  title: string;
  description: string;
};

export function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="bg-neutral-900 p-6 rounded-2xl border border-main/20 shadow-md hover:shadow-[0_0_10px_#3bc8bd] transition-all duration-300 hover:border-main/40 animate-fade-in">
      <h3 className="text-xl font-semibold text-main mb-2">{title}</h3>
      <p className="text-sm text-neutral-300">{description}</p>
    </div>
  );
}
