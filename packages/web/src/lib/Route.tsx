import { matchRoute } from "./utils";
import React, { ReactElement } from "react";
import { useRouter } from "./hooks";

export const RouteContext = React.createContext<
  { [index: string]: any } | undefined
>(undefined);

RouteContext.displayName = "RouteContext"

interface RouteProps {
  path: string | string[];
  component?: any;
  children?: ReactElement | ReactElement[];
  exact?: boolean;
}

function Route({ children, path, component: Component, exact }: RouteProps) {
  const { location, push } = useRouter();

  const params = React.useMemo(() => {
    if (typeof path === "string")
      return matchRoute(path, location, exact as boolean);
    else if (Array.isArray(path)) {
      let tempParams: any;
      for (const singlePath of path) {
        if (tempParams) return tempParams;
        tempParams = matchRoute(singlePath, location, exact as boolean);
      }

      return tempParams || null;
    }
  }, [path, location, exact]);


  const value = React.useMemo(() => params, [params]);

  if (!params) return null;

  const router = { params, location, push };

  return (
    <RouteContext.Provider value={value as any}>
      {Component ? (
        <Component router={router} />
      ) : (
        React.Children.map(children as ReactElement, (child) => {
          if (typeof child.type !== "function") return child;
          return React.cloneElement(child, { router });
        })
      )}
    </RouteContext.Provider>
  );
}

Route.defaultProps = {
  exact: false,
};

export default Route;
