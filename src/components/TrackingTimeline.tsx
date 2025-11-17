interface TrackingTimelineProps {
  stages: string[];
  currentStageIndex: number;
}

export default function TrackingTimeline({ stages, currentStageIndex }: TrackingTimelineProps) {
  return (
    <div className="space-y-4">
      {stages.map((stage, index) => {
        const isComplete = index < currentStageIndex;
        const isActive = index === currentStageIndex;

        return (
          <div key={index} className="flex items-start gap-4">
            {/* Dot indicator */}
            <div className="flex flex-col items-center">
              <div
                className={`w-4 h-4 rounded-full flex-shrink-0 ${
                  isComplete
                    ? 'bg-green-500'
                    : isActive
                    ? 'bg-raspberry-pink'
                    : 'bg-gray-300'
                }`}
              />
              {index < stages.length - 1 && (
                <div
                  className={`w-0.5 h-8 ${
                    isComplete ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>

            {/* Stage text */}
            <div className="flex-1 pb-2">
              <p
                className={`${
                  isComplete
                    ? 'text-green-600'
                    : isActive
                    ? 'text-raspberry-pink font-bold'
                    : 'text-gray-400'
                }`}
              >
                {stage}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
