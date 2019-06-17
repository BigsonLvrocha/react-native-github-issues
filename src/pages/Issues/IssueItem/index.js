import React from 'react';

import {
  View, Text, Image, TouchableOpacity, Linking,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

// import { Container } from './styles';

const navigateToIssue = async (url) => {
  try {
    await Linking.openURL(url);
  } catch (e) {
    // do nothing, no worries
  }
};

const IssueItem = ({ issue }) => (
  <View style={styles.container}>
    <Image source={{ uri: issue.user.avatar_url }} style={styles.avatar} />
    <View style={styles.contentContainter}>
      <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>
        {issue.title}
      </Text>
      <Text stule={styles.user}>{issue.user.login}</Text>
    </View>
    <TouchableOpacity
      onPress={() => {
        navigateToIssue(issue.html_url);
      }}
      style={styles.linkContainer}
    >
      <Icon name="chevron-right" size={10} style={styles.link} />
    </TouchableOpacity>
  </View>
);

IssueItem.propTypes = {
  issue: PropTypes.shape({
    html_url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    user: PropTypes.shape({
      avatar_url: PropTypes.string.isRequired,
      login: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default IssueItem;
