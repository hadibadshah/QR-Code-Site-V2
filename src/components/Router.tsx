import React, { createContext, useContext, useState, useEffect } from 'react';

const RouterContext = createContext<{
  path: string;
  navigateTo: (to: string) => void;
}>({
  path: '/',
  navigateTo: () => {},
});

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [path, setPath] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname;
    }
    return '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (to: string) => {
    if (typeof window === 'undefined') return;
    
    // Normalize string: ensure leading slash, remove trailing slash except root
    let cleanPath = to;
    if (!cleanPath.startsWith('/')) {
      cleanPath = '/' + cleanPath;
    }
    if (cleanPath.length > 1 && cleanPath.endsWith('/')) {
      cleanPath = cleanPath.slice(0, -1);
    }

    if (window.location.pathname === cleanPath) return;

    window.history.pushState(null, '', cleanPath);
    setPath(cleanPath);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <RouterContext.Provider value={{ path, navigateTo }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => useContext(RouterContext);

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
}

export const Link: React.FC<LinkProps> = ({ to, children, ...props }) => {
  const { navigateTo } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Let middle clicks / cmd-clicks work naturally in new tabs
    if (
      e.ctrlKey ||
      e.metaKey ||
      e.shiftKey ||
      e.button === 1 ||
      props.target === '_blank'
    ) {
      return;
    }
    e.preventDefault();
    navigateTo(to);
  };

  return (
    <a href={to} onClick={handleClick} {...props}>
      {children}
    </a>
  );
};
