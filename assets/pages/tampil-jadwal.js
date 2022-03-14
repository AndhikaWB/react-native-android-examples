import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  ScrollView
} from 'react-native';
// Untuk menampilkan gambar vector secara embedded (tanpa impor)
import Svg, { Path } from 'react-native-svg'
// Impor data berisi jadwal penerbangan pesawat
import listJadwal from '../misc/data.json'
// Impor gambar vector logo maskapai
import AirAsia from '../images/airasia.svg'
import GarudaIndonesia from '../images/garuda-indonesia.svg'
import LionAir from '../images/lion-air.svg'
import SriwijayaAir from '../images/sriwijaya-air.svg'

const TampilJadwal = ({ route }) => {
  // Simpan parameter/state dari rute sebelumnya
  const { asal, tujuan, tanggal } = route.params

  // Shorcut untuk teks bold pada bagian-bagian tertentu
  const Bold = (props) => {return (<Text style={{fontWeight: 'bold'}}>{props.children}</Text>)}

  // Filter jadwal yang sesuai kriteria pencarian screen sebelumnya
  // https://www.geeksforgeeks.org/how-to-parse-json-data-into-react-table-component
  // https://upmostly.com/tutorials/react-filter-filtering-arrays-in-react-with-examples

  const ambilJadwal = listJadwal.filter(jadwal => {
    return jadwal.asal == asal && jadwal.tujuan == tujuan && jadwal.tanggal == tanggal
  }).map(jadwalFilter => {
    // Ganti logo maskapai secara dinamis
    const Logo = props => {
      switch (jadwalFilter.maskapai) {
        case "Garuda Indonesia":
          return <GarudaIndonesia {...props}/>
        case "Indonesia AirAsia":
          return <AirAsia {...props}/>
        case "Sriwijaya Air":
          return <SriwijayaAir {...props}/>
        case "Lion Air":
          return <LionAir {...props}/>
      }
    }

    return (
      <View style={styles.card} key={jadwalFilter.id}>
        <View>
          {/* Gambar vector maskapai untuk tiap-tiap data pada JSON */}
          <Logo width={72} height={72}/>
        </View>
        <View style={{paddingLeft: 18}}>
          {/* Teks data jadwal penerbangan untuk ditampilkan di sebelah gambar pesawat */}
          <Text><Bold>Asal:</Bold> {jadwalFilter.asal}</Text>
          <Text><Bold>Tujuan:</Bold> {jadwalFilter.tujuan}</Text>
          <Text><Bold>Maskapai:</Bold> {jadwalFilter.maskapai}</Text>
          <Text><Bold>Tanggal:</Bold> {jadwalFilter.tanggal}</Text>
        </View>
      </View>
    )
  })

  // Tampilkan hasil akhir yang telah tersaring sesuai kriteria
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <StatusBar barStyle='light-content' backgroundColor='#1976D2'/>
        <Text style={styles.headerText}>Hasil Pencarian Anda:{"\n"}(Terdapat <Text style={{color: '#303F9F'}}>{ambilJadwal.length} Penerbangan</Text> Sesuai Kriteria)</Text>
        <View style={styles.headerBottomWave}>
          {/* Penggunaan gambar vector melalui "react-native-svg" */}
          <Svg width='100%' height='100' viewBox='0 25 1440 320'>
            <Path fill='#2196F3' d='M0,128L48,149.3C96,171,192,213,288,197.3C384,181,480,107,576,101.3C672,96,768,160,864,165.3C960,171,1056,117,1152,122.7C1248,128,1344,192,1392,224L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z'/>
          </Svg>
        </View>
      </View>

      <View style={styles.body}>
        <ScrollView>
          {/* Tampilkan data hasil pencarian */}
          {ambilJadwal}
        </ScrollView>
      </View>

      <View style={styles.footer}>
      <Text style={styles.footerText}>Copyright (C) Andhika Wibawa - 119140218</Text>
      </View>

    </View>
  )
}

export default TampilJadwal

// Style untuk berbagai komponen yang ditampilkan
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: '100%',
    width: '100%'
  },
  header: {
    flex: 3,
    justifyContent: 'flex-end',
    backgroundColor: '#2196F3'
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  headerBottomWave: {
    lineHeight: 0,
    backgroundColor: '#BBDEFB',
    height: 100,
    width: '100%'
  },
  body: {
    flex: 7,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#BBDEFB'
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    paddingHorizontal: 28,
    marginBottom: 12,
    borderRadius: 18,
    minWidth: '80%'
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#BBDEFB',
    width: '100%'
  },
  footerText: {
    color: '#757575',
    textAlign: 'center',
    fontSize: 12
  }
})