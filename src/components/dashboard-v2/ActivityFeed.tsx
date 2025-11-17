import { LucideIcon, Activity as ActivityIcon } from 'lucide-react';

interface Activity {
  id: string | number;
  user: {
    name: string;
    avatar?: string;
    role?: string;
  };
  action: string;
  timestamp: Date | string;
  type?: 'order' | 'customer' | 'payment' | 'system';
  icon?: LucideIcon;
}

interface ActivityFeedProps {
  activities: Activity[];
  loading?: boolean;
  emptyMessage?: string;
  maxHeight?: string;
}

function formatTimestamp(timestamp: Date | string): string {
  const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Just now';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) {
    return 'Yesterday';
  }
  if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} ${diffInWeeks === 1 ? 'week' : 'weeks'} ago`;
  }

  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
  });
}

function getExactTimestamp(timestamp: Date | string): string {
  const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

function getInitials(name: string): string {
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function getRoleGradient(role?: string): string {
  const normalizedRole = role?.toLowerCase() || '';
  
  if (normalizedRole.includes('owner')) {
    return 'linear-gradient(135deg, #C44569 0%, #9B3654 100%)';
  }
  if (normalizedRole.includes('manager')) {
    return 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)';
  }
  if (normalizedRole.includes('sales') || normalizedRole.includes('baker') || normalizedRole.includes('decorator')) {
    return 'linear-gradient(135deg, #5A3825 0%, #3E2618 100%)';
  }
  if (normalizedRole.includes('accountant')) {
    return 'linear-gradient(135deg, #10B981 0%, #059669 100%)';
  }
  
  return 'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)';
}

interface AvatarProps {
  user: Activity['user'];
}

function Avatar({ user }: AvatarProps) {
  const initials = getInitials(user.name);
  const gradient = getRoleGradient(user.role);

  return (
    <div className="avatar">
      {user.avatar ? (
        <img src={user.avatar} alt={user.name} className="avatar-image" />
      ) : (
        <div className="avatar-initials" style={{ background: gradient }}>
          {initials}
        </div>
      )}

      <style jsx>{`
        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          overflow: hidden;
          flex-shrink: 0;
        }

        .avatar-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .avatar-initials {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--db-color-white);
          font-family: var(--db-font-sans);
          font-size: var(--db-text-tiny);
          font-weight: var(--db-weight-semibold);
        }
      `}</style>
    </div>
  );
}

interface IconBadgeProps {
  icon: LucideIcon;
  type?: Activity['type'];
}

function IconBadge({ icon: Icon, type }: IconBadgeProps) {
  const getTypeColor = (): string => {
    switch (type) {
      case 'order':
        return 'var(--db-color-raspberry)';
      case 'customer':
        return 'var(--db-color-info)';
      case 'payment':
        return 'var(--db-color-success)';
      case 'system':
        return 'var(--db-color-gray-500)';
      default:
        return 'var(--db-color-gray-500)';
    }
  };

  const getTypeBackground = (): string => {
    switch (type) {
      case 'order':
        return 'var(--db-color-raspberry-light)';
      case 'customer':
        return 'var(--db-color-info-light)';
      case 'payment':
        return 'var(--db-color-success-light)';
      case 'system':
        return 'rgba(107, 114, 128, 0.1)';
      default:
        return 'rgba(107, 114, 128, 0.1)';
    }
  };

  return (
    <div className="icon-badge" style={{ backgroundColor: getTypeBackground() }}>
      <Icon size={12} color={getTypeColor()} />

      <style jsx>{`
        .icon-badge {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
      `}</style>
    </div>
  );
}

function SkeletonActivities() {
  return (
    <div className="skeleton-activities">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="skeleton-activity-item">
          <div className="skeleton-avatar" />
          <div className="skeleton-content">
            <div className="skeleton-text-line" style={{ width: '80%' }} />
            <div className="skeleton-text-line" style={{ width: '40%', height: '10px', marginTop: '4px' }} />
          </div>
        </div>
      ))}

      <style jsx>{`
        .skeleton-activities {
          padding: var(--db-space-2) 0;
        }

        .skeleton-activity-item {
          display: flex;
          gap: var(--db-space-3);
          padding: var(--db-space-4);
          border-bottom: 1px solid #E5E7EB;
        }

        .skeleton-activity-item:last-child {
          border-bottom: none;
        }

        .skeleton-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(
            90deg,
            var(--db-color-gray-100) 0%,
            var(--db-color-gray-200) 50%,
            var(--db-color-gray-100) 100%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s ease-in-out infinite;
          flex-shrink: 0;
        }

        .skeleton-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .skeleton-text-line {
          height: 14px;
          background: linear-gradient(
            90deg,
            var(--db-color-gray-100) 0%,
            var(--db-color-gray-200) 50%,
            var(--db-color-gray-100) 100%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s ease-in-out infinite;
          border-radius: var(--db-radius-xs);
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
}

interface EmptyActivityStateProps {
  message?: string;
}

function EmptyActivityState({ message = 'No recent activity' }: EmptyActivityStateProps) {
  return (
    <div className="empty-activity-state">
      <div className="empty-icon">
        <ActivityIcon size={40} color="var(--db-color-gray-400)" />
      </div>
      <p className="empty-message">{message}</p>

      <style jsx>{`
        .empty-activity-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: var(--db-space-16) var(--db-space-6);
          text-align: center;
        }

        .empty-icon {
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--db-color-gray-100);
          border-radius: 50%;
          margin-bottom: var(--db-space-4);
        }

        .empty-message {
          font-family: var(--db-font-sans);
          font-size: var(--db-text-sm);
          font-weight: var(--db-weight-medium);
          color: var(--db-color-gray-500);
          margin: 0;
        }
      `}</style>
    </div>
  );
}

export function ActivityFeed({
  activities,
  loading = false,
  emptyMessage = 'No recent activity',
  maxHeight = '600px'
}: ActivityFeedProps) {
  return (
    <div className="activity-feed">
      <div className="activity-feed-header">
        <h3 className="activity-feed-title">Activity Feed</h3>
        <span className="activity-count">
          {activities.length} {activities.length === 1 ? 'event' : 'events'}
        </span>
      </div>

      <div className="activity-feed-body" style={{ maxHeight }}>
        {loading ? (
          <SkeletonActivities />
        ) : activities.length === 0 ? (
          <EmptyActivityState message={emptyMessage} />
        ) : (
          <div className="activity-list">
            {activities.map((activity) => (
              <div key={activity.id} className="activity-item">
                <Avatar user={activity.user} />
                
                <div className="activity-content">
                  <p className="activity-text">
                    <strong className="activity-user-name">{activity.user.name}</strong>
                    {' '}
                    <span className="activity-action">{activity.action}</span>
                  </p>
                  <time
                    className="activity-time"
                    dateTime={activity.timestamp instanceof Date 
                      ? activity.timestamp.toISOString() 
                      : activity.timestamp}
                    title={getExactTimestamp(activity.timestamp)}
                  >
                    {formatTimestamp(activity.timestamp)}
                  </time>
                </div>

                {activity.icon && <IconBadge icon={activity.icon} type={activity.type} />}
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .activity-feed {
          background: var(--db-color-white);
          border: 1px solid #E5E7EB;
          border-radius: var(--db-radius-lg);
          box-shadow: var(--db-shadow-card);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          position: sticky;
          top: var(--db-space-4);
        }

        .activity-feed-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--db-space-5) var(--db-space-6);
          border-bottom: 1px solid #E5E7EB;
          background: var(--db-color-gray-50);
        }

        .activity-feed-title {
          font-family: var(--db-font-heading);
          font-size: var(--db-text-h5);
          font-weight: var(--db-weight-semibold);
          color: var(--db-color-charcoal);
          margin: 0;
          line-height: var(--db-text-h5-line-height);
        }

        .activity-count {
          font-family: var(--db-font-sans);
          font-size: var(--db-text-tiny);
          font-weight: var(--db-weight-medium);
          color: var(--db-color-gray-500);
          padding: var(--db-space-1) var(--db-space-3);
          background: var(--db-color-white);
          border: 1px solid #E5E7EB;
          border-radius: var(--db-radius-full);
        }

        .activity-feed-body {
          overflow-y: auto;
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
        }

        .activity-feed-body::-webkit-scrollbar {
          width: 6px;
        }

        .activity-feed-body::-webkit-scrollbar-track {
          background: var(--db-color-gray-100);
        }

        .activity-feed-body::-webkit-scrollbar-thumb {
          background: var(--db-color-gray-300);
          border-radius: var(--db-radius-full);
        }

        .activity-feed-body::-webkit-scrollbar-thumb:hover {
          background: var(--db-color-gray-400);
        }

        .activity-list {
          display: flex;
          flex-direction: column;
        }

        .activity-item {
          display: flex;
          align-items: flex-start;
          gap: var(--db-space-3);
          padding: var(--db-space-4);
          border-bottom: 1px solid #E5E7EB;
          transition: background-color var(--db-transition-base);
        }

        .activity-item:last-child {
          border-bottom: none;
        }

        .activity-item:hover {
          background-color: rgba(196, 69, 105, 0.05);
        }

        .activity-content {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: var(--db-space-1);
        }

        .activity-text {
          font-family: var(--db-font-sans);
          font-size: var(--db-text-sm);
          line-height: var(--db-text-sm-line-height);
          margin: 0;
          word-wrap: break-word;
        }

        .activity-user-name {
          font-weight: var(--db-weight-semibold);
          color: var(--db-color-charcoal);
        }

        .activity-action {
          font-weight: var(--db-weight-regular);
          color: var(--db-color-chocolate);
        }

        .activity-time {
          font-family: var(--db-font-sans);
          font-size: var(--db-text-tiny);
          font-weight: var(--db-weight-regular);
          color: var(--db-color-gray-500);
          line-height: var(--db-text-tiny-line-height);
        }

        @media (max-width: 639px) {
          .activity-feed {
            position: static;
            top: auto;
          }

          .activity-feed-header {
            padding: var(--db-space-4) var(--db-space-5);
          }

          .activity-feed-title {
            font-size: var(--db-text-h6);
          }

          .activity-item {
            padding: var(--db-space-3);
          }

          .activity-text {
            font-size: var(--db-text-xs);
          }

          .activity-time {
            font-size: 11px;
          }
        }
      `}</style>
    </div>
  );
}
