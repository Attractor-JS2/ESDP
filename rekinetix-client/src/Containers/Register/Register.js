import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { TextField, Select } from 'formik-material-ui';
import * as yup from 'yup';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';

import { registerUser } from '../../store/actions/users';

const validationSchema = yup.object().shape({
  fullname: yup.string().required('Введите ФИО'),
  username: yup.string().required('Введите логин'),
  password: yup.string().required('Введите пароль'),
});

const Register = ({ onRegisterUser }) => {
  return (
    <Container>
      <Grid container direction="column" alignItems="center">
        <Typography variant="h5">Регистрация нового пользователя</Typography>
        <Grid item sm={12} md={6}>
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
                component={TextField}
                type="text"
                name="fullname"
                label="Ф.И.О:"
                fullWidth
              />
              <Field
                component={TextField}
                type="text"
                name="username"
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
              <FormControl fullWidth>
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
              <Button type="submit">Сохранить</Button>
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
