import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput
} from 'react-native'

import { Ionicons } from '@expo/vector-icons'

const Telepon = ({ navigation }) => {
  const [ noTelp, setNoTelp ] = useState("")
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.form}>
          <Text style={styles.formTitle}>Masukkan Nomor Telepon</Text>
          <TextInput
            onChangeText={setNoTelp}
            value={noTelp}
            keyboardType='phone-pad'
            style={styles.formInput}
          />
          {(noTelp !== "") && (
            <View style={styles.formChooserBody}>
              <TouchableOpacity style={styles.formChooserElements}>
                <Ionicons name="md-chatbubble-ellipses" size={24} color="#007AFF" />
                <Text style={styles.formChooserText}>Kirim SMS ke Nomor</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.formChooserElements}>
                <Ionicons name="md-call" size={24} color="#007AFF" />
                <Text style={styles.formChooserText}>Telepon ke Nomor</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.formChooserElements} onPress={() => navigation.navigate("Tambah Baru", {passNoTelp: noTelp})}>
                <Ionicons name="md-person-add" size={24} color="#007AFF" />
                <Text style={styles.formChooserText}>Tambahkan Kontak</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  )
}

export default Telepon

// Style untuk berbagai komponen yang ditampilkan
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: '100%',
    width: '100%'
  },
  body: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#BBDEFB',
    height: '100%'
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
    marginBottom: 18,
    color: '#FF4081'
  },
  formInput: {
    borderBottomWidth: 2,
    borderColor: '#2196F3',
    height: 36,
    fontSize: 24,
    textAlign: 'center'
  },
  formChooserBody: {
    marginTop: 10
  },
  formChooserElements: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12
  },
  formChooserText: {
    marginLeft: 8
  }
})