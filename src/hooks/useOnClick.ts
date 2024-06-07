import { useEffect } from 'react'

const useOnClick = (handleClick: (e: MouseEvent | TouchEvent) => void) => {
  useEffect(() => {
    document.body.addEventListener('click', handleClick)
    return () => {
      document.body.removeEventListener('click', handleClick)
    }
  }, [handleClick])
}

export default useOnClick