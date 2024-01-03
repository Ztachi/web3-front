// import { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  //  Link
} from 'react-router-dom';

// import Demo from '@/pages/demo';
import Wallet from '@/pages/wallet';

const App = () => (
  // const [count, setCount] = useState(0);

  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Wallet />} />
    </Routes>
  </BrowserRouter>
);

export default App;
