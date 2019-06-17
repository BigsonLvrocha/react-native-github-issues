import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Repositories from '~/pages/Repositories';
import Issues from '~/pages/Issues';

export default createAppContainer(
  createSwitchNavigator(
    {
      Repositories,
      Issues,
    },
    {
      initialRouteName: 'Repositories',
    },
  ),
);
