import React, {useState, useEffect} from 'react';
import {View, SafeAreaView} from 'react-native';

import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

import styles from './styles';

const DestinationSearch = props => {
  const [originPlace, setOriginPlace] = useState(null);
  const [destinationPlace, setDestinationPlace] = useState(null);

  useEffect(() => {
    console.warn('useEffect is called');
    if (originPlace && destinationPlace) {
      console.warn('Redirect to results');
    }
  }, [originPlace, destinationPlace]);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <GooglePlacesAutocomplete
          placeholder="Where from?"
          onPress={(data, details = null) => {
            setOriginPlace({data, details});
          }}
          styles={{
            textInputContainer: styles.textInput,
          }}
          fetchDetails
          query={{
            key: 'AIzaSyB5G0A7q7IeU1SztDW2PGnrsWy0Hx60lX8',
            language: 'en',
          }}
        />

        <GooglePlacesAutocomplete
          placeholder="Where to?"
          onPress={(data, details = null) => {
            setDestinationPlace({data, details});
          }}
          styles={{
            textInputContainer: styles.textInput,
          }}
          fetchDetails
          query={{
            key: 'AIzaSyB5G0A7q7IeU1SztDW2PGnrsWy0Hx60lX8',
            language: 'en',
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default DestinationSearch;
