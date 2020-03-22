//#region 'NPM DEP'
import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { DropzoneArea } from 'material-ui-dropzone';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
//#endregion

//#region 'LOCAL DEP'
import {
  getCourseTypes,
  addCourse,
  setQuizToCourse,
  setVideoToCourse
} from '../../../api/course-api';
import Question from './question';
import useStylesCourse from './add-course-style';
//#endregion

function AddCourse({ history }) {
  const classes = useStylesCourse();
  const [quiz, setQuiz] = useState([]);
  const [course, setCourse] = useState({ type: '' });
  const [courseTypes, setCourseTypes] = useState([]);
  const [videoCourse, setVideoCourse] = useState();

  useEffect(() => {
    getCourseTypes().then((types) => {
      setCourseTypes(types);
    });
  }, []);

  function handleChange(target) {
    const { name, value } = target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value
    }));
  }

  const submitForm = () => {
    addCourse(course.title, course.type, course.pdfCourse[0]).then(
      (response) => {
        let promises = [];

        if (quiz && quiz.length > 0) promises.push(quiz);
        if (videoCourse && videoCourse[0]) promises.push(videoCourse[0]);

        Promise.all([promises]).then((result) => {
          console.log(result);
          history.push('/courses');
        });
      }
    );
  };

  const createSelectItems = () => {
    return courseTypes.map((el) => {
      return (
        <MenuItem key={el.ID} value={el.ID}>
          {el.NAME}
        </MenuItem>
      );
    });
  };

  return (
    <Container component='div' maxWidth='lg' className={classes.bigContainer}>
      {<h1>Curs Nou</h1>}
      <Container
        component='div'
        maxWidth='lg'
        className={classes.flexRowContainer}
      >
        <Container
          component='div'
          maxWidth='sm'
          className={classes.smallContainer}
        >
          <TextField
            //variant='outlined'
            margin='normal'
            fullWidth
            label='Titlu'
            name='title'
            autoFocus
            value={course.title || ''}
            onChange={(event) => handleChange(event.target)}
            //error={errors.email ? true : false}
            //helperText={errors.email}
          />
          <FormControl className={classes.formControl}>
            <InputLabel id='demo-simple-select-label'>
              Tipul cursului
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              name='type'
              value={course.type}
              onChange={(event) => handleChange(event.target)}
            >
              {createSelectItems()}
            </Select>
          </FormControl>
          <Question questions={quiz} setQuestions={setQuiz} />
        </Container>
        <Container
          component='div'
          maxWidth='sm'
          className={classes.smallContainer}
        >
          <div className={classes.dropZone}>
            <DropzoneArea
              onChange={(value) =>
                handleChange({ value: value, name: 'pdfCourse' })
              }
              acceptedFiles={['application/pdf']}
              fullWidth={true}
              dropzoneText={'Adauga document PDF !'}
              filesLimit={1}
            />
          </div>
          <div className={classes.dropZone}>
            <DropzoneArea
              onChange={(value) => setVideoCourse(value)}
              acceptedFiles={['video/*']}
              fullWidth={true}
              dropzoneText={'Adauga document video !'}
              maxFileSize={20000000}
              filesLimit={1}
            />
          </div>
        </Container>
      </Container>
      <Button
        style={{ minWidth: '20%', margin: '0 20% 0 20%' }}
        variant='contained'
        color='primary'
        size='medium'
        className={classes.button}
        onClick={submitForm}
        startIcon={<SaveIcon />}
      >
        Salveaza
      </Button>
    </Container>
  );
}

AddCourse.propTypes = {
  history: PropTypes.object.isRequired
};

export default AddCourse;
