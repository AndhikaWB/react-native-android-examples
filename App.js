import React from 'react'
// React navigator untuk berpindah halaman
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// Impor halaman yang dibutuhkan React navigator
import CariJadwal from './assets/pages/cari-jadwal'
import TampilJadwal from './assets/pages/tampil-jadwal'

const App = () => {
  // Fungsi untuk menyimpan objek berisi screen dan navigator
  const Stack = createNativeStackNavigator()
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={navigationHeader}>
        <Stack.Screen name="CariJadwal" options={{title: 'TravelAja'}} component={CariJadwal} />
        <Stack.Screen name="TampilJadwal" options={{title: 'Jadwal Tersedia'}} component={TampilJadwal} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

// Style untuk header navigasi
const navigationHeader = {
    headerStyle: {
      backgroundColor: '#1976D2'
    },
    headerTintColor: '#FFFFFF',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
}