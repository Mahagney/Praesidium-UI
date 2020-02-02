//#region 'NPM DEP'
import React from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
//#endregion

//#region 'LOCAL DEP'
//#endregion

function VideoPlayer({ videoUrl }) {
  return (
    <>
      <ReactPlayer
        style={{ margin: '0 auto', marginTop: '24px' }}
        width={1000}
        height={500}
        url={videoUrl}
        controls
      ></ReactPlayer>
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
