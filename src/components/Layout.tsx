import { type ReactNode, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Film, Bookmark, Moon, Sun } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isDark, setIsDark] = useState(() => {
    // Check initial theme preference
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const location = useLocation();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: Film },
    { name: 'Bookmarks', path: '/bookmarks', icon: Bookmark },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300 flex flex-col">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--card)]/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary text-primary-foreground p-1.5 rounded-lg group-hover:bg-primary/90 transition-colors">
              <Film size={24} />
            </div>
            <span className="font-bold text-xl tracking-tight">Test Movie</span>
          </Link>

          <nav className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.path ? 'text-primary' : 'opacity-70'
                }`}
              >
                <link.icon size={18} />
                <span className="hidden sm:inline">{link.name}</span>
              </Link>
            ))}
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-[var(--border)] transition-colors opacity-70 hover:opacity-100"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-[var(--border)] py-6 opacity-60 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Test Movie App. Built for testing purposes.</p>
      </footer>
    </div>
  );
}
