import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  userName: yup.string().required("Введите имя"),
  password: yup.string().required("Введите пароль"),
});

const Login = () => {
  return (
    <Container>
      <Grid container direction="column" alignItems="center">
        <Grid item sm={12} md={6}>
          <Formik
            initialValues={{
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
                name="userName"
                label="Имя пользователя:"
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

export default Login;