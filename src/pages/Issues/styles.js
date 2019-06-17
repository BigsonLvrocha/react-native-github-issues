import { StyleSheet } from 'react-native';
import { metrics, colors } from '~/styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
  },
  filterContainer: {
    backgroundColor: colors.light,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: metrics.basePadding,
    marginTop: metrics.baseMargin,
    borderRadius: metrics.baseRadius,
    paddingVertical: metrics.baseMargin,
  },
  loading: {
    flex: 1,
  },
  filterButton: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  filterButtonActive: {},
  filterButtonInactive: {
    color: colors.regular,
  },
  pageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: metrics.basePadding,
  },
  errorText: {
    alignSelf: 'center',
    marginTop: metrics.baseMargin,
    color: colors.danger,
  },
});
