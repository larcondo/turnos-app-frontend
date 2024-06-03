import Loader from "@components/common/Loader"

const Loading = () => {
  return(
    <div className="flex flex-col items-center justify-center gap-4 p-2 w-fit">
      <Loader />
      <p className="text-sm text-teal-500">Cargando...</p>
    </div>
  )
}

export default Loading