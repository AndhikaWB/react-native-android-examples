import { useState } from 'react'
import { StyleSheet, StatusBar, Text, View, TextInput, TouchableOpacity, Modal, Alert } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

const PesanTiket = ({ navigation, route }) => {
  // Data dari rute/halaman sebelumnya
  const { idKapal, asal, tujuan, kelas, tanggal, jam } = route.params
  const totalHarga = (kelas == "Express") ? 65000 : 15000
  // Data form yang perlu diisi saat ini
  const [ namaLengkap, setNamaLengkap ] = useState(null)
  const [ nomorKTP, setNomorKTP ] = useState(null)
  const [ umur, setUmur ] = useState(null)

  // Untuk menampilkan konfirmasi pembelian
  const [ tampilModal, setTampilModal ] = useState(false)
  // Shortcut untuk teks tebal pada beberapa bagian teks
  const Bold = (props) => {return (<Text style={{fontWeight: 'bold'}}>{props.children}</Text>)}

  // Modal popup untuk konfirmasi jadwal yang dipilih
  const PopupKonfirmasi = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={tampilModal}
        onRequestClose={() => {setTampilModal(false)}}
      >
        <View style={styles.modalCenter}>
          <View style={styles.modalPopup}>
            <Text style={styles.modalTitle}>Konfirmasi Pembelian</Text>
            <Text>Silahkan transfer ke nomor rekening <Bold>69420XXXXXXX (Bank Jago)</Bold> untuk menyelesaikan pembayaran!</Text>
            <View style={{marginTop: 12, flexDirection: 'row', justifyContent: 'flex-end'}}>
              {/* Tombol untuk cancel pilihan */}
              <TouchableOpacity onPress={() => setTampilModal(false)}>
                <Text style={styles.modalButton}>Kembali</Text>
              </TouchableOpacity>
              {/* Tombol untuk konfirmasi pilihan */}
              <TouchableOpacity onPress={() => {
                // Hilangkan modal setelah konfirmasi
                setTampilModal(false)
                // Balik ke screen awal sebelum pindah tab
                navigation.popToTop()
                navigation.navigate("Pesanan", {
                  screen: "Riwayat Pesanan",
                  params: {
                    tambahkan: true,
                    detailPesanan: {
                      status: "Dipesan",
                      idKapal: idKapal,
                      asal: asal,
                      tujuan: tujuan,
                      kelas: kelas,
                      tanggal: tanggal,
                      jam: jam,
                      totalHarga: totalHarga,
                      namaLengkap: namaLengkap,
                      nomorKTP: nomorKTP,
                      umur: umur
                    }
                  }
                })
              }}>
                <Text style={[styles.modalButton, {backgroundColor: '#4CAF50'}]}>Bayar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    )
  }

  // Fungsi ketika tombol beli tiket ditekan
  const tekanBeli = () => {
    if (namaLengkap && nomorKTP && umur) {
      setTampilModal(true)
    } else {
      Alert.alert(null, "Harap isi semua data yang diperlukan sebelum melanjutkan!")
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle='light-content' backgroundColor='#1962d1'/>
      <View style={styles.body}>
        <PopupKonfirmasi/>
        <View style={styles.form}>

          <Text style={styles.formTitle}>Kapalzy</Text>

          <Text style={styles.formSubtitle}>Rincian Tiket:</Text>

          <View style={styles.formInfoBox}>
            <Text><Bold>ID Kapal:</Bold> {idKapal}</Text>
            <Text><Bold>Asal:</Bold> {asal}</Text>
            <Text><Bold>Tujuan:</Bold> {tujuan}</Text>
            <Text><Bold>Kelas Layanan:</Bold> {kelas} (1 orang)</Text>
            <Text><Bold>Jadwal:</Bold> {tanggal} ({jam} WIB)</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{flex: 1, height: 1, backgroundColor: 'black', marginVertical: 8}}/>
            </View>
            <Text><Bold>Total Harga:</Bold> Rp {totalHarga}</Text>
          </View>

          <Text style={styles.formSubtitle}>Data Pemesan:</Text>

          <Text>Nama Lengkap:</Text>
          <View style={styles.formInput}>
            <Ionicons name="md-person" size={28} color="#2196F3"/>
            <TextInput
              style={styles.formInputBox}
              onChangeText={setNamaLengkap}
              value={namaLengkap}
              placeholder="Masukkan nama lengkap..."
            />
          </View>

          <Text>Nomor KTP:</Text>
          <View style={styles.formInput}>
            <Ionicons name="card" size={28} color="#2196F3"/>
            <TextInput
              style={styles.formInputBox}
              onChangeText={setNomorKTP}
              value={nomorKTP}
              placeholder="Masukkan nomor KTP..."
              keyboardType="numeric"
            />
          </View>

          <Text>Umur:</Text>
          <View style={styles.formInput}>
            <Ionicons name="options" size={28} color="#2196F3"/>
            <TextInput
              style={styles.formInputBox}
              onChangeText={setUmur}
              value={umur}
              placeholder="Masukkan umur..."
              keyboardType="numeric"
            />
          </View>

          <TouchableOpacity onPress={() => tekanBeli()}>
            <Text style={styles.formButton}>Beli Tiket Kapal</Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  )
}

export default PesanTiket

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    height: "100%",
    width: "100%"
  },
  body: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#BBDEFB',
    height: "100%"
  },
  form: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    paddingHorizontal: 28,
    borderRadius: 18,
    minWidth: '70%'
  },
  formTitle: {
    color: '#2196F3',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8
  },
  formSubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 12
  },
  formInfoBox: {
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 8,
    padding: 14
  },
  formInput: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  formInputBox: {
    height: 40,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 8,
    marginLeft: 8,
    padding: 10,
    width: 200
  },
  formButton: {
    alignSelf: 'center',
    backgroundColor: '#2196F3',
    color: '#FFFFFF',
    fontWeight: 'bold',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
    marginTop: 12
  },
  modalCenter: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalPopup: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 18,
    shadowColor: "#000000",
    elevation: 14
  },
  modalTitle: {
    alignSelf: 'center',
    color: '#2196F3',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12
  },
  modalButton: {
    backgroundColor: '#2196F3',
    color: '#FFFFFF',
    fontWeight: 'bold',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginLeft: 12,
    borderRadius: 18
  }
})