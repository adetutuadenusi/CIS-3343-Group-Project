import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

interface QuickAction {
  label: string;
  icon: LucideIcon;
  color: string;
  onClick: () => void;
}

interface QuickActionCardProps {
  title: string;
  actions: QuickAction[];
}

export function QuickActionCard({ title, actions }: QuickActionCardProps) {
  return (
    <Card style={{ background: 'white', border: 'none', boxShadow: '0 2px 8px rgba(90, 56, 37, 0.1)' }}>
      <div className="p-6">
        <h3 style={{ 
          fontFamily: 'Poppins, sans-serif', 
          fontSize: '18px', 
          fontWeight: 600, 
          color: '#2B2B2B',
          marginBottom: '16px'
        }}>
          {title}
        </h3>

        <div className="grid grid-cols-1 gap-3">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  onClick={action.onClick}
                  className="w-full justify-start gap-3 h-auto py-3"
                  style={{
                    background: `${action.color}10`,
                    border: `1px solid ${action.color}30`,
                    color: action.color
                  }}
                >
                  <Icon size={20} />
                  <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '14px', fontWeight: 500 }}>
                    {action.label}
                  </span>
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
