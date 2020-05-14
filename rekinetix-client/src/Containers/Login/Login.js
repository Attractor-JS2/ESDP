import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { connect } from 'react-redux';
import * as yup from 'yup';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { loginUser } from '../../store/actions/users';

const validationSchema = yup.object().shape({
  username: yup.string().required('Введите имя'),
  password: yup.string().required('Введите пароль'),
});

const Login = ({ onLoginUser }) => {
  return (
    <Container>
      <Grid container direction="column" alignItems="center">
        <Grid item sm={12} md={6}>
          <Formik
            initialValues={{
              username: '',
              password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => onLoginUser(values)}
          >
            <Form>
              <Field
                component={TextField}
                type="text"
                name="username"
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

const mapDispatchToProps = (dispatch) => ({
  onLoginUser: (userData) => dispatch(loginUser(userData)),
});

export default connect(null, mapDispatchToProps)(Login);
