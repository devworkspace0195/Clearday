import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store } from './src/store/store';
import { ThemeProvider } from './src/context/ThemeContext';
import AppNavigator from './src/navigation/AppNavigator';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ThemeProvider>
          <AppNavigator />
        </ThemeProvider>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
