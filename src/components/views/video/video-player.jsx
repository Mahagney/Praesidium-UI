//#region 'NPM DEP'
import React from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
//#endregion

//#region 'LOCAL DEP'
import useVideoPlayerStyle from './video-player-style';
//#endregion

function VideoPlayer({ videoUrl }) {
  const classes = useVideoPlayerStyle();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>
      <ReactPlayer
        className= {classes.videoPlayer}
        width= {1000}
        height= {isSmall?380:500}
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
