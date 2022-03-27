import { useState, useContext } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import Svg, { Path } from 'react-native-svg'

import { PesananContext } from '../../App'

const ListPembatalan = ({ route }) => {
  // Konteks untuk menyimpan list pesanan agar konsisten
  let { listPesanan } = useContext(PesananContext)

  // State untuk menampilkan/menyembunyikan modal pembatalan tiket
  const [ tampilModal, setTampilModal ] = useState(false)
  // Data tiket pembatalan mula-mula (untuk mencegah error)
  const [ tiketBatal, setTiketBatal ] = useState({
    status: null, idKapal: null, asal: null, tujuan: null, kelas: null, umur: null,
    tanggal: null, jam: null, totalHarga: null, namaLengkap: null, nomorKTP: null,
  })

  // Paksa refresh state tiket yang dibatalkan
  if (route.params) {
    let { listPesanan } = route.params
    listPesanan = {listPesanan}
  }

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
            <Text style={styles.modalTitle}>Info Pesanan</Text>
            <View style={{paddingBottom: 8}}>
              <Text><Bold>ID Kapal:</Bold> {tiketBatal.idKapal}</Text>
              <Text><Bold>Pemesan:</Bold> {tiketBatal.namaLengkap}</Text>
              <Text><Bold>Nomor KTP:</Bold> {tiketBatal.nomorKTP}</Text>
              <Text><Bold>Refund:</Bold> Rp {tiketBatal.totalHarga}</Text>
            </View>
            <Text>Uang refund telah dikembalikan.</Text>
            <Text>Silahkan cek rekening Anda.</Text>
            <View style={{marginTop: 12, flexDirection: 'row', justifyContent: 'flex-end'}}>
              {/* Tombol untuk cancel pilihan */}
              <TouchableOpacity onPress={() => setTampilModal(false)}>
                <Text style={styles.modalButton}>Kembali</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    )
  }

  // Filter data jadwal agar sesuai kriteria pencarian
  const filterPesanan = listPesanan.filter(pesanan => pesanan.status == "Dibatalkan")

  // Shortcut untuk teks tebal pada beberapa bagian teks
  const Bold = (props) => {return (<Text style={{fontWeight: 'bold'}}>{props.children}</Text>)}

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <PopupKonfirmasi/>
        <FlatList
          data={filterPesanan}
          keyExtractor={(_, index) => index.toString()}
          ListEmptyComponent={() => (
            <View style={[styles.card, {alignItems: "center", justifyContent: "center", padding: 20, marginTop: 24}]}>
              <Ionicons name="warning" size={96} color="#D32F2F"/>
              <Text style={{fontSize: 16, fontWeight: "bold", color: '#2196F3'}}>
                Riwayat Pembatalan Kosong...
              </Text>
              <Text>
                Silahkan refund tiket terlebih dahulu!
              </Text>
            </View>
          )}
          renderItem={({item}) => {
            return (
              <TouchableOpacity style={[styles.card, {marginTop: (item == filterPesanan[0]) ? 24 : 0} ]} onPress={() => {setTiketBatal(item); setTampilModal(true)}}>
                <View style={styles.cardSection}>
                  <View>
                    {/* Gambar kapal */}
                    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width={48} height={48}>
                      <Path fill='#2196F3' d="M24.645 21.77a1.592 1.597 0 0 1 .693 0l9.046 2.02-.848-5.391a1.156 1.16 0 0 0-1.14-.979l-2.521-.007-.413-5.117a1.157 1.157 0 0 0-1.15-1.066l-1.716-.005.008-2.968a1.595 1.595 0 0 0-1.588-1.602h-.005c-.877 0-1.59.713-1.592 1.594l-.008 2.968-1.672-.005a1.157 1.157 0 0 0-1.154 1.06l-.44 5.115-2.49-.007a1.156 1.16 0 0 0-1.144.973l-.885 5.434zm-9.243 14.75a8.097 8.097 0 0 1 4.8-1.56c1.749 0 3.414.547 4.8 1.56a8.097 8.097 0 0 1 4.8-1.56c1.749 0 3.413.547 4.799 1.559a8.087 8.112 0 0 1 1.902-1.032l2.203-6.119a1.156 1.16 0 0 0-.836-1.525l-12.878-2.876-12.859 2.875a1.156 1.16 0 0 0-.836 1.526l2.204 6.121a8.08 8.105 0 0 1 1.901 1.03zm27.525 3.098c-.942-.945-2.194-1.465-3.526-1.465s-2.585.52-3.527 1.465c-.34.341-.792.529-1.273.529s-.934-.188-1.274-.53c-.972-.974-2.25-1.462-3.526-1.462s-2.554.488-3.526 1.463c-.34.341-.793.529-1.274.529s-.934-.188-1.274-.53c-.972-.974-2.25-1.462-3.526-1.462s-2.554.488-3.526 1.463a1.793 1.793 0 0 1-1.274.528c-.461 0-.922-.176-1.274-.528-.972-.975-2.249-1.463-3.526-1.463s-2.554.488-3.526 1.463a1.601 1.601 0 0 0 0 2.259c.622.624 1.63.624 2.252 0 .352-.352.813-.528 1.274-.528s.923.176 1.274.528c.972.975 2.25 1.463 3.526 1.463s2.554-.488 3.526-1.463c.351-.352.813-.528 1.274-.528s.923.176 1.274.528A4.946 4.946 0 0 0 25 43.342c1.332 0 2.584-.52 3.526-1.465.351-.352.812-.528 1.274-.528s.922.176 1.274.528a4.946 4.946 0 0 0 3.526 1.465c1.332 0 2.584-.52 3.526-1.465.34-.341.792-.53 1.273-.53s.934.189 1.274.53c.622.624 1.63.624 2.253 0a1.601 1.601 0 0 0 0-2.26z" />
                    </Svg>
                  </View>
                  <View>
                    <Text><Bold>ID Kapal:</Bold></Text>
                    <Text>{item.idKapal}</Text>
                  </View>
                </View>

                <View style={styles.cardSection}>
                  <View>
                    {/* Gambar pelabuhan */}
                    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width={48} height={48}>
                      <Path fill='#2196F3' d="M23.449 5.443a15.352 15.352 0 0 0-8.442 3.725c-1.891 1.679-3.398 3.914-4.217 6.264-1.572 4.52-.966 9.179 1.802 13.822 1.203 2.014 2.792 4.028 6.182 7.828 2.849 3.193 4.888 5.707 5.78 7.123.37.573.516.573.893-.024.41-.647 2.096-2.858 3.005-3.947.475-.565 1.769-2.047 2.882-3.308 3.062-3.448 4.217-4.864 5.429-6.682 3.734-5.576 4.307-11.398 1.654-16.622-1.49-2.923-3.742-5.166-6.665-6.632-2.62-1.31-5.462-1.842-8.303-1.547zm2.571 6.14c.63.238 1.27.836 1.564 1.483.188.434.23.622.23 1.17 0 .779-.181 1.237-.852 2.13-.524.704-.729 1.13-.737 1.53v.312l.557.016c1.384.041 1.326-.008 1.326 1.064 0 1.147.017 1.13-1.023 1.13h-.86v4.61l.41-.056c.86-.115 2.104-.664 2.824-1.245l.246-.196h-.581c-.418 0-.615-.033-.688-.123-.238-.295-.033-.467 1.94-1.679 1.064-.655 1.998-1.195 2.08-1.212.074-.016.196.058.27.164.115.156.131.5.131 2.383 0 1.359-.033 2.26-.081 2.358-.05.09-.172.155-.287.155-.188 0-.27-.09-.925-.982-.017-.017-.123.09-.246.246-.458.597-1.285 1.4-1.867 1.801-.327.23-1.13.696-1.768 1.032-1.204.639-1.998 1.163-2.35 1.54-.115.114-.262.212-.336.212s-.221-.098-.336-.213c-.352-.376-1.146-.9-2.35-1.54-.639-.335-1.441-.802-1.769-1.031-.581-.401-1.408-1.204-1.867-1.802-.123-.155-.229-.262-.245-.246-.655.893-.737.983-.925.983-.115 0-.238-.065-.287-.155-.05-.098-.082-.999-.082-2.358 0-1.883.017-2.227.131-2.383.074-.106.197-.18.27-.164.082.017 1.016.557 2.08 1.212 1.973 1.212 2.178 1.384 1.94 1.679-.073.09-.27.123-.687.123l-.582.008.23.18c.687.565 1.99 1.138 2.84 1.253l.41.057v-4.61h-.86c-1.04 0-1.023.017-1.023-1.13 0-.925.057-1.032.565-1.04.164-.008.524-.016.81-.024l.508-.016v-.287c0-.41-.172-.77-.729-1.54-.712-.982-.86-1.35-.86-2.145 0-.548.033-.737.23-1.17.295-.63.933-1.245 1.547-1.483.59-.221 1.458-.23 2.064 0z" />
                      <Path fill='#2196F3' d="M24.464 12.656a1.653 1.653 0 0 0-.556 2.785c.303.286.598.393 1.097.393.524 0 .876-.148 1.195-.516.917-1.048.279-2.637-1.113-2.727-.205-.016-.483.008-.623.065z" />
                    </Svg>
                  </View>
                  <View>
                    <Text><Bold>Pelabuhan:</Bold></Text>
                    <Text>Asal: {item.asal}</Text>
                    <Text>Tujuan: {item.tujuan}</Text>
                  </View>
                </View>

                <View style={styles.cardSection}>
                  <View>
                    {/* Gambar jam */}
                    <Ionicons name="time" size={36} style={{marginHorizontal: 6}} color="#2196F3"/>
                  </View>
                  <View>
                    <Text><Bold>Jadwal Berangkat:</Bold></Text>
                    <Text>Tanggal: {item.tanggal}</Text>
                    <Text>Jam: {item.jam} WIB</Text>
                  </View>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={{flex: 1, height: 1, backgroundColor: 'black', marginVertical: 8, marginHorizontal: 12}}/>
                </View>

                <View style={styles.cardSection}>
                  <View>
                    {/* Gambar status ceklis */}
                    <Ionicons name="close-circle" size={36} style={{marginHorizontal: 6}} color="#D32F2F"/>
                  </View>
                  <View>
                    <Text><Bold>Info Lainnya:</Bold></Text>
                    <Text>Status: Dibatalkan</Text>
                    <Text>Layanan: {item.kelas} (1 orang)</Text>
                    <Text>Harga: Rp {item.totalHarga}</Text>
                  </View>
                </View>

              </TouchableOpacity>
            )
          }}
        />
      </View>
    </View>
  )
}

export default ListPembatalan

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    width: '100%'
  },
  body: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#BBDEFB',
    height: "100%"
  },
  card: {
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
    padding: 8,
    borderRadius: 18,
    minWidth: '70%'
  },
  cardSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 4,
    paddingRight: 8
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