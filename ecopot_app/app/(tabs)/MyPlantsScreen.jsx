import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const MyPlantsScreen = ({ navigation }) => {
  const [plants, setPlants] = useState([
    { id: '1', name: 'Fiddle Leaf Fig', species: 'Ficus lyrata', image: require('./plant9.jpg'), daysUntilWatering: 3, health: 'good' },
    { id: '2', name: 'Snake Plant', species: 'Sansevieria', image: require('./plant10.jpg'), daysUntilWatering: 7, health: 'warning' },
    { id: '3', name: 'Monstera', species: 'Monstera deliciosa', image: require('./plant11.jpg'), daysUntilWatering: 5, health: 'good' },
  ]);
  
  const getHealthColor = (health) => {
    switch(health) {
      case 'good': return '#4CAF50';
      case 'warning': return '#FFC107';
      case 'danger': return '#F44336';
      default: return '#4CAF50';
    }
  };

  const renderPlantItem = ({ item }) => (
    <TouchableOpacity style={styles.plantCard}>
      <Image source={item.image} style={styles.plantImage} />
      <LinearGradient
        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
        style={styles.plantImageOverlay}
      />
      <View style={styles.plantInfo}>
        <View style={styles.plantNameRow}>
          <Text style={styles.plantName}>{item.name}</Text>
          <View style={[styles.healthIndicator, {backgroundColor: getHealthColor(item.health)}]} />
        </View>
        <Text style={styles.plantSpecies}>{item.species}</Text>
        <View style={styles.wateringRow}>
          <Ionicons name="water-outline" size={16} color="#2196F3" style={styles.waterIcon} />
          <Text style={styles.wateringInfo}>
            Next watering: <Text style={styles.wateringDays}>{item.daysUntilWatering} days</Text>
          </Text>
        </View>
        <View style={styles.plantActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="water" size={18} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="sunny-outline" size={18} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="leaf-outline" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('./plantt.jpg')} 
        style={styles.headerBackground}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.3)', 'rgba(46,125,50,0.9)']}
          style={styles.headerGradient}
        >
          <View style={styles.headerTopRow}>
            <View style={styles.logoContainer}>
              <Ionicons name="leaf" size={32} color="white" />
              <Text style={styles.appName}>GreenThumb</Text>
            </View>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="search-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.headerContent}>
            <Text style={styles.welcomeText}>My Plant Collection</Text>
            <Text style={styles.tagline}>Keep track of all your green friends</Text>
            <Text style={styles.dateText}>Friday, March 28, 2025, 4:44 PM IST</Text>
          </View>
        </LinearGradient>
      </ImageBackground>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{plants.length}</Text>
          <Text style={styles.statLabel}>Plants</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>2</Text>
          <Text style={styles.statLabel}>Need Water</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>1</Text>
          <Text style={styles.statLabel}>Need Care</Text>
        </View>
      </View>

      <FlatList
        data={plants}
        renderItem={renderPlantItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.plantList}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => navigation.navigate('AddPlant')}
      >
        <LinearGradient
          colors={['#4CAF50', '#2E7D32']}
          style={styles.addButtonGradient}
        >
          <Ionicons name="add" size={24} color="white" />
          <Text style={styles.addButtonText}>Add New Plant</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  headerBackground: {
    height: 180,
    width: '100%',
  },
  headerGradient: {
    height: '100%',
    width: '100%',
    justifyContent: 'space-between',
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 8,
  },
  iconButton: {
    marginLeft: 16,
  },
  headerContent: {
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  tagline: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  dateText: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    margin: 15,
    marginTop: -25,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  statDivider: {
    height: 30,
    width: 1,
    backgroundColor: '#e0e0e0',
  },
  plantList: {
    padding: 15,
  },
  plantCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  plantImage: {
    width: '100%',
    height: 150,
  },
  plantImageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 150,
  },
  plantInfo: {
    padding: 15,
  },
  plantNameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  plantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  healthIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  plantSpecies: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  wateringRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  waterIcon: {
    marginRight: 5,
  },
  wateringInfo: {
    fontSize: 14,
    color: '#666',
  },
  wateringDays: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
  plantActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  addButton: {
    margin: 15,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  addButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
});

export default MyPlantsScreen;
