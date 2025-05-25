// App.tsx
import React, { useEffect, useState } from 'react';
import { StatusBar, View, Text } from 'react-native';
import auth from '@react-native-firebase/auth'; // 👈 correct import
import Navigation from './src/navigator/Navigations';

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<any>(null);

  // Handle user state changes
  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Navigation isLoggedIn={!!user} user={user} checkIfLogin={() => {}} />
    </>
  );
};

export default App;
