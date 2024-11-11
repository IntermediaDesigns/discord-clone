import { Outlet } from 'react-router-dom';
import { useAuth, SignOutButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import LandingPage from '../LandingPage';
import NavigationSidebar from '../navigation/navigation-sidebar';

const MainLayout = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="h-full">
      <nav className="fixed top-0 w-full z-50 bg-background border-b py-4 px-6">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Link to="/" className="font-bold text-xl">
            Discord Clone
          </Link>
          <div className="flex gap-4">
            {isSignedIn ? (
              <SignOutButton>
                <Button variant="ghost">Sign Out</Button>
              </SignOutButton>
            ) : (
              <>
                <Link to="/signin">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link to="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0 pt-16">
        <NavigationSidebar />
      </div>
      <main className="md:pl-[72px] h-full pt-16">
        {window.location.pathname === '/' && !isSignedIn ? <LandingPage /> : <Outlet />}
      </main>
    </div>
  );
};

export default MainLayout;
