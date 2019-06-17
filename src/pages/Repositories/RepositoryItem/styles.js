import { StyleSheet } from 'react-native';
import { metrics, colors } from '~/styles';

export default StyleSheet.create({
  container: {
    borderRadius: metrics.baseRadius,
    paddingHorizontal: metrics.basePadding,
    paddingVertical: metrics.basePadding,
    marginHorizontal: metrics.basePadding,
    flexDirection: 'row',
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    alignContent: 'center',
    marginTop: metrics.baseMargin,
  },
  image: {
    height: 40,
    width: 40,
  },
  titleContainer: {
    flexDirection: 'column',
    alignContent: 'flex-start',
    flex: 1,
    paddingHorizontal: metrics.basePadding,
  },
  title: {
    fontWeight: 'bold',
  },
  subtitle: {
    color: colors.light,
  },
  button: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
