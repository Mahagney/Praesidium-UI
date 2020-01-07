//#region 'NPM DEP'
import React from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import Container from '@material-ui/core/Container';
//#endregion

//#region 'LOCAL DEP'
import useStylesVideoPlayer from './video-player-style';
//#endregion

function VideoPlayer() {
  const classes = useStylesVideoPlayer();
  return (
    <>
      <ReactPlayer
        style={{ margin: '0 auto', marginTop: '24px' }}
        width={1000}
        height={500}
        url='https://www.youtube.com/watch?v=SUU2azDSxZY'
        controls
      ></ReactPlayer>
      {/* <div className={classes.videoButtonsContainer}>
        <p>BUTOANE</p>
      </div> */}
    </>
  );
}

// PdfViewer.propTypes = {
//   onDocumentLoadSuccess: PropTypes.func.isRequired,
//   goToPrevPage: PropTypes.func.isRequired,
//   goToNextPage: PropTypes.func.isRequired,
//   pageNumber: PropTypes.number.isRequired,
//   numPages: PropTypes.object.isRequired
// };

export default VideoPlayer;
