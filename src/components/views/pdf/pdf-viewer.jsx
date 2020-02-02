//#region 'NPM DEP'
import React from 'react';
import PropTypes from 'prop-types';
import { Document, Page } from 'react-pdf';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
//#endregion

//#region 'LOCAL DEP'
import useStylesPdfViewer from './pdf-viewer-style';
import pdfFile from './sample1.pdf';
//#endregion

function PdfViewer({
  onDocumentLoadSuccess,
  goToPrevPage,
  goToNextPage,
  pageNumber,
  numPages,
  url
}) {
  const classes = useStylesPdfViewer();
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
        <Page pageNumber={pageNumber} width={1000} />
      </Document>
    </div>
  );
}

PdfViewer.propTypes = {
  onDocumentLoadSuccess: PropTypes.func.isRequired,
  goToPrevPage: PropTypes.func.isRequired,
  goToNextPage: PropTypes.func.isRequired,
  pageNumber: PropTypes.number.isRequired,
  numPages: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired
};

export default PdfViewer;
