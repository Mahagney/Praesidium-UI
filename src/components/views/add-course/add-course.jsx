//#region 'NPM DEP'
import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { DropzoneArea } from 'material-ui-dropzone'
import SaveIcon from '@material-ui/icons/Save'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
//#endregion

//#region 'LOCAL DEP'
import {
  getCourseTypes,
  addCourse,
  setQuizToCourse,
  setVideoToCourse,
} from '../../../api/course-api'
import Question from './question'
import useStylesCourse from './add-course-style'
import { loadCourses } from '../../../redux/actions/course-action'
//#endregion

function AddCourse({ history, loadCourses }) {
  const requiredFields = ['title', 'type', 'pdfCourse']
  const classes = useStylesCourse()
  const [quiz, setQuiz] = useState([])
  const [course, setCourse] = useState({ type: '' })
  const [courseTypes, setCourseTypes] = useState([])
  const [videoCourse, setVideoCourse] = useState()
  const [errors, setErrors] = useState({})
  const [questionErrors, setQuestionErrors] = useState({})
  useEffect(() => {
    getCourseTypes().then((types) => {
      setCourseTypes(types)
    })
  }, [])

  const validateQuiz = () => {
    let err = {}
    quiz.forEach((currentQuestion, index) => {
      let answered = false
      currentQuestion.ANSWERS.forEach((answer) => {
        if (answer.IS_CORRECT) answered = true
      })
      if (answered == false) err[index] = 'Selecteaza cel putin un raspuns'

      if (currentQuestion.ANSWERS.length <= 1) err[index] = 'Adauga cel putin doua raspunsuri'
    })
    setQuestionErrors(err)
    return err
  }

  function handleChange(target) {
    const { name, value } = target
    let err = { ...errors }
    delete err[name]
    setErrors(err)
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }))
  }

  const submitForm = () => {
    let err = { ...errors }
    requiredFields.forEach((key) => {
      if (!course[key]) {
        err[key] = 'Trebuie completat'
      }
    })

    setErrors(err)

    const qErrors = validateQuiz()
    if (Object.keys(err).length === 0 && Object.keys(qErrors).length === 0) {
      addCourse(course.title, course.type, course.pdfCourse[0]).then(({ data }) => {
        let promises = []

        if (quiz && quiz.length > 0) promises.push(setQuizToCourse(data.ID, quiz))
        if (videoCourse && videoCourse[0]) promises.push(setVideoToCourse(data.ID, videoCourse[0]))

        Promise.all(promises).then(() => {
          loadCourses.then(history.push('/courses'))
        })
      })
    }
  }

  const createSelectItems = () => {
    return courseTypes.map((el) => {
      return (
        <MenuItem key={el.ID} value={el.ID}>
          {el.NAME}
        </MenuItem>
      )
    })
  }

  return (
    <Container component='div' maxWidth='lg' className={classes.bigContainer}>
      {<h1>Curs Nou</h1>}
      <Container component='div' maxWidth='lg' className={classes.flexRowContainer}>
        <Container component='div' maxWidth='sm' className={classes.smallContainer}>
          <TextField
            //variant='outlined'
            margin='normal'
            fullWidth
            label='Titlu'
            name='title'
            autoFocus
            value={course.title || ''}
            onChange={(event) => handleChange(event.target)}
            required
            error={errors.title ? true : false}
            helperText={errors.title}
          />
          <FormControl required error={errors.type ? true : false} className={classes.formControl}>
            <InputLabel id='demo-simple-select-label'>Tipul cursului</InputLabel>
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
          <Question questions={quiz} setQuestions={setQuiz} questionErrors={questionErrors} />
        </Container>
        <Container component='div' maxWidth='sm' className={classes.smallContainer}>
          <div
            className={classes.dropZone}
            style={errors['pdfCourse'] ? { borderBottom: '3px solid red' } : {}}
          >
            <DropzoneArea
              onChange={(value) => handleChange({ value: value, name: 'pdfCourse' })}
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
  )
}

const mapDispatchToProps = {
  loadCourses: loadCourses,
}

AddCourse.propTypes = {
  loadCourses: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
}

export default connect(null, mapDispatchToProps)(AddCourse)
