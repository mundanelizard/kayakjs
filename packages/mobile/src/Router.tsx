import * as React from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import {SceneConfig, useNavigator} from './Navigator';

interface RouteProps {
  name: string;
  component: React.FC;
}

export const Route = (_: RouteProps) => null;

const buildSceneConfig: (children: React.ReactElement[]) => SceneConfig = (
  children = [],
) => {
  const config: SceneConfig = {};

  children.forEach((child: React.ReactElement) => {
    config[child.props.name] = {
      key: child.props.name,
      component: child.props.component,
    };
  });

  return config;
};

export function Routes({children}: {children: React.ReactElement[]}) {
  const {pop, push, animatedValue, stack, setUp} = useNavigator();

  const {sceneConfig, stackConfig} = React.useMemo(() => {
    const localSceneConfig = buildSceneConfig(children);
    const initialSceneName = children[0].props.name;

    return {
      sceneConfig: localSceneConfig,
      stackConfig: [localSceneConfig[initialSceneName]],
    };
  }, [children]);

  React.useEffect(() => {
    setUp(sceneConfig, stackConfig);
  }, [sceneConfig, setUp, stackConfig]);

  return (
    <View style={styles.container}>
      {stack.map((scene: any, index: any) => {
        const CurrentScene: React.FC<{navigator: any}> = scene.component;
        const sceneStyles: any[] = [styles.scene];

        if (index === stack.length - 1 && index > 0) {
          sceneStyles.push({
            transform: [
              {
                translateX: animatedValue,
              },
            ],
          });
        }

        return (
          <Animated.View key={scene.key + index} style={sceneStyles}>
            <CurrentScene navigator={{push, pop}} />
          </Animated.View>
        );
      })}
    </View>
  );
}

const styles: any = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  scene: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
});
