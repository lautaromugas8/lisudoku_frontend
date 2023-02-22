import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'src/hooks'
import PageMeta from 'src/components/PageMeta'
import ErrorPage from 'src/components/ErrorPage'
import LoadingSpinner from 'src/components/LoadingSpinner'
import Puzzle from 'src/components/Puzzle'
import { importPuzzle, ImportResult, useImportParam } from 'src/utils/import'
import { receivedPuzzle } from 'src/reducers/puzzle'

const ExternalPuzzlePage = () => {
  const importData = useImportParam()

  const dispatch = useDispatch()

  const [ error, setError ] = useState(false)
  const [ puzzleLoading, setPuzzleLoading ] = useState(false)

  const isExternal = useSelector(state => state.puzzle.data?.isExternal)
  const externalData = useSelector(state => state.puzzle.data?.externalData)

  useEffect(() => {
    if (puzzleLoading || error) {
      return
    }
    if (importData === undefined) {
      setError(true)
      return
    }

    if (!isExternal || importData !== externalData) {
      setPuzzleLoading(true)
      importPuzzle(importData).then((result: ImportResult) => {
        if (result.error) {
          setError(true)
        } else {
          dispatch(receivedPuzzle({
            constraints: result.constraints,
            isExternal: true,
            externalData: importData,
          }))
        }

        setPuzzleLoading(false)
        if (result.error) {
          throw new Error(result.message)
        }
      })
    }
  }, [dispatch, puzzleLoading, error, importData, isExternal, externalData])

  return (
    <>
      <PageMeta title={`External Puzzle`}
                url={`https://lisudoku.xyz/e?import=${importData}`}
                description="Solve an external puzzle" />
      {error ? (
        <ErrorPage />
      ) : (puzzleLoading) ? (
        <LoadingSpinner fullPage />
      ) : (
        <Puzzle />
      )}
    </>
  )
}

export default ExternalPuzzlePage
