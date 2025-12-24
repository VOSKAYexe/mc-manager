import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { WebView } from 'react-native-webview';

export default function App() {
  const [mode, setMode] = useState('home'); 
  const [ip, setIp] = useState('http://192.168.1.15:3000');
  const [permission, requestPermission] = useCameraPermissions();

  const handleBarCodeScanned = ({ data }) => {
    setIp(data);
    setMode('web');
  };

  const startScan = async () => {
    if (!permission?.granted) {
      const { granted } = await requestPermission();
      if (!granted) {
        Alert.alert("Permission refusée", "Besoin de la caméra !");
        return;
      }
    }
    setMode('scan');
  };

  if (mode === 'web') {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
        <TouchableOpacity style={styles.closeBtn} onPress={() => setMode('home')}>
          <Text style={styles.btnText}>Fermer / Déconnecter</Text>
        </TouchableOpacity>
        <WebView source={{ uri: ip }} style={{ flex: 1 }} onError={() => Alert.alert("Erreur", "Lien inaccessible")} />
      </SafeAreaView>
    );
  }

  if (mode === 'scan') {
    return (
      <View style={styles.container}>
        <CameraView
          style={StyleSheet.absoluteFillObject}
          facing="back"
          onBarcodeScanned={handleBarCodeScanned}
          barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        />
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>Scanne le QR Code</Text>
          <TouchableOpacity style={styles.cancelBtn} onPress={() => setMode('home')}>
            <Text style={styles.btnText}>Annuler</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>MC MANAGER</Text>
      <Text style={styles.subtitle}>Télécommande Mobile</Text>
      <View style={styles.card}>
        <Text style={styles.label}>IP Manuelle</Text>
        <TextInput
          style={styles.input}
          onChangeText={setIp}
          value={ip}
          placeholder="http://192.168.x.x:3000"
          placeholderTextColor="#666"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.btnPrimary} onPress={() => setMode('web')}>
          <Text style={styles.btnTextPrimary}>CONNEXION</Text>
        </TouchableOpacity>
      </View>
      <Text style={{color:'#666', marginVertical:20}}>— OU —</Text>
      <TouchableOpacity style={styles.btnSecondary} onPress={startScan}>
        <Text style={styles.btnTextSecondary}>SCANNER QR CODE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', alignItems: 'center', justifyContent: 'center', padding: 20 },
  logo: { fontSize: 28, fontWeight: 'bold', color: '#4CAF50', marginBottom: 5 },
  subtitle: { color: '#888', marginBottom: 40 },
  card: { width: '100%', backgroundColor: '#1e1e1e', padding: 20, borderRadius: 10, borderWidth: 1, borderColor: '#333', marginBottom: 10 },
  label: { color: '#aaa', marginBottom: 10, fontSize: 12 },
  input: { backgroundColor: '#121212', color: 'white', padding: 15, borderRadius: 6, borderWidth: 1, borderColor: '#333', marginBottom: 15, fontSize: 16 },
  btnPrimary: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 6, alignItems: 'center' },
  btnTextPrimary: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  btnSecondary: { width: '100%', padding: 15, borderRadius: 6, alignItems: 'center', borderWidth: 1, borderColor: '#4CAF50' },
  btnTextSecondary: { color: '#4CAF50', fontWeight: 'bold', fontSize: 16 },
  closeBtn: { backgroundColor: '#d32f2f', padding: 15, alignItems: 'center' },
  btnText: { color: 'white', fontWeight: 'bold' },
  overlay: { flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 50 },
  overlayText: { color: 'white', fontSize: 18, marginBottom: 20, backgroundColor:'rgba(0,0,0,0.6)', padding:10 },
  cancelBtn: { backgroundColor: '#333', paddingVertical: 15, paddingHorizontal: 40, borderRadius: 30 }
});