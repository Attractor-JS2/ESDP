import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { connect } from 'react-redux';
import * as yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { loginUser } from '../../store/actions/users';

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
  username: yup.string().required('Введите имя'),
  password: yup.string().required('Введите пароль'),
});

const Login = ({ onLoginUser }) => {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Grid container direction="column" alignItems="center">
        <Typography variant="h5" align="center">
          Вход в приложение
        </Typography>
        <Grid item sm={12} md={6}>
          <Formik
            initialValues={{
              username: '',
              password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, setFieldValue }) =>
              onLoginUser(values, setSubmitting, setFieldValue)
            }
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  className={classes.formField}
                  component={TextField}
                  type="text"
                  name="username"
                  label="Имя пользователя:"
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
                <div className={classes.buttonGroupCentered}>
                  <Button
                    type="submit"
                    variant="outlined"
                    disabled={isSubmitting}
                  >
                    Войти
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onLoginUser: (userData, formikIsSubmittingSetter, formikFieldSetter) =>
    dispatch(loginUser(userData, formikIsSubmittingSetter, formikFieldSetter)),
});

export default connect(null, mapDispatchToProps)(Login);
