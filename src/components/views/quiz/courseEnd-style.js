import { makeStyles } from '@material-ui/core/styles';

const useStylesQuestion = makeStyles(() => ({
  title: {
    margin: '16px 0px',
    padding: '24px 0px 24px 0px '
  },
  formDiv: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '75%'
  }
}));

export default useStylesQuestion;
