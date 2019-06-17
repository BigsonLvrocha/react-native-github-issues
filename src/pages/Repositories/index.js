import React, { Component } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ActivityIndicator, FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import api from '~/services/api';
import Header from '~/components/Header';
import styles from './styles';
import RepositoryItem from './RepositoryItem';

export default class Repositories extends Component {
  state = {
    data: [],
    repositoryInput: '',
    error: false,
    loading: false,
    refreshing: false,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  async componentDidMount() {
    const data = JSON.parse(await AsyncStorage.getItem('@gitissues/repositories'));
    this.setState({
      data: data === null ? [] : data,
    });
  }

  async componentWillUpdate(props, { data }) {
    await AsyncStorage.setItem('@gitissues/repositories', JSON.stringify(data));
  }

  addRepository = async () => {
    const { repositoryInput, data } = this.state;
    if (!repositoryInput || !repositoryInput.includes('/')) {
      return;
    }
    this.setState({ loading: true });
    try {
      const { data: apiData } = await api.get(`/repos/${repositoryInput}`);
      if (data.findIndex(item => item.id === apiData.id) !== -1) {
        this.setState({
          error: 'repository in array',
        });
        return;
      }
      this.setState({
        data: [...data, apiData],
        error: false,
      });
    } catch (e) {
      this.setState({
        error: 'repository not found',
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  refreshRepository = async (repository) => {
    const { data: stateData } = this.state;
    const { data } = await api.get(`repos/${repository.full_name}`);
    const dataIndex = stateData.findIndex(item => item.id === data.id);
    if (dataIndex !== -1) {
      stateData.splice(dataIndex, 1, data);
      this.setState({
        data: stateData,
      });
    }
  };

  refreshRepositories = async () => {
    const { data } = this.state;
    try {
      this.setState({ refreshing: false });
      const refreshes = data.map(repository => this.refreshRepository(repository));
      await Promise.all(refreshes);
    } catch (e) {
      this.setState({ error: 'error in refresh' });
    } finally {
      this.setState({ refreshing: false });
    }
  };

  resetStorage = () => {
    this.setState({
      data: [],
    });
  };

  render() {
    const {
      data, repositoryInput, error, loading, refreshing,
    } = this.state;
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Header title="Gitissues" />
        <View style={styles.addContainer}>
          <TextInput
            style={styles.addInput}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Digite um repositório"
            underlineColorAndroid="transparent"
            value={repositoryInput}
            onChangeText={text => this.setState({ repositoryInput: text })}
          />
          {loading ? (
            <ActivityIndicator />
          ) : (
            <TouchableOpacity onPress={this.addRepository} style={styles.addIconContainer}>
              <Icon style={styles.addIcon} name="plus" size={30} />
            </TouchableOpacity>
          )}
        </View>

        {!error || <Text style={styles.errorText}>{error}</Text>}
        <FlatList
          data={data}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <RepositoryItem repository={item} navigation={navigation} />}
          refreshing={refreshing}
          onRefresh={this.refreshRepositories}
        />
        <TouchableOpacity onPress={this.resetStorage}>
          <Text>Clear</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
