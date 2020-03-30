//#region 'NPM DEP'
import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

//#endregion

// our project
import CourseCard from './course-card';
import useStylesCoursesCards from './courses-cards-style';

const CoursesCards = ({ history, courses, handleCardClick }) => {
  const classes = useStylesCoursesCards();
  return (
    <>
      <div className={classes.container}>
        <Grid
          container
          spacing={4}
          direction='row'
          justify='center'
          alignItems='center'
        >
          {courses.map((course) => (
            <Grid item key={course.ID}>
              <CourseCard
                name={course.NAME}
                onCardClick={() => handleCardClick(course.ID)}
              />
            </Grid>
          ))}
        </Grid>
      </div>
      <Fab
        color='primary'
        aria-label='add'
        onClick={() => history.push('courses/new')}
        className={classes.fab}
      >
        <AddIcon />
      </Fab>
    </>
  );
};

CoursesCards.propTypes = {
  history: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  handleCardClick: PropTypes.func.isRequired
};

export default CoursesCards;
