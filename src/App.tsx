import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { ConvexReactClient } from 'convex/react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './components/providers/theme-provider';
import { LiveKitProvider } from './components/providers/livekit-provider';
import { Toaster } from './components/ui/sonner';
import { useAuth as useClerkAuth } from "@clerk/clerk-react";

import AuthLayout from './components/layouts/auth-layout';
import MainLayout from './components/layouts/main-layout';
import SignInPage from './components/SignIn';
import SignUpPage from './components/SignUp';

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);

function App() {
  return (
    <ConvexProviderWithClerk client={convex} useAuth={useClerkAuth}>
      <ThemeProvider defaultTheme="dark" storageKey="discord-theme">
        <LiveKitProvider
          serverUrl={import.meta.env.VITE_LIVEKIT_URL}
          token={import.meta.env.VITE_LIVEKIT_TOKEN}
        >
          <BrowserRouter>
            <Routes>
              <Route element={<AuthLayout />}>
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/signup" element={<SignUpPage />} />
              </Route>
              <Route element={<MainLayout />}>
                <Route path="/" element={<div>Home</div>} />
                <Route path="/servers/:serverId" element={<div>Server</div>} />
                <Route path="/servers/:serverId/channels/:channelId" element={<div>Channel</div>} />
              </Route>
            </Routes>
          </BrowserRouter>
          <Toaster />
        </LiveKitProvider>
      </ThemeProvider>
    </ConvexProviderWithClerk>
  );
}

export default App;
