import * as React from 'react';
import {Animated, BackHandler, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export interface Scene {
  key: string;
  component: React.FC;
}

export interface SceneConfig {
  [index: string]: Scene;
}

function isObject(v: any): boolean {
  return typeof v === 'object' && !Array.isArray(v) && v !== null;
}

interface INavigatorContext {
  pop: () => void;
  push: (name: string, state?: any) => void;
  stack: Scene[];
  setStack: (name: string) => void;
  animatedValue: Animated.Value;
  setUp: (scenes: SceneConfig, stacks: Scene[]) => void;
  state: any;
}

const NavigatorContext = React.createContext<INavigatorContext>(
  undefined as any,
);

export function useNavigator() {
  const navigator = React.useContext(NavigatorContext);

  if (!navigator) {
    throw new Error(
      '`useNavigator` must be called inside a `Navigator` component.',
    );
  }

  return navigator;
}

export function Navigator({children}: {children: any}) {
  const [stack, setStack] = React.useState<any>([]);
  const [scenes, setScenes] = React.useState<{[index: string]: any}>({});
  const [state, setState] = React.useState<any[]>([]);

  const animatedValue = React.useRef(new Animated.Value(0));
  const displayPushAnimation = React.useRef(false);

  const push = React.useCallback(
    (sceneName: string, newState: Record<any, any> = {}) => {
      const isValidObject = isObject(newState);

      if (!isValidObject) {
        throw new Error(
          `'push' expected a object key value pair 'newState', but instead recieved a '${typeof newState}'`,
        );
      }

      displayPushAnimation.current = true;
      setStack([...stack, scenes[sceneName]]);
      setState([...state, newState]);
    },
    [scenes, stack, state],
  );

  const pop = React.useCallback(() => {
    Animated.timing(animatedValue.current, {
      toValue: width,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      animatedValue.current.setValue(0);
      if (stack.length > 1) {
        setStack(stack.slice(0, stack.length - 1));
        setState(state.slice(0, state.length - 1));
      }
    });
  }, [animatedValue, stack, state]);

  const setUp = React.useCallback(
    (newScenes: SceneConfig, newStack: Scene[]) => {
      // returns true if the keys are not the same
      const oldScene = Object.keys(scenes).some(
        sceneName => !newScenes[sceneName],
      );

      // returns true if the keys are not the same
      const newScene = Object.keys(newScenes).some(
        sceneName => !scenes[sceneName],
      );

      if (oldScene || newScene) {
        setScenes(newScenes);
      }
      if (!stack.length) {
        setStack(newStack);
        setState([{}]);
      }
    },
    [stack, setStack, setScenes, scenes],
  );

  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (stack.length === 1) {
          BackHandler.exitApp;
        } else {
          pop();
        }

        return true;
      },
    );

    if (displayPushAnimation.current) {
      displayPushAnimation.current = false;
      animatedValue.current.setValue(width);
      Animated.timing(animatedValue.current, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }

    return () => {
      backHandler.remove();
    };
  }, [pop, stack.length]);

  const value = {
    pop,
    push,
    setUp,
    stack,
    setStack,
    animatedValue: animatedValue.current,
    state: state[state.length - 1],
  };

  return (
    <NavigatorContext.Provider value={value}>
      {children}
    </NavigatorContext.Provider>
  );
}
