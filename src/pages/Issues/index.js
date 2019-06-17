import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View, ActivityIndicator, FlatList, Text, TouchableOpacity,
} from 'react-native';
import Header from '~/components/Header';
import api from '~/services/api';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import { FILTER_ALL, FILTER_CLOSED, FILTER_OPEN } from './FilterTypes';
import IssueItem from './IssueItem';

export default class Issues extends Component {
  state = {
    loading: true,
    error: false,
    data: [],
    page: 1,
    filter: FILTER_ALL,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      getParam: PropTypes.func,
    }).isRequired,
  };

  componentDidMount() {
    this.fetchData(1, FILTER_ALL);
  }

  getRepo = () => {
    const { navigation } = this.props;
    return navigation.getParam('repository', '/');
  };

  fetchData = async (page = 1, filter = FILTER_ALL) => {
    this.setState({ loading: true });
    const repository = this.getRepo();
    try {
      const { data } = await api.get(`/repos/${repository}/issues`, {
        params: {
          page,
          state: filter,
        },
      });
      this.setState({
        data,
      });
    } catch (error) {
      this.setState({
        error,
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  setPage = (newPage) => {
    const { page, filter } = this.state;
    if (page !== newPage) {
      this.setState({ page: newPage });
      this.fetchData(newPage, filter);
    }
  };

  setFilter = (newFilter) => {
    const { filter } = this.state;
    if (newFilter !== filter) {
      this.setState({ filter: newFilter });
      this.fetchData(1, newFilter);
    }
  };

  render() {
    const { navigation } = this.props;
    const {
      data, loading, error, page, filter,
    } = this.state;
    const repository = this.getRepo();
    return (
      <View style={styles.container}>
        <Header title={repository.split('/')[1]} previous="Repositories" navigation={navigation} />
        {!!error && <Text style={styles.errorText}>{error.getMessage()}</Text>}
        <View style={styles.filterContainer}>
          <TouchableOpacity
            disabled={filter === FILTER_ALL}
            onPress={() => this.setFilter(FILTER_ALL)}
            style={styles.filterButton}
          >
            <Text
              style={
                filter === FILTER_ALL ? styles.filterButtonActive : styles.filterButtonInactive
              }
            >
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={filter === FILTER_OPEN}
            onPress={() => this.setFilter(FILTER_OPEN)}
            style={styles.filterButton}
          >
            <Text
              style={
                filter === FILTER_OPEN ? styles.filterButtonActive : styles.filterButtonInactive
              }
            >
              Open
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={filter === FILTER_CLOSED}
            onPress={() => this.setFilter(FILTER_CLOSED)}
            style={styles.filterButton}
          >
            <Text
              style={
                filter === FILTER_CLOSED ? styles.filterButtonActive : styles.filterButtonInactive
              }
            >
              Closed
            </Text>
          </TouchableOpacity>
        </View>
        {loading ? (
          <ActivityIndicator style={styles.loading} size="large" />
        ) : (
          <FlatList
            data={data}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => <IssueItem issue={item} />}
          />
        )}
        <View style={styles.pageContainer}>
          <TouchableOpacity disabled={page === 1} onPress={() => this.setPage(page - 1)}>
            <Icon name="chevron-left" />
          </TouchableOpacity>
          <Text>{`Page ${page}`}</Text>
          <TouchableOpacity disabled={data.length === 0} onPress={() => this.setPage(page + 1)}>
            <Icon name="chevron-right" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
