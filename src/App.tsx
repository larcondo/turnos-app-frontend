import { Outlet } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { errorState } from '@states/atoms';
import TopNav from '@components/common/TopNav';
import AlertError from '@components/common/AlertError';

function App() {
  const [error, setError] = useRecoilState(errorState)

  return (
    <main className='main-container'>
      <TopNav />
      <AlertError
        error={error}
        onClose={setError}
      />
      <Outlet />
    </main>
  )
}

export default App