import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { NoPage } from './pages/NoPage';
import { BasicLayout } from './layout/BasicLayout';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { UserLayout } from './layout/UserLayout';
import { Movies } from './pages/Movies';
import { UserContextProvider } from './context/UserContext';
import { UserContextValuesUpdate } from './context/UserContextValuesUpdate';
import { AddMovie } from './pages/AddMovie';

function App() {
  return (
    <UserContextProvider>
      <UserContextValuesUpdate>
      <BrowserRouter>
      <Routes>
        <Route Component={BasicLayout}>
          <Route index path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<NoPage />} />
        </Route>

        <Route Component={UserLayout}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/movies/add' element={<AddMovie />} />
        </Route>
      </Routes>
      </BrowserRouter>
      </UserContextValuesUpdate>
    </UserContextProvider>
  );
}

export default App;
