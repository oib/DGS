import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { trpc } from '@/utils/trpc';

interface LoginTrackerProps {
  children: React.ReactNode;
}

export function LoginTracker({ children }: LoginTrackerProps) {
  const { user } = useAuth();
  const updateLoginStats = trpc.user.updateLoginStats.useMutation();

  useEffect(() => {
    if (user) {
      // Update login stats when user logs in
      updateLoginStats.mutate({
        userId: user.id,
        loginData: {
          ipAddress: null, // Will be filled by backend
          userAgent: navigator.userAgent
        }
      });
    }
  }, [user, updateLoginStats]);

  return <>{children}</>;
}
