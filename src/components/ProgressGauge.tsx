export default function ProgressGauge({ progress = 72 }: { progress?: number }) {
  const radius = 50;
  const circumference = Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg width="160" height="100" viewBox="0 0 120 70">
        <path d="M 10 60 A 50 50 0 0 1 110 60" fill="transparent" stroke="#E6EEF5" strokeWidth="10" />
        <path
          d="M 10 60 A 50 50 0 0 1 110 60"
          fill="transparent"
          stroke="#16A34A"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.8s ease" }}
        />
      </svg>
      <div className="mt-3 text-sm text-slate-600">{progress}% Completed</div>
    </div>
  );
}
