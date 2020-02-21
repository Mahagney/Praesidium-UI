//#region 'NPM DEP'
import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
//#endregion

//#region 'LOCAL DEP'
import useStylesCourse from './course-style';
import CenteredTabs from '../../common/tab';
//#endregion

function Course({
  courseName,
  section,
  onTabChange,
  tabValue,
  showQuiz,
  showVideo
}) {
  const classes = useStylesCourse();

  return (
    <Container component='div' maxWidth='lg' className={classes.bigContainer}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Typography variant='h6'>{courseName ? courseName : ''}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <CenteredTabs
              onTabChange={onTabChange}
              showQuiz={showQuiz}
              showVideo={showVideo}
              tabValue={tabValue}
            />
          </Paper>
        </Grid>
      </Grid>
      {section}
    </Container>
  );
}

Course.propTypes = {
  courseName: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
  tabValue: PropTypes.number.isRequired,
  showQuiz: PropTypes.bool.isRequired,
  showVideo: PropTypes.bool.isRequired,
  section: PropTypes.object.isRequired
};

export default Course;
