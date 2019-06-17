import { StyleSheet } from 'react-native';
import { colors, metrics } from '~/styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.lighter,
    alignContent: 'center',
  },
  addContainer: {
    marginTop: metrics.baseMargin,
    paddingBottom: metrics.baseMargin,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: metrics.basePadding,
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
  },
  addInput: {
    width: metrics.screenWidth - 2 * metrics.basePadding - 30,
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius,
    paddingHorizontal: metrics.basePadding,
  },
  addIconContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    borderBottomWidth: 0,
  },
  errorText: {
    color: colors.danger,
    alignSelf: 'center',
    marginTop: metrics.baseMargin,
    fontWeight: 'bold',
  },
});
