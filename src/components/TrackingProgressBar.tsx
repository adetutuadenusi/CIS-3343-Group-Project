interface TrackingProgressBarProps {
  currentStageIndex: number;
  totalStages: number;
}

export function TrackingProgressBar({ currentStageIndex, totalStages }: TrackingProgressBarProps) {
  const progressPercentage = ((currentStageIndex + 1) / totalStages) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
      <div
        className="h-full bg-raspberry-pink rounded-full"
        style={{ width: `${progressPercentage}%` }}
      />
    </div>
  );
}
