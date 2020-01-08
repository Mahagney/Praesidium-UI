import { makeStyles } from '@material-ui/core/styles';

const useStylesQuiz = makeStyles((theme) => ({
  quizContainer: {
    margin: '0 auto',
    boxShadow: '4px 4px 8px 0px rgba(0,0,0,.2)',
    borderRadius: '.5rem',
    height: '500px',
    background: '#FFFFFF',
    marginTop: theme.spacing(4)
  }
}));

export default useStylesQuiz;
