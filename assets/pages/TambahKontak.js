import React, { useState, useLayoutEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput
} from 'react-native'

// API Expo untuk mengelola kontak dan gambar
import * as Contacts from 'expo-contacts'
import * as ImagePicker from 'expo-image-picker'
// Untuk icon form dan foto profil default kontak
import { Ionicons } from '@expo/vector-icons'
import DefaultAvatar from '../images/avatar.png'

const TambahKontak = ({ route, navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={simpanKontak}>
          <Text style={{marginRight: 12, fontWeight: 'bold', color: '#FF4081'}}>Simpan</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation])

  // Passing parameter dari screen telepon
  const { passNoTelp } = route.params
  if (route.params.passNoTelp) navigation.setParams({passNoTelp: null})

  // Nama kontak yang ingin ditambah
  const [ namaDepan, setNamaDepan ] = useState("") // FirstName
  const [ namaBlkng, setNamaBlkng ] = useState("") // LastName
  // Set nomor telepon dari kontak
  const [ noTelp, setNoTelp ] = useState(passNoTelp) // PhoneNumbers
  // Set alamat (email dan fisik) dari kontak
  const [ email, setEmail ] = useState("") // Emails
  const [ alamat, setAlamat ] = useState("") // Addresses
  // Set perusahaan dan pekerjaan dari kontak
  const [ perusahaan, setPerusahaan ] = useState("") // Company
  const [ pekerjaan, setPekerjaan ] = useState("") // JobTitle
  // Set keterangan dari kontak (pribadi, bisnis, dsb)
  const [ keterangan, setKeterangan ] = useState("") // Note
  // Set gambar dari kontak
  const defaultAvatar = Image.resolveAssetSource(DefaultAvatar).uri
  const [ avatar, setAvatar ] = useState(defaultAvatar) // Image

  const ambilGambar = async () => {
    let hasil = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    })

    console.log("Status pengambilan gambar:", hasil)
    if (!hasil.cancelled) {
      setAvatar(hasil.uri)
    }
  }

  const simpanKontak = async () => {
    // Jangan lanjutkan bila nama depan dan nomor telepon kosong
    if (namaDepan && noTelp !== "") {
      let kontakBaru = {
        [Contacts.Fields.FirstName]: namaDepan,
        [Contacts.Fields.PhoneNumbers]: [{ number: noTelp }]
      }

      // Data kontak opsional
      if (namaBlkng) kontakBaru[Contacts.Fields.LastName] = namaBlkng
      if (email) kontakBaru[Contacts.Fields.Emails] = [{ email: email }]
      if (alamat) kontakBaru[Contacts.Fields.Addresses] = [{ street: alamat }]
      if (perusahaan) kontakBaru[Contacts.Fields.Company] = perusahaan
      if (pekerjaan) kontakBaru[Contacts.Fields.JobTitle] = pekerjaan
      if (keterangan) kontakBaru[Contacts.Fields.Note] = keterangan
      if (avatar != defaultAvatar) kontakBaru[Contacts.Fields.Image] = [{ uri: avatar }]
      console.log(kontakBaru)

      // Tambah kontak dan alihkan halaman
      navigation.navigate('Kontak')
      const { status } = await Contacts.addContactAsync(kontakBaru)
      console.log("Status penambahan kontak:", status)
    }
  }

  // Shorcut untuk teks tebal pada bagian-bagian tertentu
  const Bold = (props) => {
    return (
      <Text style={[{fontWeight: 'bold'}, props.style]}>{props.children}</Text>
    )
  }

  const Required = (props) => {
    return (
      <Text style={{fontWeight: 'bold', color: '#D32F2F'}}>{props.children}</Text>
    )
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={ambilGambar}>
          <Image
            style={styles.profileImage}
            source={{
              uri: avatar,
            }}
          />
        </TouchableOpacity>

      </View>

      <View style={styles.body}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.form}>

          <View style={styles.formElement}>
            <Ionicons name="md-person" size={36} color="#007AFF"/>
            <View>
              <Text style={styles.formDesc}><Bold>Nama Depan</Bold><Required> *</Required></Text>
              <TextInput
                style={styles.formTextInput}
                onChangeText={setNamaDepan}
                value={namaDepan}
              />
            </View>
          </View>

          <View style={styles.formElement}>
            <Ionicons name="md-person" size={36} color="#007AFF"/>
            <View>
              <Text style={styles.formDesc}><Bold>Nama Belakang</Bold></Text>
              <TextInput
                style={styles.formTextInput}
                onChangeText={setNamaBlkng}
                value={namaBlkng}
              />
            </View>
          </View>

          <View style={styles.formElement}>
            <Ionicons name="md-call" size={36} color="#007AFF"/>
            <View>
              <Text style={styles.formDesc}><Bold>Nomor Telepon</Bold><Required> *</Required></Text>
              <TextInput
                style={styles.formTextInput}
                onChangeText={setNoTelp}
                value={noTelp}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.formElement}>
            <Ionicons name="md-mail" size={36} color="#007AFF"/>
            <View>
              <Text style={styles.formDesc}><Bold>Email</Bold></Text>
              <TextInput
                style={styles.formTextInput}
                onChangeText={setEmail}
                value={email}
                keyboardType="email-address"
              />
            </View>
          </View>

          <View style={styles.formElement}>
            <Ionicons name="md-location" size={36} color="#007AFF"/>
            <View>
              <Text style={styles.formDesc}><Bold>Alamat (Jalan)</Bold></Text>
              <TextInput
                style={styles.formTextInput}
                onChangeText={setAlamat}
                value={alamat}
              />
            </View>
          </View>

          <View style={styles.formElement}>
            <Ionicons name="md-business" size={36} color="#007AFF"/>
            <View>
              <Text style={styles.formDesc}><Bold>Perusahaan</Bold></Text>
              <TextInput
                style={styles.formTextInput}
                onChangeText={setPerusahaan}
                value={perusahaan}
              />
            </View>
          </View>

          <View style={styles.formElement}>
            <Ionicons name="md-briefcase" size={36} color="#007AFF"/>
            <View>
              <Text style={styles.formDesc}><Bold>Pekerjaan</Bold></Text>
              <TextInput
                style={styles.formTextInput}
                onChangeText={setPekerjaan}
                value={pekerjaan}
              />
            </View>
          </View>

          <View style={styles.formElement}>
            <Ionicons name="md-document-text" size={36} color="#007AFF"/>
            <View>
              <Text style={styles.formDesc}><Bold>Keterangan</Bold></Text>
              <TextInput
                style={[styles.formTextInput, {marginBottom: 0}]}
                onChangeText={setKeterangan}
                value={keterangan}
              />
            </View>
          </View>

        </View>
        </ScrollView>
      </View>

    </View>
  )
}

export default TambahKontak

// Style untuk berbagai komponen yang ditampilkan
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#BBDEFB',
    flexDirection: 'column',
    height: '100%',
    width: '100%'
  },
  header: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#BBDEFB'
  },
  profileImage: {
    height: '80%',
    aspectRatio: 1/1,
    borderRadius: 50,
    marginTop: 18
  },
  body: {
    flex: 7,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: '#FFFFFF',
  },
  form: {
    padding: 40
  },
  formElement: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  formDesc: {
    marginLeft: 8,
    marginBottom: 3,
    color: '#FF4081'
  },
  formTextInput: {
    marginLeft: 8,
    marginBottom: 14,
    paddingHorizontal: 8,
    width: 240,
    backgroundColor: '#F0F0F0',
    borderRadius: 10
  }
})