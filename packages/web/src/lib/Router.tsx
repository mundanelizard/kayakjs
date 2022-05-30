import React, { ReactChild, ReactChildren, useCallback, useMemo } from "react";

export interface RouterContextValue {
  location: string,
  push: (newLocation: string) => void;
}

export const RouterContext = React.createContext<RouterContextValue | undefined>(undefined);
RouterContext.displayName = "RouterContext"

export interface RouterProps {
  children: ReactChild | ReactChildren | ReactChild[];
}

function Router({ children }: RouterProps) {
  const [location, setLocation] = React.useState(window.location.pathname);

  const handlePush = React.useCallback((newLocation) => {
    window.history.pushState({}, "", newLocation);
    setLocation(newLocation.split("?")[0]);
  }, []);

  const handlePathnameChange = useCallback(
    () => setLocation(window.location.pathname),
    []
  );

  React.useEffect(() => {
    window.addEventListener("popstate", handlePathnameChange);
    return () => window.removeEventListener("popstate", handlePathnameChange);
  });

  const value = useMemo(() => ({ location, push: handlePush }), [location, handlePush])

  return (
    <RouterContext.Provider value={value}>
      {children}
    </RouterContext.Provider>
  )
}

export default Router;
