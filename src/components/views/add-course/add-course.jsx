//#region 'NPM DEP'
import React from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { DropzoneArea } from 'material-ui-dropzone';
import Question from './question';
//#endregion

//#region 'LOCAL DEP'
import useStylesCourse from './add-course-style';
//#endregion

function AddCourse() {
  const classes = useStylesCourse();

  return (
    <Container component='div' maxWidth='lg' className={classes.bigContainer}>
      {/* <h1>New Course</h1> */}
      <Container
        component='div'
        maxWidth='xs'
        className={classes.smallContainer}
      >
        <TextField
          //variant='outlined'
          margin='normal'
          fullWidth
          label='Title'
          name='title'
          autoFocus
          //value={emailValue || ''}
          //onChange={onChange}
          //error={errors.email ? true : false}
          //helperText={errors.email}
        />
        <FormControl className={classes.formControl}>
          <InputLabel id='demo-simple-select-label'>Course Type</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={10}
            //onChange={handleChange}
          >
            <MenuItem value={10}>Semestrial</MenuItem>
            <MenuItem value={20}>Trimestrial</MenuItem>
            <MenuItem value={30}>Anual</MenuItem>
          </Select>
        </FormControl>
        <Question />
      </Container>
      <Container
        component='div'
        maxWidth='xs'
        className={classes.smallContainer}
      >
        <div className={classes.dropZone}>
          <DropzoneArea
            onChange={() => 1}
            acceptedFiles={['application/pdf']}
            fullWidth={true}
            dropzoneText={'Drag and drop pdf !'}
            filesLimit={1}
          />
        </div>
        <div className={classes.dropZone}>
          <DropzoneArea
            onChange={(f) => console.log(f)}
            acceptedFiles={['video/*']}
            fullWidth={true}
            dropzoneText={'Drag and drop video !'}
            maxFileSize={20000000}
            filesLimit={2}
          />
        </div>
      </Container>
    </Container>
  );
}

AddCourse.propTypes = {};

export default AddCourse;
