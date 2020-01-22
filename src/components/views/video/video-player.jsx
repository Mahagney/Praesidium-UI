//#region 'NPM DEP'
import React from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
//#endregion

//#region 'LOCAL DEP'
import useStylesVideoPlayer from './video-player-style';
//#endregion

function VideoPlayer({ videoUrl }) {
  const classes = useStylesVideoPlayer();
  return (
    <>
      <ReactPlayer
        style={{ margin: '0 auto', marginTop: '24px' }}
        width={1000}
        height={500}
        url={videoUrl}
        controls
      ></ReactPlayer>
      {/* <div className={classes.videoButtonsContainer}>
        <p>BUTOANE</p>
      </div> */}
    </>
  );
}

VideoPlayer.propTypes = {
  videoUrl: PropTypes.string.isRequired
  //   onDocumentLoadSuccess: PropTypes.func.isRequired,
  //   goToPrevPage: PropTypes.func.isRequired,
  //   goToNextPage: PropTypes.func.isRequired,
  //   pageNumber: PropTypes.number.isRequired,
  //   numPages: PropTypes.object.isRequired
};

export default VideoPlayer;
