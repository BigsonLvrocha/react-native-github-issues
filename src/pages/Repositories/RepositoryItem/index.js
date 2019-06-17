import React from 'react';
import {
  View, Text, Image, TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import styles from './styles';

const navigateToIssues = (navigation, repository) => {
  navigation.navigate('Issues', { repository: repository.full_name });
};

const RepositoryItem = ({ navigation, repository }) => (
  <View style={styles.container}>
    <Image style={styles.image} source={{ uri: repository.owner.avatar_url }} />
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{repository.name}</Text>
      <Text style={styles.subtitle}>{repository.owner.login}</Text>
    </View>
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigateToIssues(navigation, repository)}
    >
      <Icon name="chevron-right" />
    </TouchableOpacity>
  </View>
);

RepositoryItem.propTypes = {
  repository: PropTypes.shape({
    owner: PropTypes.shape({
      avatar_url: PropTypes.string.isRequired,
      login: PropTypes.string.isRequired,
    }).isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default RepositoryItem;
