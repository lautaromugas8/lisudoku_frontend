import { useState } from 'react'
import useInterval from 'react-useinterval'
import classNames from 'classnames'
import PuzzleCardIcons from '../AdminPage/PuzzlesPage/PuzzleCardIcons'
import SudokuGrid from 'src/components/Puzzle/SudokuGrid'
import { SudokuDifficultyDisplay, SudokuVariantDisplay } from 'src/utils/constants'
import { computeCellSize, getDurationShort } from 'src/utils/misc'
import { differenceInSeconds, parseISO } from 'date-fns'
import { useWindowWidth } from '@react-hook/window-size'
import { TvPuzzle } from 'src/reducers/tv'

const TvPuzzleCardDescription = ({ puzzle }: { puzzle: TvPuzzle }) => {
  const [ now, setNow ] = useState<Date>(new Date())
  // Update timer every 5s
  useInterval(() => {
    setNow(new Date())
  }, 5000)

  return (
    <div className="flex flex-col items-center mt-1 w-fit text-sm">
      <div className="flex gap-x-2">
        <div>{SudokuVariantDisplay[puzzle.variant]} - {SudokuDifficultyDisplay[puzzle.difficulty]}</div>
        <div>
          <PuzzleCardIcons constraints={puzzle.constraints} />
        </div>
      </div>
      {puzzle.solved ? (
        <div>
          Solved!
          <span className={classNames('ml-1 absolute', {
            'animate-expand': differenceInSeconds(now, parseISO(puzzle.updatedAt)) < 10,
          })}>
            🎉
          </span>
        </div>
      ) : (
        <div className="text-gray-500">
          Updated {getDurationShort(puzzle.updatedAt)} ago
        </div>
      )}
      {/* <Link to={getPuzzleRelativeUrl(puzzle.puzzleId)} target="_blank">
        Play
      </Link> */}
    </div>
  )
}

const TvPuzzleCard = ({ puzzle }: { puzzle: TvPuzzle }) => {
  const gridSize = puzzle.constraints.gridSize

  // Calculate the available screen width and subtract parent paddings
  const width = useWindowWidth()
  const availableWidth = width - 40 - 24

  const cellSize = computeCellSize(gridSize, availableWidth, 0.6)

  return (
    <div className="flex flex-col items-center w-fit p-3 pb-1 bg-gray-900 rounded border border-gray-800">
      <SudokuGrid constraints={puzzle.constraints}
                  grid={puzzle.grid}
                  notes={puzzle.notes}
                  selectedCells={puzzle.selectedCells}
                  checkErrors={false}
                  loading={false}
                  onCellClick={null}
                  cellSize={cellSize} />
      <TvPuzzleCardDescription puzzle={puzzle} />
    </div>
  )
}

export default TvPuzzleCard
