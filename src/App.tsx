import './App.css';

import AddCardModal from './components/AddCardModal/AddCardModal';
import AppBody from './components/AppBody/AppBody';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <AppBody />
      <AddCardModal />
    </>
  );
}

export default App;
