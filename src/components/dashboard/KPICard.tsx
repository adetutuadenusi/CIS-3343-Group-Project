import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

interface KPICardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  color: string;
  index?: number;
}

export function KPICard({ title, value, change, icon: Icon, color, index = 0 }: KPICardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card style={{ background: 'white', border: 'none', boxShadow: '0 2px 8px rgba(90, 56, 37, 0.1)' }}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '14px', color: '#999', marginBottom: '8px' }}>
                {title}
              </p>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '28px', fontWeight: 600, color: '#2B2B2B', marginBottom: '4px' }}>
                {value}
              </p>
              {change && (
                <p style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '14px', color: change.startsWith('+') ? '#10B981' : '#DC3545' }}>
                  {change}
                </p>
              )}
            </div>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '12px',
              background: `${color}15`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Icon size={28} color={color} />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
