import React from "react";
import PatientCard from "../../components/PatientCard/PatientCard";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import defaultImage from "../../assets/defaultImage/default-photo.jpeg";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import { NavLink as RouterNavLink } from "react-router-dom";
  const patient = [
    {
      patientName: "Jhon",
      patientAge: "17.07.1989",
      redFlags: ["test"],
      diagnosis: ["test"],
    },
    {
      patientName: "lia",
      patientAge: "17.07.1989",
      redFlags: ["test"],
      diagnosis: ["test"],
    },
    {
      patientName: "Alex",
      patientAge: "17.07.1989",
      redFlags: ["test"],
      diagnosis: ["test"],
    },
    {
      patientName: "Olya",
      patientAge: "17.07.1989",
      redFlags: ["test"],
      diagnosis: ["test"],
    },
    {
      patientName: "Vasya",
      patientAge: "17.07.1989",
      redFlags: ["test"],
      diagnosis: ["test"],
    },
  ];
