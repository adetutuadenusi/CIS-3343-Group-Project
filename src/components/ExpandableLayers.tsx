// Enhancement #21: Expandable/collapsible cake layer details

import { useState } from 'react';
import { ChevronDown, ChevronUp, Layers } from 'lucide-react';
import type { CakeLayer } from '../../shared/schema';

interface ExpandableLayersProps {
  layers: CakeLayer[];
}

export function ExpandableLayers({ layers }: ExpandableLayersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!layers || layers.length === 0) {
    return (
      <p style={{ fontFamily: 'Open Sans', fontSize: '14px', color: '#5A3825', opacity: 0.7 }}>
        No custom layers
      </p>
    );
  }

  return (
    <div>
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-opacity-80 transition-all"
        style={{ 
          backgroundColor: 'rgba(196, 69, 105, 0.08)',
          border: '1px solid rgba(196, 69, 105, 0.15)'
        }}
      >
        <div className="flex items-center gap-2">
          <Layers size={16} color="#C44569" />
          <span style={{ 
            fontFamily: 'Poppins', 
            fontSize: '14px', 
            fontWeight: 600, 
            color: '#2B2B2B' 
          }}>
            {layers.length} Custom {layers.length === 1 ? 'Layer' : 'Layers'}
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp size={18} color="#C44569" />
        ) : (
          <ChevronDown size={18} color="#C44569" />
        )}
      </button>

      {/* Expanded Layer Details */}
      {isExpanded && (
        <div className="mt-2 space-y-2">
          {layers.map((layer, idx) => (
            <div
              key={idx}
              className="p-3 rounded-lg"
              style={{ 
                backgroundColor: 'rgba(90, 56, 37, 0.04)',
                border: '1px solid rgba(90, 56, 37, 0.1)'
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <p style={{ 
                  fontFamily: 'Poppins', 
                  fontWeight: 600, 
                  fontSize: '13px', 
                  color: '#C44569' 
                }}>
                  Layer {idx + 1}: {layer.flavor}
                </p>
              </div>
              <div className="space-y-1">
                {layer.fillings && layer.fillings.length > 0 && (
                  <p style={{ 
                    fontFamily: 'Open Sans', 
                    fontSize: '12px', 
                    color: '#5A3825' 
                  }}>
                    <strong>Fillings:</strong> {layer.fillings.join(', ')}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
