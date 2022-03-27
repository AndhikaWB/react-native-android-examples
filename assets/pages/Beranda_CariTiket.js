import { useState } from 'react'
import { StyleSheet, StatusBar, Text, View, TouchableOpacity, Alert } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import DateTimePicker from '@react-native-community/datetimepicker'
import Ionicons from '@expo/vector-icons/Ionicons'

const CariTiket = ({ navigation }) => {
  // State untuk menyimpan perubahan data pada form
  const [ lokasiAsal, setLokasiAsal ] = useState(null)
  const [ lokasiTujuan, setLokasiTujuan ] = useState(null)
  const [ kelasLayanan, setKelasLayanan ] = useState(null)

  const [ tanggalMasuk, setTanggalMasuk ] = useState(new Date(0))
  const [ tampilTanggal, setTampilTanggal ] = useState(false)
  const gantiTanggal = (event, date) => {
    // Jangan tampilkan popup tanggal secara terus-menerus kecuali diklik ulang
    setTampilTanggal(false)
    // Cegah error apabila cancel saat popup tanggal (null value)
    if (date) setTanggalMasuk(date)
  }

  const [ jamMasuk, setJamMasuk ] = useState(null)
  // Generasi item Picker secara otomatis melalui iterasi (fill dan mapping)
  // https://stackoverflow.com/a/30651224
  // https://stackoverflow.com/a/55394721
  const pilihanJamMasuk = Array(12).fill().map((_,i) => {
    const formatJam = (i*2 < 10) ? "0" + i*2 + ":00" : i*2 + ":00"
    return <Picker.Item key={i} label={formatJam} value={formatJam}/>
  })

  // Shortcut untuk teks tebal pada beberapa bagian teks
  const Bold = (props) => {return (<Text style={{fontWeight: 'bold', fontSize: 16}}>{props.children}</Text>)}

  const tekanCari = (lokasiAsal, lokasiTujuan, kelasLayanan, tanggalMasuk, jamMasuk) => {
    // Cek apakah semua data form telah terisi sebelum melanjutkan
    if (lokasiAsal && lokasiTujuan && kelasLayanan && tanggalMasuk && jamMasuk) {
      navigation.navigate("Pilih Jadwal", {
        asal: lokasiAsal,
        tujuan: lokasiTujuan,
        kelas: kelasLayanan,
        tanggal: tanggalMasuk.toISOString().slice(0,10),
        jam: jamMasuk
      })
    } else {
      Alert.alert(null, "Harap isi semua data yang diperlukan sebelum melanjutkan!")
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle='light-content' backgroundColor='#1962d1'/>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>★ <Text style={{color: '#2196F3'}}>Kapalzy</Text> ★</Text>
        <Text style={styles.headerSubtitle}>Kapan pun, dimana pun!</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.form}>

          {/* <Text style={styles.formTitle}>Form Pemesanan Tiket</Text> */}

          <Text><Bold>Pelabuhan Asal</Bold></Text>
          <View style={styles.formDesc}>
            <Ionicons name="boat" size={32} color="#2196F3"/>
            <View style={styles.formPicker}>
              <Picker selectedValue={lokasiAsal} onValueChange={(value) => setLokasiAsal(value)}>
                <Picker.Item label="Pilih Pelabuhan Asal..." value=""/>
                <Picker.Item label="Merak (Banten)" value="Merak (Banten)"/>
                <Picker.Item label="Tanjung Priok (Jakarta)" value="Tanjung Priok (Jakarta)"/>
                <Picker.Item label="Tanjung Perak (Jawa Timur)" value="Tanjung Perak (Jawa Timur)"/>
              </Picker>
            </View>
          </View>
          
          <Text><Bold>Pelabuhan Tujuan</Bold></Text>
          <View style={styles.formDesc}>
            <Ionicons name="boat" size={32} color="#2196F3"/>
            <View style={styles.formPicker}>
              <Picker selectedValue={lokasiTujuan} onValueChange={(value) => setLokasiTujuan(value)}>
                <Picker.Item label="Pilih Pelabuhan Tujuan..." value=""/>
                <Picker.Item label="Bakauheni (Lampung)" value="Bakauheni (Lampung)"/>
                <Picker.Item label="Sekupang (Kepulauan Riau)" value="Sekupang (Kepulauan Riau)"/>
                <Picker.Item label="Gilimanuk (Bali)" value="Gilimanuk (Bali)"/>
              </Picker>
            </View>
          </View>

          <Text><Bold>Kelas Layanan</Bold></Text>
          <View style={styles.formDesc}>
            <Ionicons name="briefcase" size={32} color="#2196F3"/>
            <View style={styles.formPicker}>
              <Picker selectedValue={kelasLayanan} onValueChange={(value) => setKelasLayanan(value)}>
                <Picker.Item label="Pilih Kelas Layanan..." value=""/>
                <Picker.Item label="Reguler" value="Reguler"/>
                <Picker.Item label="Express" value="Express"/>
              </Picker>
            </View>
          </View>

          <Text><Bold>Tanggal Masuk Pelabuhan</Bold></Text>
          <View style={styles.formDesc}>
            <Ionicons name="calendar" size={32} color="#2196F3"/>
            <View style={styles.formInputBox}>
              <TouchableOpacity onPress={() => setTampilTanggal(true)}>
                <Text style={{fontSize:16}}>{tanggalMasuk.valueOf() == 0 ? "Pilih Tanggal Masuk..." : tanggalMasuk.toISOString().slice(0,10)}</Text>
              </TouchableOpacity>
              {/* Tampilkan popup tanggal berdasarkan rentang tanggal yang telah di-filter */}
              { tampilTanggal && (<DateTimePicker value={tanggalMasuk} onChange={gantiTanggal} minimumDate={new Date(2022,2,21)} maximumDate={new Date(2022,2,25)}/>) }
            </View>
          </View>
          
          <Text><Bold>Jam Masuk Pelabuhan</Bold></Text>
          <View style={styles.formDesc}>
            <Ionicons name="time" size={32} color="#2196F3"/>
            <View style={styles.formPicker}>
              {/* Picker digunakan karena jam tidak dapat di-filter pada Android */}
              <Picker selectedValue={jamMasuk} onValueChange={(value) => setJamMasuk(value)}>
                <Picker.Item label="Pilih Jam Masuk..." value=""/>
                {pilihanJamMasuk}
              </Picker>
            </View>
          </View>

          <Text><Bold>Jumlah Penumpang</Bold></Text>
          <View style={styles.formDesc}>
            <Ionicons name="md-person" size={32} color="#2196F3"/>
            <View style={styles.formInputBox}>
              <Text style={{fontSize:16}}>1 orang (Dewasa)</Text>
            </View>
          </View>

          <TouchableOpacity onPress={() => tekanCari(lokasiAsal, lokasiTujuan, kelasLayanan, tanggalMasuk, jamMasuk)}>
            <Text style={styles.formButton}>Cari Jadwal Tersedia</Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  )
}

export default CariTiket

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    height: "100%",
    width: "100%"
  },
  header: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#BBDEFB',
    width: '100%'
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#FFC107'
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#0288D1'
  },
  body: {
    flex: 6,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#BBDEFB',
    height: "100%"
  },
  form: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    paddingHorizontal: 28,
    borderRadius: 18
  },
  formTitle: {
    // color: '#2196F3',
    // alignSelf: 'center',
    // fontWeight: 'bold',
    // fontSize: 18,
    // marginBottom: 12
  },
  formDesc: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  },
  formPicker: {
    // borderWidth: 1,
    minWidth: "65%",
    paddingLeft: 4
  },
  formInputBox: {
    // borderWidth: 1,
    paddingLeft: 14,
    paddingVertical: 16,
    paddingHorizontal: 8
  },
  formButton: {
    alignSelf: 'center',
    backgroundColor: '#2196F3',
    color: '#FFFFFF',
    fontWeight: 'bold',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
    marginTop: 8
  }
})