import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const breadcrumbNameMap = {
  'healing-plans': 'План лечения',
  'primary-assessments': 'Первичный осмотр',
  register: 'Зарегистрировать',
  patients: 'Пациенты',
  attendances: 'Отчёт по приёму',
  new: 'Создать',
};

const MuiRouterLink = (props) => <Link {...props} component={RouterLink} />;

const MuiBreadcrumbs = () => {
  const [pathNames, setPathNames] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const curPathNames = location.pathname.split('/').filter((x) => x);
    if (location.pathname === '/patients/new') {
      const paths = ['patients', 'new'];
      setPathNames(paths);
    } else {
      const pathsWithoutNew = curPathNames.filter(
        (path) => path !== 'new' && breadcrumbNameMap[path],
      );
      setPathNames(pathsWithoutNew);
    }
  }, [location]);

  return (
    <Container>
      <nav>
        <Paper>
          <Breadcrumbs aria-label="breadcrumb" style={{boxSizing: 'border-box', padding: 10, backgroundColor: 'rgba(240, 240, 240, 0.2)'}}>
            {pathNames.map((value, index) => {
              const isLast = index === pathNames.length - 1;
              const link = `/${pathNames.slice(0, index + 1).join('/')}`;
              const to = value;
              return isLast ? (
                <Typography key={to}>{breadcrumbNameMap[to]}</Typography>
              ) : (
                <MuiRouterLink to={link} key={to}>
                  {breadcrumbNameMap[to]}
                </MuiRouterLink>
              );
            })}
          </Breadcrumbs>
        </Paper>
      </nav>
    </Container>
  );
};

export default MuiBreadcrumbs;
