import React from 'react';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

const Header = ({ navigation, title, previous }) => (
  <View style={styles.container}>
    <View>
      {!!previous && (
        <TouchableOpacity
          onPress={() => {
            console.log(navigation);
            console.log(previous);
            navigation.navigate(previous);
          }}
        >
          <Icon name="chevron-left" size={25} style={styles.backButton} />
        </TouchableOpacity>
      )}
    </View>
    <Text style={styles.title}>{title}</Text>
    <View />
  </View>
);

Header.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
  title: PropTypes.string.isRequired,
  previous: PropTypes.string,
};

Header.defaultProps = {
  navigation: {
    navigate: () => {
      console.log('oi');
    },
  },
  previous: null,
};

export default withNavigation(Header);
