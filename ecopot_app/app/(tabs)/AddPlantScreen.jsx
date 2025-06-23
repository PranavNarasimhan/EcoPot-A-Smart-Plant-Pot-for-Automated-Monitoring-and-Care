import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

// Helper to render any value (string, array, object) in a readable way
function renderValue(val) {
  if (Array.isArray(val)) {
    return val.map((item, idx) =>
      typeof item === 'object' && item !== null
        ? <View key={idx} style={{ marginLeft: 10 }}>{renderObject(item)}</View>
        : <Text key={idx} style={styles.valueText}>{item}</Text>
    );
  }
  if (typeof val === 'object' && val !== null) {
    return renderObject(val);
  }
  return <Text style={styles.valueText}>{String(val)}</Text>;
}

function renderObject(obj) {
  return Object.entries(obj).map(([k, v]) => (
    <View key={k} style={styles.fieldRow}>
      <Text style={styles.bold}>{k.replace(/_/g, ' ')}: </Text>
      {renderValue(v)}
    </View>
  ));
}

export default function PlantIdScreen() {
  const [image, setImage] = useState(null);
  const [plantInfo, setPlantInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const pickImage = async () => {
    setError('');
    setPlantInfo(null);
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 1,
        base64: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        setImage(asset.uri);
        identifyPlant(asset.base64);
      } else if (result.canceled) {
        // User cancelled, do nothing
      } else {
        setError('No image selected.');
      }
    } catch (err) {
      setError('Error picking image: ' + err.message);
    }
  };

  const identifyPlant = async (base64Image) => {
    setLoading(true);
    setError('');
    setPlantInfo(null);
    try {
      const response = await axios.post('https://api.plant.id/v2/identify', {
        api_key: 'c9czeCIkpELnEvQRyVRIc1arB47tCp7HLjAa67PyYvNNg3kxPh',
        images: [`data:image/jpeg;base64,${base64Image}`],
        modifiers: ['crops_fast', 'similar_images', 'health_all'],
        plant_language: 'en',
        plant_details: [
          'common_names',
          'scientific_name',
          'wiki_description',
          'watering',
          'sunlight',
          'growth_rate',
          'temperature_minimum',
          'humidity',
          'propagation_methods',
          'edible_parts',
        ]
      });

      const suggestions = response.data?.suggestions;
      if (suggestions && suggestions.length > 0) {
        setPlantInfo(suggestions[0]);
      } else {
        setError('Plant not recognized.');
      }
    } catch (err) {
      setError('Failed to identify plant.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Identify a Plant</Text>

      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Ionicons name="image-outline" size={48} color="#4CAF50" />
            <Text style={styles.pickText}>Tap to select image from gallery</Text>
          </View>
        )}
      </TouchableOpacity>

      {loading && (
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={{ color: '#4CAF50', marginTop: 10 }}>Identifying plant...</Text>
        </View>
      )}

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {plantInfo && (
        <View style={styles.resultCard}>
          <View style={styles.resultHeader}>
            <Ionicons name="leaf-outline" size={28} color="#2E7D32" style={{ marginRight: 8 }} />
            <Text style={styles.resultTitle}>Plant Details</Text>
          </View>
          <View style={styles.resultContent}>
            {Object.entries(plantInfo).map(([key, value]) => {
              // Skip fields you don't want to show (like images, id, probability)
              if (key === 'similar_images' || key === 'id' || key === 'probability') return null;
              return (
                <View key={key} style={styles.fieldRow}>
                  <Text style={styles.bold}>{key.replace(/_/g, ' ')}: </Text>
                  {renderValue(value)}
                </View>
              );
            })}
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#f8f8f8',
    flexGrow: 1,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 1,
  },
  imagePicker: {
    height: 220,
    backgroundColor: '#e0e0e0',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#C8E6C9',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  pickText: {
    color: '#4CAF50',
    fontSize: 16,
    marginTop: 10,
    fontWeight: '500',
  },
  errorText: {
    color: '#F44336',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginTop: 10,
    marginBottom: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  resultContent: {
    marginTop: 5,
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  fieldRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginBottom: 6,
    width: '100%',
  },
  bold: {
    fontWeight: 'bold',
    color: '#333',
    textTransform: 'capitalize',
    flexShrink: 1,
  },
  valueText: {
    flexShrink: 1,
    flexWrap: 'wrap',
    color: '#555',
    fontSize: 14,
  },
});
