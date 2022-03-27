import { useState, createContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { View, Text } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

// Halaman yang diperlukan untuk navigasi stack/tab
import Beranda_CariTiket from './assets/pages/Beranda_CariTiket'
import Beranda_PilihJadwal from './assets/pages/Beranda_PilihJadwal'
import Beranda_PesanTiket from './assets/pages/Beranda_PesanTiket'
import Pesanan_ListPesanan from './assets/pages/Pesanan_ListPesanan'
import Pembatalan_ListPembatalan from './assets/pages/Pembatalan_ListPembatalan'

const NavTabs = ({params}) => {
  const Tab = createMaterialBottomTabNavigator()
  return (
    <Tab.Navigator
      shifting={true}
      inactiveColor="#B3E5FC"
      barStyle={{ backgroundColor: '#1976D2', padding: 2 }}
    >
      <Tab.Screen
        name="Beranda"
        component={Beranda}
        options={{
          tabBarLabel: <Text style={{ fontSize: 13, color: "#FFFFFF" }}> Beranda </Text>,
          tabBarIcon: ({color}) => (<Ionicons name="home" size={26} color={color} />)
        }}
      />
      <Tab.Screen
        name="Pesanan"
        component={Pesanan}
        options={{
          tabBarLabel: <Text style={{ fontSize: 13, color: "#FFFFFF" }}> Pesanan</Text>,
          tabBarIcon: ({color}) => (<Ionicons name="cart" size={29} color={color} style={{height: 29, width: 29}}/>)
        }}
      />
      <Tab.Screen
        name="Pembatalan"
        component={Pembatalan}
        options={{
          tabBarLabel: <Text style={{ fontSize: 13, color: "#FFFFFF" }}> Pembatalan </Text>,
          tabBarIcon: ({color}) => (<Ionicons name="trash-bin" size={26} color={color} />)
        }}
      />
    </Tab.Navigator>
  )
}

const Beranda = () => {
  const Stack = createNativeStackNavigator()
  return (
    // Tambahkan View untuk mengatasi bug blank screen
    // https://github.com/software-mansion/react-native-screens/issues/1197#issuecomment-993682256
    <View style={{flex: 1}} collapsable={false}>
      <Stack.Navigator screenOptions={styles}>
        <Stack.Screen name="Cari Tiket" options={{title: 'Pesan Tiket Kapal'}} component={Beranda_CariTiket}/>
        <Stack.Screen name="Pilih Jadwal" component={Beranda_PilihJadwal}/>
        <Stack.Screen name="Pesan Tiket" component={Beranda_PesanTiket}/>
      </Stack.Navigator>
    </View>
  )
}

const Pesanan = () => {
  const Stack = createNativeStackNavigator()
  return (
    // Tambahkan View untuk mengatasi bug blank screen
    // https://github.com/software-mansion/react-native-screens/issues/1197#issuecomment-993682256
    <View style={{flex: 1}} collapsable={false}>
      <Stack.Navigator screenOptions={styles}>
        <Stack.Screen name="Riwayat Pesanan" component={Pesanan_ListPesanan} initialParams={{ tambahkan: false, detailPesanan: null }}/>
      </Stack.Navigator>
    </View>
  )
}

const Pembatalan = () => {
  const Stack = createNativeStackNavigator()
  return (
    // Tambahkan View untuk mengatasi bug blank screen
    // https://github.com/software-mansion/react-native-screens/issues/1197#issuecomment-993682256
    <View style={{flex: 1}} collapsable={false}>
      <Stack.Navigator screenOptions={styles}>
        <Stack.Screen name="Riwayat Pembatalan" component={Pembatalan_ListPembatalan} initialParams={{ tambahkan: false, detailPesanan: null }}/>
      </Stack.Navigator>
    </View>
  )
}

export const PesananContext = createContext()

const App = () => {
  const [ listPesanan, setListPesanan ] = useState([])

  return (
    <PesananContext.Provider value={{listPesanan, setListPesanan}}>
      <NavigationContainer>
        <NavTabs/>
      </NavigationContainer>
    </PesananContext.Provider>
  )
}

export default App

const styles = {
  headerStyle: {
    backgroundColor: '#1976D2'
  },
  headerTintColor: '#FFFFFF',
  headerTitleStyle: {
    fontWeight: 'bold'
  },
  tabBarStyle: {
    backgroundColor: '#1976D2'
  }
}