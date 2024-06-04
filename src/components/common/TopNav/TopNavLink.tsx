import { useLocation, Link } from "react-router-dom"

interface TopNavLinkProps {
  to: string;
  text: string;
}

const TopNavLink = ({ to, text }: TopNavLinkProps) => {
  const location = useLocation()
  const { pathname } = location

  const linkClass: string = 'py-2 px-6 hover:bg-black/5 cursor-pointer text-teal-800';
  const linkActiveClass: string = 'py-2 px-6 hover:bg-black/5 cursor-pointer border-b-4 border-teal-500 text-teal-800';

  return(
    <Link to={to} className={
      pathname === to ? linkActiveClass : linkClass
    }>
      { text }
    </Link>
  )
}

export default TopNavLink