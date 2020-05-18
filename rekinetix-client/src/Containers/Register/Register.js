import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { TextField, Select } from 'formik-material-ui';
import * as yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';

import { registerUser } from '../../store/actions/users';

const useStyles = makeStyles({
  root: {
    padding: '30px 0',
  },
  formField: {
    marginBottom: '20px',
  },
  buttonGroupCentered: {
    display: 'flex',
    justifyContent: 'center',
  },
});

const validationSchema = yup.object().shape({
  fullname: yup.string().required('Введите ФИО'),
  username: yup.string().required('Введите логин'),
  password: yup.string().required('Введите пароль'),
});

const Register = ({ onRegisterUser }) => {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Grid container direction="column" alignItems="center">
        <Grid item sm={12} md={6}>
          <Typography variant="h5" align="center">
            Регистрация нового пользователя
          </Typography>
          <Formik
            initialValues={{
              fullname: '',
              username: '',
              password: '',
              role: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => onRegisterUser(values)}
          >
            <Form>
              <Field
                className={classes.formField}
                component={TextField}
                type="text"
                name="fullname"
                label="Ф.И.О:"
                fullWidth
              />

              <Field
                className={classes.formField}
                component={TextField}
                type="text"
                name="username"
                label="Логин:"
                fullWidth
              />

              <Field
                className={classes.formField}
                component={TextField}
                type="password"
                name="password"
                label="Пароль:"
                fullWidth
              />

              <FormControl fullWidth className={classes.formField}>
                <InputLabel htmlFor="userRole">Роль</InputLabel>
                <Field
                  component={Select}
                  type="text"
                  name="role"
                  label="Роль"
                  fullWidth
                  inputProps={{
                    id: 'userRole',
                  }}
                >
                  <MenuItem value={'doctor'}>Врач</MenuItem>
                  <MenuItem value={'frontdesk'}>Регистратура</MenuItem>
                  <MenuItem value={'admin'}>Админ</MenuItem>
                </Field>
              </FormControl>

              <div className={classes.buttonGroupCentered}>
                <Button type="submit" variant="outlined">
                  Сохранить
                </Button>
              </div>
            </Form>
          </Formik>
        </Grid>
      </Grid>
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onRegisterUser: (userData) => dispatch(registerUser(userData)),
});

export default connect(null, mapDispatchToProps)(Register);
