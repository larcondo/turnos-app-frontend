import { Outlet } from 'react-router-dom';
import TopNav from './components/TopNav/index';

function App() {

  return (
    <main className='main-container'>
      <TopNav />
      <Outlet />
    </main>
  )
}

export default App