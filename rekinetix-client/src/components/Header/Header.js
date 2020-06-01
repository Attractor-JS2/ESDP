import React from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import ScopedCssBaseline from "@material-ui/core/ScopedCssBaseline";

import "./Header.css";
import Logo from "../Logo/Logo";
import { connect } from "react-redux";
import { logoutUser } from "../../store/actions/users";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    menuLink: {
      fontSize: "12px",
      color: "red",
      marginLeft: "50px",
    },
  })
);

const Header = ({ onLogoutUser, user }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <ScopedCssBaseline>
          <Container>
            <Toolbar>
              <Logo />
              <Typography variant="h6" className={classes.title}>
                <RouterNavLink className={classes.menuLink} to="/primary-assessment" exact>
                  Первичный осмотр
                </RouterNavLink>
                <RouterNavLink className={classes.menuLink} to="/createPatient" exact>
                  Создать пациента
                </RouterNavLink>
                <RouterNavLink className={classes.menuLink} to="/patients" exact>
                  Пациенты
                </RouterNavLink>
                <RouterNavLink className={classes.menuLink} to="/attendance" exact>
                  Отчет по приёму
                </RouterNavLink>
                <RouterNavLink className={classes.menuLink} to="/plan" exact>
                  План лечения{" "}
                </RouterNavLink>
                <RouterNavLink className={classes.menuLink} to="/plan-chart" exact>
                  Таблица плана
                </RouterNavLink>
                <RouterNavLink className={classes.menuLink} to="/siteMap" exact>
                  Карта сайта
                </RouterNavLink>
              </Typography>
              {user && user.token && <Button color="inherit" onClick={onLogoutUser}>Выйти</Button>}
            </Toolbar>
          </Container>
        </ScopedCssBaseline>
      </AppBar>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.users.user,
});

const mapDispatchToProps = (dispatch) => ({
  onLogoutUser: () => dispatch(logoutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
