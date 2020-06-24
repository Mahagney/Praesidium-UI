//#region 'NPM DEP'
import React from 'react';
import PropTypes from 'prop-types';
import { Document, Page } from 'react-pdf';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
//#endregion

//#region 'LOCAL DEP'
import useStylesPdfViewer from './pdf-viewer-style';
import  useWindowWidth  from '../../hoc/useWindowWidth';
//#endregion

function PdfViewer({
  onDocumentLoadSuccess,
  goToPrevPage,
  goToNextPage,
  pageNumber,
  numPages,
  url,
  width
}) {
  const classes = useStylesPdfViewer();
  let windowWidth =Math.round( width * 0.9);
  console.log("width" + windowWidth);
  if(windowWidth && windowWidth>800)
     windowWidth = 1000;

  return (
    <div className={classes.pdfContainer}>
      <nav>
        <Button
          variant='contained'
          color='primary'
          onClick={goToPrevPage}
          disabled={pageNumber == 1 || !numPages}
        >
          <span className={classes.arrowChar}>&#8592;</span>
        </Button>
        <Button
          variant='contained'
          color='primary'
          onClick={goToNextPage}
          disabled={pageNumber == numPages || !numPages}
        >
          <span className={classes.arrowChar}>&#8594;</span>
        </Button>
      </nav>
      <Typography color='textSecondary' className={classes.pageNumbers}>
        Pagina {pageNumber} din {numPages}
      </Typography>

      <Document
        file={url}
        onLoadSuccess={onDocumentLoadSuccess}
        className={classes.pdfFileContainer}
      >
        <Page pageNumber={pageNumber} width={windowWidth} />
      </Document>
    </div>
  );
}

PdfViewer.propTypes = {
  onDocumentLoadSuccess: PropTypes.func.isRequired,
  goToPrevPage: PropTypes.func.isRequired,
  goToNextPage: PropTypes.func.isRequired,
  pageNumber: PropTypes.number.isRequired,
  numPages: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
};

export default useWindowWidth(PdfViewer);
