import React from "react";
import { RouteContext } from "./Route";
import { RouterContext, RouterContextValue } from "./Router";

export function useParams() {
  const params = React.useContext(RouteContext);

  if (!params)
    throw new Error('`useParams` requires component to be rendered in a `Route` component to use the `RouteContext.Provider`.')

  return params;
}

export function useRouter(): RouterContextValue {
  const route = React.useContext(RouterContext);

  if (!route)
    throw new Error('`useRouter` requires component to be rendered in a `Router` component to use the `RouterContext.Provider`.')

  return route;
}