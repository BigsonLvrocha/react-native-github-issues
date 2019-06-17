import { StyleSheet } from 'react-native';
import { metrics, colors } from '~/styles';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    marginHorizontal: metrics.basePadding,
    borderRadius: metrics.baseRadius,
    marginTop: metrics.baseMargin,
    padding: metrics.basePadding,
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  contentContainter: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: metrics.basePadding,
  },
  title: {
    fontWeight: 'bold',
  },
  user: {
    color: colors.light,
  },
  linkContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: 40,
    alignItems: 'center',
  },
  link: {
    color: colors.light,
  },
});
