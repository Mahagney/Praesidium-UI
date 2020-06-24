//#region 'NPM DEP'
import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
//#endregion

//#region 'LOCAL DEP'
import useStylesReports from './reports-style'
//#endregion

function Reports() {
  const classes = useStylesReports()
  const [year, setYear] = useState(2020)
  const [trimester, setTrimester] = useState(1)

  const handleChange = (event) => {
    setYear(event.target.value)
  };
  const changeTrimester = (event) => {
    setTrimester(event.target.value)
  };

  return (
    <Container component='div' maxWidth='lg' className={classes.bigContainer}>
      {<h1>Generare Raport</h1>}
      <Container
        component='div'
        maxWidth='sm'
        className={classes.smallContainer}
      >
        <FormControl className={classes.formControl}>
          <InputLabel id='select-year'>Anul</InputLabel>
          <Select
            labelId='select-year'
            id='select-year'
            value={year}
            onChange={handleChange}
          >
            <MenuItem value={2020}>2020</MenuItem>
            <MenuItem value={2019}>2019</MenuItem>
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel id='select-trimester'>Trimestrul</InputLabel>
          <Select
            labelId='select-trimester'
            id='select-trimester'
            value={trimester}
            onChange={changeTrimester}
          >
            <MenuItem value={1}>T1</MenuItem>
            <MenuItem value={2}>T2</MenuItem>
            <MenuItem value={3}>T3</MenuItem>
            <MenuItem value={4}>T4</MenuItem>
          </Select>
        </FormControl>

        <Button variant='contained' color='primary' className={classes.button}>
          Genereaza
        </Button>
      </Container>
    </Container>
  );
}

Reports.propTypes = {}

export default Reports
