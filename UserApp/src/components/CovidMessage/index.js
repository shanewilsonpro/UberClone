import React from 'react';
import {View, Text} from 'react-native';

import styles from './styles';

const CovidMessage = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Travel only if necessary</Text>
      <Text style={styles.text}>
        Upgrading this package often requires the font files linked to your
        projects
      </Text>
      <Text style={styles.learnMore}>Learn More </Text>
    </View>
  );
};

export default CovidMessage;
