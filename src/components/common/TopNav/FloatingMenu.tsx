import { useState, useRef } from 'react'
import useOnClick from '@hooks/useOnClick'

interface FloatingMenuProps {
  children: JSX.Element[] | JSX.Element;
  buttonContent: JSX.Element;
}

const FloatingMenu = ({ children, buttonContent }: FloatingMenuProps) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const onClick = (e: MouseEvent | TouchEvent) => {
    const nodeClicked = e.target as Node;
    const closingNodeNames = ['BUTTON', 'A'];

    // click outside menu
    const clickOutside = menuRef.current && !menuRef.current.contains(nodeClicked)
    // click on elements that close the menu
    const isClosingElement = contentRef.current && 
      contentRef.current.contains(nodeClicked) && 
      closingNodeNames.includes(nodeClicked.nodeName)

    if (clickOutside || isClosingElement) {
      setMenuVisible(false)
    }
  }

  useOnClick(onClick)

  const buttonClass: string = 'py-2 px-4 hover:bg-teal-400 cursor-pointer text-teal-800 flex items-center gap-2 self-stretch rounded bg-teal-300'
  const menuClass: string = 'absolute right-0 mt-1 bg-teal-300 border border-teal-300 shadow-2xl flex flex-col justify-start min-w-48 p-2 gap-1 rounded z-10'

  return(
    <div className='relative' ref={menuRef}>
      <button className={buttonClass} onClick={() => setMenuVisible(!menuVisible)}>
        { buttonContent }
      </button>
      { menuVisible &&
        <div className={menuClass} ref={contentRef}>
          { children }
        </div>
      }
    </div>
  )
}

export default FloatingMenu