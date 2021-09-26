import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, Text, Dimensions, Pressable} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import NewOrderPopup from '../../components/NewOrderPopup/index.js';
import styles from './styles.js';

const origin = {latitude: 28.450027, longitude: -16.163845};
const destination = {latitude: 37.771707, longitude: -122.4053769};
const GOOGLE_MAPS_APIKEY = 'AIzaSyB5G0A7q7IeU1SztDW2PGnrsWy0Hx60lX8';

const HomeScreen = props => {
  const [car, setCar] = useState(null);
  const [isOnline, setIsOnline] = useState(false);
  const [myPosition, setMyPosition] = useState(null);
  const [order, setOrder] = useState(null);
  const [newOrders, setNewOrders] = useState([]);

  const [newOrder, setNewOrder] = useState({
    id: '1',
    type: 'UberX',

    originLatitude: 28.453327,
    originLongitude: -16.263045,

    destLatitude: 28.450927,
    destLongitude: -16.260845,

    user: {
      rating: 4.9,
      name: 'Ciara',
    },
  });

  const onDecline = () => {
    setNewOrder(null);
  };

  const onAccept = newOrder => {
    setOrder(newOrder);
    setNewOrder(null);
  };

  const onGoPress = () => {
    setIsOnline(!isOnline);
  };

  const onUserLocationChange = event => {
    setMyPosition(event.nativeEvent.coordinate);
  };

  const onDirectionFound = event => {
    if (order) {
      setOrder({
        ...order,
        distance: event.distance,
        duration: event.duration,
        pickedUp: order.pickedUp || event.distance < 0.2,
        isFinished: order.pickedUp && event.distance < 0.2,
      });
    }
  };

  const getDestination = () => {
    if (order && order.pickedUp) {
      return {
        latitude: order.destLatitude,
        longitude: order.destLongitude,
      };
    }
    return {
      latitude: order.originLatitude,
      longitude: order.originLongitude,
    };
  };

  const renderBottomBar = () => {
    if (order && order.isFinished) {
      return (
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#cb1a1a',
              width: 200,
              padding: 10,
            }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              COMPLETE {order.type}
            </Text>
          </View>
          <Text style={styles.bottomText}>{order.user.username}</Text>
        </View>
      );
    }

    if (order && order.pickedUp) {
      return (
        <View style={{alignItems: 'center'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>{order.duration ? order.duration.toFixed(1) : '?'} min</Text>
            <View
              style={{
                backgroundColor: '#d41212',
                marginHorizontal: 10,
                width: 30,
                height: 30,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
              }}>
              <FontAwesome name={'user'} color={'white'} size={20} />
            </View>
            <Text>{order.distance ? order.distance.toFixed(1) : '?'} km</Text>
          </View>
          <Text style={styles.bottomText}>
            Dropping off {order?.user?.username}
          </Text>
        </View>
      );
    }

    if (order) {
      return (
        <View style={{alignItems: 'center'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>{order.duration ? order.duration.toFixed(1) : '?'} min</Text>
            <View
              style={{
                backgroundColor: '#1e9203',
                marginHorizontal: 10,
                width: 30,
                height: 30,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
              }}>
              <FontAwesome name={'user'} color={'white'} size={20} />
            </View>
            <Text>{order.distance ? order.distance.toFixed(1) : '?'} km</Text>
          </View>
          <Text style={styles.bottomText}>
            Picking up {order?.user?.username}
          </Text>
        </View>
      );
    }
    if (car?.isActive) {
      return <Text style={styles.bottomText}>You're online</Text>;
    }
    return <Text style={styles.bottomText}>You're offline</Text>;
  };

  return (
    <SafeAreaView>
      <MapView
        style={{width: '100%', height: Dimensions.get('window').height - 150}}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        onUserLocationChange={onUserLocationChange}
        initialRegion={{
          latitude: 28.450627,
          longitude: -16.263045,
          latitudeDelta: 0.0222,
          longitudeDelta: 0.0121,
        }}>
        {order && (
          <MapViewDirections
            origin={myPosition}
            onReady={onDirectionFound}
            destination={getDestination()}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={5}
            strokeColor="black"
          />
        )}
      </MapView>

      {/* Balance Button */}
      <Pressable
        onPress={() => console.warn('Balance')}
        style={styles.balanceButton}>
        <Text style={styles.balanceText}>
          <Text style={{color: 'green'}}>$</Text> 0.00
        </Text>
      </Pressable>

      {/* Menu Button */}
      <Pressable
        onPress={() => console.warn('Menu')}
        style={[styles.roundButton, {top: 10, left: 10}]}>
        <Entypo name={'menu'} size={24} color="#4a4a4a" />
      </Pressable>

      {/* Search Button */}
      <Pressable
        onPress={() => console.warn('Search')}
        style={[styles.roundButton, {top: 10, right: 10}]}>
        <FontAwesome name={'search'} size={24} color="#4a4a4a" />
      </Pressable>

      {/* Shield Button */}
      <Pressable
        onPress={() => console.warn('Shield')}
        style={[styles.roundButton, {bottom: 70, left: 10}]}>
        <Entypo name={'shield'} size={24} color="#4a4a4a" />
      </Pressable>

      {/* Go or End Button */}
      <Pressable onPress={onGoPress} style={styles.goButton}>
        <Text style={styles.goText}>{isOnline ? 'END' : 'GO'}</Text>
      </Pressable>

      <View style={styles.bottomContainer}>
        <Ionicons name={'options'} size={30} color="#4a4a4a" />
        {renderBottomBar()}
        <Entypo name={'menu'} size={30} color="#4a4a4a" />
      </View>

      {newOrder && (
        <NewOrderPopup
          newOrder={newOrder}
          duration={2}
          distance={0.5}
          onDecline={onDecline}
          onAccept={() => onAccept(newOrder)}
        />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
