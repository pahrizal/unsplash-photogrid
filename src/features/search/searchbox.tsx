import clsx from 'clsx'
import {
  ChangeEvent,
  FC,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import SearchIcon from '../../components/icons/search'

interface Props {
  onSearch?: (page: number, result: string) => void
  animate?: boolean
}
const SearchBox: FC<Props> = (props) => {
  const [value, setValue] = useState('')
  const boxRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }, [])
  const handleSearch = async () => {
    if (!value) {
      inputRef.current?.focus()
      return
    }
    props.onSearch && props.onSearch(1, value)
  }
  // set focus to the input
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  //   // on animate
  useEffect(() => {
    if (props.animate) {
      boxRef.current?.classList.add(
        '-top-3',
        'right-4',
        'opacity-0',
        'fixed',
        'w-[60%]'
      )
      setTimeout(() => {
        boxRef.current?.classList.add('animate__animated', 'animate__fadeIn')
      }, 1000)
    }
    const resizeHandler = () => {
      if (!props.animate) return
      const windowWidth = window.innerWidth
      const box = boxRef.current
      if (box) {
        if (windowWidth < 600) {
          box.classList.remove('-top-3', 'right-4', 'w-[60%]')
          box.classList.add('top-[40px]', 'left-0', 'w-[99vw]', 'mx-4')
        } else {
          box.classList.remove('top-[40px]', 'left-0', 'w-[99vw]', 'mx-4')
          box.classList.add('-top-3', 'right-4', 'w-[60%]')
        }
      }
    }
    window.addEventListener('resize', resizeHandler)
    resizeHandler()
    return () => {
      window.removeEventListener('resize', resizeHandler)
    }
  }, [props.animate])
  return (
    <div
      ref={boxRef}
      className={clsx(
        'py-2 px-4 flex flex-row items-center border w-full border-slate-900 shadow-[2px_2px_0px_#000]'
      )}
    >
      <input
        ref={inputRef}
        type="text"
        value={value}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            handleSearch()
          }
        }}
        onChange={handleChange}
        className="outline-none bg-transparent w-full h-full"
        placeholder="Search unsplash photos"
      />
      <button onClick={handleSearch} title="Search">
        <SearchIcon />
      </button>
    </div>
  )
}

export default SearchBox
