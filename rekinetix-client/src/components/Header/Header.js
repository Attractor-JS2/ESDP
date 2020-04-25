import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import "./Header.css";
import Logo from "../Logo/Logo";

const useStyles = makeStyles((theme: Theme) =>
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
      marginLeft: "100px",
    },
  })
);

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Logo />
          <Typography variant="h6" className={classes.title}>
            <Link className={classes.menuLink} href="/attendance">
              Отчет по приёму
            </Link>
            <Link className={classes.menuLink} href="/plan">
              План лечения
            </Link>
            <Link className={classes.menuLink} href="/plan-chart">
              График курса лечения
            </Link>
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
