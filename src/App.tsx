import { Outlet } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { errorState } from '@states/atoms';
import TopNav from '@components/common/TopNav';
import AlertError from '@components/common/AlertError';
import { ErrorState } from '@/types';

function App() {
  const [error, setError] = useRecoilState(errorState)

  const onClose = (state: ErrorState) => setError(state)

  return (
    <main className='main-container'>
      <TopNav />
      <AlertError
        error={error}
        onClose={onClose}
      />
      <Outlet />
    </main>
  )
}

export default App