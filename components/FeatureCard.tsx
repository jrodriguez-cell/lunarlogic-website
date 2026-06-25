interface FeatureCardProps {
  iconPath: string;
  title: string;
  description: string;
}

export default function FeatureCard({ iconPath, title, description }: FeatureCardProps) {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-blue-500/50 transition-all hover:-translate-y-0.5">
      <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
        <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
        </svg>
      </div>
      <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
    </div>
  );
}
