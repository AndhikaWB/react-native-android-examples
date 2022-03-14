import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity
} from 'react-native'
// Untuk menampilkan elemen dropdown (select) tanpa kode HTML
import { Picker } from '@react-native-picker/picker'
// Untuk menampilkan gambar vector secara embedded (tanpa impor)
import Svg, { Path } from 'react-native-svg'

const CariJadwal = ({ navigation }) => {
  // State untuk menyimpan perubahan data pada elemen Picker
  const [ lokasiAsal, setLokasiAsal ] = useState("Jakarta")
  const [ lokasiTujuan, setLokasiTujuan ] = useState("Bandar Lampung")
  const [ tanggalBrkt, setTanggalBrkt ] = useState("2022-03-09")

  // Untuk menghindari error terkait synthetic event bila berganti halaman
  const tekanCari = (lokasiAsal, lokasiTujuan, tanggalBrkt) => {
    navigation.navigate("TampilJadwal", {asal: lokasiAsal, tujuan: lokasiTujuan, tanggal: tanggalBrkt})
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <StatusBar barStyle='light-content' backgroundColor='#1976D2'/>
        <Text style={styles.headerText}>Ingin Pesan Tiket Pesawat?{"\n"}Sekarang Bisa Lewat
        <Text style={ [styles.headerText, {"color": "#303F9F"}] }> #TravelAja</Text></Text>
        <View style={styles.headerBottomWave}>
          {/* Penggunaan gambar vector inline melalui "react-native-svg" */}
          <Svg width='100%' height='100' viewBox='0 25 1440 320'>
            <Path fill='#2196F3' d='M0,224L48,202.7C96,181,192,139,288,133.3C384,128,480,160,576,170.7C672,181,768,171,864,144C960,117,1056,75,1152,85.3C1248,96,1344,160,1392,192L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z'/>
          </Svg>
        </View>
      </View>

      {/* Pada bagian body, Picker digunakan karena keterbatasan variansi data pada file JSON */}
      {/* Picker sudah berhenti didukung sehingga perlu diambil dari library non-official */}
      {/* Info lebih lanjut: https://reactnative.dev/docs/picker */}

      <View style={styles.body}>
        <View style={styles.form}>
          <Text style={styles.formTitle}>Isi Detail Pemesanan</Text>
          <View>
            <Text>Lokasi Asal</Text>
            <Picker style={styles.formPicker} selectedValue={lokasiAsal} onValueChange={(value) => setLokasiAsal(value)}>
              <Picker.Item label="Jakarta" value="Jakarta"/>
              <Picker.Item label="Bali" value="Bali"/>
              <Picker.Item label="Yogyakarta" value="Yogyakarta"/>
            </Picker>
          </View>
          <View>
            <Text>Lokasi Tujuan</Text>
            <Picker style={styles.formPicker} selectedValue={lokasiTujuan} onValueChange={(value) => setLokasiTujuan(value)}>
              <Picker.Item label="Bandar Lampung" value="Bandar Lampung"/>
              <Picker.Item label="Palembang" value="Palembang"/>
              <Picker.Item label="Padang" value="Padang"/>
            </Picker>
          </View>
          <View>
            <Text>Tanggal Keberangkatan</Text>
            <Picker style={styles.formPicker} selectedValue={tanggalBrkt} onValueChange={(value) => setTanggalBrkt(value)}>
              <Picker.Item label="2022-03-09" value="2022-03-09"/>
              <Picker.Item label="2022-03-10" value="2022-03-10"/>
              <Picker.Item label="2022-03-11" value="2022-03-11"/>
            </Picker>
          </View>
          {/* Tombol untuk beralih ke halaman selanjutnya (hasil pencarian) */}
          <TouchableOpacity onPress={() => tekanCari(lokasiAsal, lokasiTujuan, tanggalBrkt)}>
            <Text style={styles.formButton}>Cek Ketersediaan</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Copyright (C) Andhika Wibawa - 119140218</Text>
      </View>

    </View>
  )
}

export default CariJadwal

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
  form: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    paddingHorizontal: 28,
    borderRadius: 18,
    minWidth: '70%'
  },
  formTitle: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 18
  },
  formPicker: {
    width: '100%',
    minHeight: 60
  },
  formButton: {
    alignSelf: 'center',
    backgroundColor: '#2196F3',
    color: '#FFFFFF',
    fontWeight: 'bold',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18
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