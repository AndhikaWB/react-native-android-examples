import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'

import DaftarKontak from './assets/pages/DaftarKontak'
import TambahKontak from './assets/pages/TambahKontak'
import Telepon from './assets/pages/Telepon'

const App = () => {
  const Tab = createBottomTabNavigator()

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          unmountOnBlur: true,
          tabBarLabelStyle: {
            fontSize: 12
          }
        }}
      >
        <Tab.Screen
          name="Kontak"
          component={DaftarKontak}
          options={{
            tabBarIcon: ({color}) => (
              <Ionicons name="md-person" size={24} color={color}/>
            )
          }}
        />
        <Tab.Screen
          name="Tambah Baru"
          component={TambahKontak}
          initialParams={{ passNoTelp: null }}
          options={{
            tabBarLabel: "",
            tabBarIcon: () => (
              <View style={styles.middleButton}>
                <Ionicons name="md-add" size={48} color="#FFFFFF"/>
              </View>
            )
          }}
        />
        <Tab.Screen
          name="Telepon"
          component={Telepon}
          options={{
            tabBarIcon: ({color}) => (
              <Ionicons name="md-call" size={24} color={color} />
            )
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleButton: {
    position: 'absolute',
    borderRadius: 48,
    paddingLeft: 2,
    backgroundColor: '#FF4081',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5
  }
})