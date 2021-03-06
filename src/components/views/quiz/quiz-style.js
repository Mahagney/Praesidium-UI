import { makeStyles } from '@material-ui/core/styles';

const useStylesQuiz = makeStyles((theme) => ({
  quizContainer: {
    width: '100%',
    margin: '0 auto',
    boxShadow: '0px 0px 4px 4px rgba(0,0,0,.2)',
    borderRadius: '.5rem',
    height: '500px',
    background: '#FFFFFF',
    marginTop: theme.spacing(4)
  }
}));

export default useStylesQuiz;
