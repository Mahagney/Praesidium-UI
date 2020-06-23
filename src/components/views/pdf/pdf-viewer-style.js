import { makeStyles } from '@material-ui/core/styles';

const useStylesPdfViewer = makeStyles((theme) => ({
  pdfContainer: {
    marginTop: theme.spacing(3)
  },
  pdfFileContainer: {
    boxShadow: '0px 0px 4px 4px rgba(0,0,0,.2)',
    maxWidth: '1000px',
    marginTop: theme.spacing(3),
    margin: '0 auto',
    borderStyle: 'solid',
    borderWidth: '2px',
    borderColor: '#D3D3D3',
    borderRadius: '10px'
  },
  pageDiv: {
    overflow: 'auto'
  },
  pageNumbers: {
    marginTop: theme.spacing(1)
  },
  arrowChar: {
    fontSize: '18px'
  }
}));

export default useStylesPdfViewer;
