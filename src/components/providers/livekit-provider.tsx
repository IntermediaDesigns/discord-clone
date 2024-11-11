import { LiveKitRoom } from '@livekit/components-react';
import '@livekit/components-styles';

interface LiveKitProviderProps {
  children: React.ReactNode;
  serverUrl?: string;
  token?: string;
}

export const LiveKitProvider = ({
  children,
  serverUrl,
  token
}: LiveKitProviderProps) => {
  if (!serverUrl || !token) {
    return <>{children}</>;
  }

  return (
    <LiveKitRoom
      serverUrl={serverUrl}
      token={token}
      connect={true}
      video={false}
      audio={false}
      data-lk-theme="default"
    >
      {children}
    </LiveKitRoom>
  );
};
