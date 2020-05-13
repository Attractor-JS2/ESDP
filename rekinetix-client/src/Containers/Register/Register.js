import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  fullName: yup.string().required('Введите ФИО'),
  userName: yup.string().required('Введите логин'),
  password: yup.string().required('Введите пароль'),
});

const Register = () => {
  return (
    <Container>
      <Grid container direction="column" alignItems="center">
        <Typography variant="h5">Регистрация нового пользователя</Typography>
        <Grid item sm={12} md={6}>
          <Formik
            initialValues={{
              fullName: '',
              userName: '',
              password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => console.dir(values)}
          >
            <Form>
              <Field
                component={TextField}
                type="text"
                name="fullName"
                label="Ф.И.О:"
                fullWidth
              />
              <Field
                component={TextField}
                type="text"
                name="userName"
                label="Логин:"
                fullWidth
              />
              <Field
                component={TextField}
                type="password"
                name="password"
                label="Пароль:"
                fullWidth
              />
              <Button type="submit">Войти</Button>
            </Form>
          </Formik>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
