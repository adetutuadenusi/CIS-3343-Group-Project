// Enhancement #3: Order timeline with progress milestones

import { Check, Clock, Package, Truck, CheckCircle2 } from 'lucide-react';

interface TimelineStep {
  status: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}

interface OrderTimelineProps {
  currentStatus: string;
}

const TIMELINE_STEPS: TimelineStep[] = [
  {
    status: 'pending',
    label: 'Order Placed',
    icon: <Clock size={16} />,
    color: '#F59E0B'
  },
  {
    status: 'preparing',
    label: 'Baking',
    icon: <Package size={16} />,
    color: '#3B82F6'
  },
  {
    status: 'ready',
    label: 'Ready',
    icon: <Truck size={16} />,
    color: '#10B981'
  },
  {
    status: 'completed',
    label: 'Completed',
    icon: <CheckCircle2 size={16} />,
    color: '#22C55E'
  }
];

export function OrderTimeline({ currentStatus }: OrderTimelineProps) {
  const currentIndex = TIMELINE_STEPS.findIndex(step => step.status === currentStatus);
  
  // Handle cancelled status
  if (currentStatus === 'cancelled') {
    return (
      <div className="p-4 rounded-lg" style={{ backgroundColor: '#EF444410', border: '1px solid #EF444430' }}>
        <p style={{ fontFamily: 'Poppins', fontSize: '14px', color: '#EF4444', fontWeight: 500, textAlign: 'center' }}>
          Order Cancelled
        </p>
      </div>
    );
  }

  return (
    <div className="py-4">
      <div className="relative">
        {/* Progress Bar Background */}
        <div className="absolute top-6 left-0 right-0 h-0.5" style={{ backgroundColor: 'rgba(196, 69, 105, 0.2)' }} />
        
        {/* Progress Bar Fill */}
        <div 
          className="absolute top-6 left-0 h-0.5 transition-all duration-500"
          style={{ 
            backgroundColor: '#C44569',
            width: `${(currentIndex / (TIMELINE_STEPS.length - 1)) * 100}%`
          }}
        />

        {/* Timeline Steps */}
        <div className="relative flex justify-between">
          {TIMELINE_STEPS.map((step, index) => {
            const isCompleted = index <= currentIndex;
            const isCurrent = index === currentIndex;

            return (
              <div key={step.status} className="flex flex-col items-center">
                {/* Step Circle */}
                <div
                  className="relative z-10 flex items-center justify-center rounded-full transition-all duration-300"
                  style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: isCompleted ? step.color : 'white',
                    border: `3px solid ${isCompleted ? step.color : 'rgba(196, 69, 105, 0.2)'}`,
                    boxShadow: isCurrent ? `0 4px 12px ${step.color}40` : 'none',
                    transform: isCurrent ? 'scale(1.1)' : 'scale(1)'
                  }}
                >
                  <div style={{ color: isCompleted ? 'white' : step.color }}>
                    {isCompleted && !isCurrent ? <Check size={20} strokeWidth={3} /> : step.icon}
                  </div>
                </div>

                {/* Step Label */}
                <p
                  className="mt-2 text-center"
                  style={{
                    fontFamily: 'Poppins',
                    fontSize: '12px',
                    fontWeight: isCurrent ? 600 : 500,
                    color: isCompleted ? step.color : '#5A3825',
                    opacity: isCompleted ? 1 : 0.5
                  }}
                >
                  {step.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
