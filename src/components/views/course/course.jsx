//#region 'NPM DEP'
import React from 'react';
import PropTypes from 'prop-types';
// material-ui
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
//#endregion

//#region 'LOCAL DEP'
import useStylesCourse from './course-style';
import CenteredTabs from '../../common/tab/tab';
//#endregion

function Course({ course }) {
  const classes = useStylesCourse();
  return (
    <Container component='div' maxWidth='lg' className={classes.bigContainer}>
      <Typography variant='h4' className={classes.title}>
        {course.NAME ? course.NAME : ''}
      </Typography>
      <CenteredTabs className={classes.tabs} />
    </Container>
  );
}

Course.propTypes = {
  course: PropTypes.object.isRequired
};

export default Course;
