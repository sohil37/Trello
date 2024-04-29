import { useSelector } from 'react-redux';

import { Container } from '@mui/material';

import { RootState } from '../../redux/store/store';
import Column from '../Column/Column';
import styles from './appBody.module.css';

function AppBody() {
  const appData = useSelector((state: RootState) => state.appState.appData);

  return (
    <Container className={styles.root}>
      <div className={styles.columnsContainer}>
        <Column data={appData.left}></Column>
        <Column data={appData.center}></Column>
        <Column data={appData.right}></Column>
      </div>
    </Container>
  );
}

export default AppBody;
