import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Modal
} from 'react-native'
import * as Contacts from 'expo-contacts'
import { Ionicons } from '@expo/vector-icons'
import DefaultAvatar from '../images/avatar.png'

const DaftarKontak = ({ navigation }) => {
  // List kontak keseluruhan
  const [ dataKontak, setDataKontak ] = useState(null)
  // Info kontak individual (untuk popup modal)
  const [ infoKontak, setInfoKontak ] = useState({
    firstName: null, lastName: null, phoneNumbers: [{number: null}], emails: [{email: null}], addresses: [{street: null}], company: null, jobTitle: null, note: null
  })
  // Set gambar default dari kontak
  const defaultAvatar = Image.resolveAssetSource(DefaultAvatar).uri
  // State untuk menampilkan/menyembunyikan modal informasi kontak
  const [ tampilModal, setTampilModal ] = useState(false)

  useEffect(() => {
    (async () => {
      // WARN: Jangan ubah nama variabel, respons akan "undefined"
      // Minta akses ke kontak pengguna
      const { status } = await Contacts.requestPermissionsAsync()
      // Jika akses ke kontak diizinkan
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [
            Contacts.Fields.ID,
            Contacts.Fields.FirstName,
            Contacts.Fields.LastName,
            Contacts.Fields.PhoneNumbers,
            Contacts.Fields.Emails,
            Contacts.Fields.Addresses,
            Contacts.Fields.Birthday,
            Contacts.Fields.Company,
            Contacts.Fields.JobTitle,
            Contacts.Fields.Note,
            Contacts.Fields.Image
          ]
        })
        if (data.length > 0) {
          setDataKontak(data)
          console.log("Kontak sudah berisi")
        } else {
          console.log("Kontak masih kosong")
        }
      } else {
        console.log("Akses kontak tidak diizinkan!")
      }
    })()
  }, [])

  // Modal popup untuk melihat detail tambahan kontak
  const PopupInformasi = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={tampilModal}
        onRequestClose={() => {setTampilModal(false)}}
      >
        <View style={styles.modalCenter}>
          <View style={styles.modalPopup}>
            <Text style={styles.modalTitle}>Detail Lanjutan</Text>
            <View style={{paddingBottom: 8, paddingLeft: 14}}>
              {(infoKontak.firstName) ? <><Text style={styles.modalKeyText}>Nama Depan</Text><Text style={styles.modalKeyValue}>{infoKontak.firstName}</Text></> : null}
              {(infoKontak.lastName) ? <><Text style={styles.modalKeyText}>Nama Belakang</Text><Text style={styles.modalKeyValue}>{infoKontak.lastName}</Text></> : null}
              {(infoKontak.phoneNumbers) ? <><Text style={styles.modalKeyText}>Nomor Telepon</Text><Text style={styles.modalKeyValue}>{infoKontak.phoneNumbers[0].number}</Text></> : null}
              {(infoKontak.emails) ? <><Text style={styles.modalKeyText}>Email</Text><Text style={styles.modalKeyValue}>{infoKontak.emails[0].email}</Text></> : null}
              {(infoKontak.addresses) ? <><Text style={styles.modalKeyText}>Alamat (Jalan)</Text><Text style={styles.modalKeyValue}>{infoKontak.addresses[0].street}</Text></> : null}
              {(infoKontak.company) ? <><Text style={styles.modalKeyText}>Perusahaan</Text><Text style={styles.modalKeyValue}>{infoKontak.company}</Text></> : null}
              {(infoKontak.jobTitle) ? <><Text style={styles.modalKeyText}>Pekerjaan</Text><Text style={styles.modalKeyValue}>{infoKontak.jobTitle}</Text></> : null}
              {(infoKontak.note) ? <><Text style={styles.modalKeyText}>Keterangan</Text><Text style={styles.modalKeyValue}>{infoKontak.note}</Text></> : null}
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              {/* Tombol untuk menghilangkan popup modal */}
              <TouchableOpacity onPress={() => setTampilModal(false)}>
                <Text style={styles.modalButton}>Kembali</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity onPress={() => ubahInfoKontak(infoKontak.id)}>
                <Text style={styles.modalButton}>Ubah</Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </View>
      </Modal>
    )
  }

  // Shorcut untuk teks tebal pada bagian-bagian tertentu
  const Bold = (props) => {
    return (
      <Text style={[{fontWeight: 'bold'}, props.style]} numberOfLines={props.numberOfLines}>{props.children}</Text>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <PopupInformasi/>
        <FlatList
          data={dataKontak}
          keyExtractor={item => item.id}
          renderItem={item => {
            // Workaround untuk nested object
            kontak = item.item

            return (
              <View style={styles.card}>
                {(kontak.image) ? <Image style={styles.avatar} source={{uri: kontak.image.uri}}/> : <Image style={styles.avatar} source={{uri: defaultAvatar}}/>}
                <View style={{maxWidth: '45%', overflow: 'hidden'}}>
                  <ScrollView>
                    {(kontak.lastName) ? <Bold style={{color: '#FF4081'}} numberOfLines={1}>{kontak.firstName} {kontak.lastName}</Bold> : <Bold style={{color: '#FF4081'}} numberOfLines={1}>{kontak.firstName}</Bold>}
                    {(kontak.phoneNumbers) ? <Text numberOfLines={1}>{kontak.phoneNumbers[0].number}</Text> : null}
                    {(kontak.emails) ? <Text numberOfLines={1}>{kontak.emails[0].email}</Text> : null}
                  </ScrollView>
                </View>
                  <TouchableOpacity style={{marginLeft: 'auto', alignSelf: 'center'}} onPress={() => {setInfoKontak(item.item); setTampilModal(true)}}>
                    <Ionicons name="md-information-circle" size={28} color="#007AFF" />
                  </TouchableOpacity>
                  <TouchableOpacity style={{marginLeft: 12, alignSelf: 'center'}}>
                    <Ionicons name="md-call" size={24} color="#007AFF"/>
                  </TouchableOpacity>
                  <TouchableOpacity style={{marginLeft: 12, alignSelf: 'center'}}>
                    <Ionicons name="md-chatbubble-ellipses" size={24} color="#007AFF"/>
                  </TouchableOpacity>
              </View>
            )
          }}
        />
      </View>
    </View>
  );
}

export default DaftarKontak

// Style untuk berbagai komponen yang ditampilkan
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#BBDEFB',
    flexDirection: 'column',
    height: '100%',
    width: '100%'
  },
  body: {

  },
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 12,
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '90%'
  },
  avatar: {
    width: 48,
    aspectRatio: 1/1,
    borderRadius: 48,
    marginRight: 14
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
    minWidth: '65%',
    elevation: 14
  },
  modalTitle: {
    alignSelf: 'center',
    color: '#2196F3',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12
  },
  modalKeyText: {
    fontWeight: 'bold',
    marginTop: 4,
    color: '#FF4081'
  },
  modalKeyValue: {
    // Null
  },
  modalButton: {
    backgroundColor: '#2196F3',
    color: '#FFFFFF',
    fontWeight: 'bold',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginLeft: 12,
    borderRadius: 18,
    marginTop: 4
  }
})