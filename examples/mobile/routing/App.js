import React from 'react';
import {Button, StyleSheet, View, Text} from 'react-native';
import {Navigator, Route, Routes, useNavigator} from '@kayakjs/mobile';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  one: {backgroundColor: '#59C9A5'},
  two: {backgroundColor: '#23395B'},
  three: {backgroundColor: '#B9E3C6'},
  vertical: {marginVertical: 10},
  header: {
    height: 50,
    backgroundColor: 'teal',
    alignItems: 'center',
  },
});

const Screen1 = ({navigator}) => (
  <View style={[styles.screen, styles.one]}>
    <Button title="Next" onPress={() => navigator.push('Screen2')} />
  </View>
);

const Screen2 = ({navigator}) => (
  <View style={[styles.screen, styles.two]}>
    <Button title="Next" onPress={() => navigator.push('Screen3')} />
    <View style={styles.vertical} />
    <Button title="Pop" onPress={() => navigator.pop()} />
  </View>
);

const Screen3 = ({navigator}) => (
  <View style={[styles.screen, styles.three]}>
    <Button title="Pop" onPress={() => navigator.pop()} />
  </View>
);

const Header = () => {
  const {stack, state} = useNavigator();

  let currentScreen = 'No Screen';

  if (stack.length > 0) {
    currentScreen = stack[stack.length - 1].key;
  }

  return (
    <View style={styles.header}>
      <Text>{JSON.stringify(state)}</Text>
      <Text>{currentScreen}</Text>
    </View>
  );
};

export default function App() {
  return (
    <Navigator>
      <Header />
      <Routes>
        <Route name="Screen1" component={Screen1} />
        <Route name="Screen2" component={Screen2} />
        <Route name="Screen3" component={Screen3} />
      </Routes>
    </Navigator>
  );
}
