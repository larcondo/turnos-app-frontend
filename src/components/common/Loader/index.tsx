const Loader = () => {
  const conteinerClass = "w-12 aspect-square grid grid-cols-2 animate-loader"
  const circleClass = "w-3 aspect-square rounded-full self-center justify-self-center bg-teal-300"

  return(
    <div className={conteinerClass}>
      <div className={circleClass}></div>
      <div className={circleClass}></div>
      <div className={circleClass}></div>
      <div className={circleClass}></div>
    </div>
  )
}

export default Loader