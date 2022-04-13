import clsx from 'clsx'
import React, { useCallback, useEffect } from 'react'
import Hero from './components/hero'
import { UnsplashResponse } from './features/search/definition'
import GridItem from './features/search/grid-item'
import SearchBox from './features/search/searchbox'
import { Fetch } from './utils/fetch'

function App() {
  React.useLayoutEffect(() => {}, [])
  const [animating, setAnimating] = React.useState(false)
  const [searching, setSearching] = React.useState(false)
  const [query, setQuery] = React.useState('')
  const [currentPage, setCurrentPage] = React.useState(1)
  const [result, setResult] = React.useState<UnsplashResponse | undefined>()
  // this state used for animate the header to top left
  const [flyToTop, setFlyToTop] = React.useState(false)

  // handle fetching previous page
  const handlePreviousPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }, [currentPage])

  // handle fetching next page
  const handleNextPage = useCallback(() => {
    // dont change current page when bigger than total pages
    if (result && currentPage < result.total_pages - 1) {
      setCurrentPage(currentPage + 1)
    }
  }, [currentPage, result])

  // handle search (call unsplash api)
  useEffect(() => {
    if (!query) return
    setFlyToTop(true)
    setSearching(true)
    const url = `https://api.unsplash.com/search/photos?page=${currentPage}&query=${query}`
    Fetch<UnsplashResponse>(url, {
      authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_CLIENT_ID}`,
    }).then((result) => {
      if (result) {
        setResult(result)
      }
      setSearching(false)
    })
  }, [currentPage, query])

  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center overflow-y-hidden">
      <div className="w-fit h-fit flex-col space-y-4">
        <Hero flyToTop={flyToTop} onAnimating={(s) => setAnimating(s)} />
        <SearchBox
          onSearch={(p, q) => {
            setQuery(q)
            setCurrentPage(p)
          }}
          animate={animating}
        />
      </div>
      {result && !animating && (
        <div className=" border-slate-900 w-screen h-screen pt-24 px-4">
          <div className="px-4 py-4 w-full h-fit flex flex-row space-x-8 items-center justify-end">
            {result.total_pages > 10 ? (
              <div className="btn-group">
                <button onClick={() => setCurrentPage(1)} className="btn">
                  {'<<'}
                </button>
                <button onClick={handlePreviousPage} className="btn">
                  {'<'}
                </button>
                <p className="page-number">
                  {currentPage} of {result.total_pages}
                </p>
                <button onClick={handleNextPage} className="btn">
                  {'>'}
                </button>
                <button
                  onClick={() => setCurrentPage(result.total_pages)}
                  className="btn"
                >
                  {'>>'}
                </button>
              </div>
            ) : (
              <div className="btn-group">
                <button className="btn active">1</button>
                <button className="btn">2</button>
                <button className="btn">3</button>
                <button className="btn">4</button>
              </div>
            )}
          </div>
          <div
            className={clsx('w-full h-full overflow-auto', {
              'blur-md': searching,
            })}
          >
            <div className=" grid grid-cols-3 pb-32">
              {result.results.map((item, i) => (
                <GridItem key={i} {...item} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
