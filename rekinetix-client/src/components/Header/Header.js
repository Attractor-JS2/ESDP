import React from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import ScopedCssBaseline from "@material-ui/core/ScopedCssBaseline";

import "./Header.css";
import Logo from "../Logo/Logo";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      background: "green",
    },

    title: {
      flexGrow: 1,
    },
    menuLink: {
      color: "red",
      marginLeft: "50px",
    },
  })
);

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <ScopedCssBaseline>
          <Container>
            <Toolbar>
              <Logo />
              <Typography variant="h6" className={classes.title}>
                <RouterNavLink className={classes.menuLink} to="/attendance" exact>
                  Отчет по приёму
                </RouterNavLink>
                <RouterNavLink className={classes.menuLink} to="/plan" exact>
                  План лечения{" "}
                </RouterNavLink>
                <RouterNavLink className={classes.menuLink} to="/plan-chart" exact>
                  Таблица плана лечения
                </RouterNavLink>
              </Typography>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </Container>
        </ScopedCssBaseline>
      </AppBar>
    </div>
  );
}