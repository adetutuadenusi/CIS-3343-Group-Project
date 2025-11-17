import { motion } from 'motion/react';

export function RushBadge() {
  return (
    <motion.span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        background: '#FEE2E2',
        color: '#991B1B',
        border: '2px solid #EF4444',
        borderRadius: '6px',
        padding: '4px 8px',
        fontFamily: 'Poppins, sans-serif',
        fontSize: '11px',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        lineHeight: 1
      }}
      animate={{
        scale: [1, 1.05, 1]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
      aria-label="Rush order - high priority"
    >
      🔥 RUSH
    </motion.span>
  );
}
