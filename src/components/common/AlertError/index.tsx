import { ErrorState } from "@/types"
import { useEffect, useState } from "react"
import { MdClose, MdErrorOutline } from "react-icons/md"

const visibleClass = "flex justify-center fixed top-5 w-full animate-appear"
const hiddenClass = "flex justify-center fixed top-5 w-full animate-disappear"

interface AlertErrorProps {
  error: ErrorState;
  onClose: (value: ErrorState) => void;
}

const AlertError = ({ error, onClose }: AlertErrorProps) => {
  const [retained, setRetained] = useState<ErrorState>({})
  const { message, title } = error

  useEffect(() => {
    if (message || title) {
      setRetained({ message, title })
    }
  }, [message, title])

  const onCloseAlert = () => onClose({})

  if (!retained.message && !retained.title) return null

  const containerClass = (retained.message === message && retained.title === title)
    ? visibleClass
    : hiddenClass

  return(
    <div className={containerClass}>
      <div className="bg-rose-100 border-t-4 border-rose-500 rounded-b text-rose-900 px-4 py-3 shadow-md min-w-96 max-w-xl">
        <div className="flex justify-between items-start">
          <div className="pr-2">
            <MdErrorOutline size={25} />
          </div>
          <div className="flex-1">
            <p className="font-bold">{ retained.title }</p>
            <p className="text-sm">{ retained.message }</p>
          </div>
          <button className="aspect-square p-2 hover:bg-rose-200 rounded"
            onClick={onCloseAlert}
          >
            <MdClose />
          </button>
        </div>
      </div>
    </div>
  )
}

export default AlertError