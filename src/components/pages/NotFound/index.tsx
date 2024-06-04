import { Link } from "react-router-dom"
const NotFound = () => {
  return(
    <div className="p-10">
      <div className="flex flex-col items-center justify-center w-fullbg-teal-500 text-teal-600">
        <h1 className="text-6xl p-10 font-bold font-mono">404</h1>
        <h2 className="text-xl p-2">Lo sentimos, algo salió mal.</h2>
        <p className="text-sm p-2">Esta página no existe o has ingresado incorrectamente el link.</p>

        <Link to='/' className="m-8 bg-teal-400 p-4 rounded-md text-white">
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}

export default NotFound