import _ from 'lodash'
import { createSlice } from '@reduxjs/toolkit'
import formatISO from 'date-fns/formatISO'
import { CellPosition, Grid, Puzzle } from 'src/types/sudoku'
import { computeFixedNumbersGrid } from 'src/utils/sudoku'
import { SudokuIntuitiveSolveResult } from 'src/types/wasm'
const jcc = require('json-case-convertor')

export enum ActionType {
  Digit = 'digit',
  Note = 'note',
  Delete = 'delete',
}

export enum HintLevel {
  Small = 'Small',
  Big = 'Big',
}

type UserAction = {
  type: ActionType
  cell: CellPosition
  value: number
  previousDigit: number | null
  previousNotes: number[]
  time: number
}

type ControlsState = {
  selectedCell: CellPosition | null
  notesActive: boolean
  actions: UserAction[]
  actionIndex: number
  hintSolution: SudokuIntuitiveSolveResult | null
  lastHint: string | null
  hintLevel: HintLevel | null
  paused: boolean
}

type PuzzleState = {
  data: Puzzle | null
  grid: Grid | null
  notes: number[][][] | null
  solveTimer: number
  solved: boolean
  lastUpdate: string | null
  refreshKey: number
  controls: ControlsState
}

const performAction = (state: PuzzleState, action: UserAction) => {
  const cell = state.controls.selectedCell!
  const { row, col } = cell

  switch(action.type) {
    case ActionType.Digit: state.grid![row][col] = action.value
                           break
    case ActionType.Note: state.notes![row][col] = _.xor(state.notes![row][col], [action.value])
                          break
    case ActionType.Delete: state.grid![row][col] = null
                            state.notes![row][col] = []
                            break
  }
}

export const puzzleSlice = createSlice({
  name: 'puzzle',
  initialState: {
    data: null,
    grid: null,
    notes: null,
    solveTimer: 0,
    solved: false,
    lastUpdate: null,
    refreshKey: 0,
    controls: {
      selectedCell: null,
      notesActive: false,
      actions: [],
      actionIndex: -1,
      hintSolution: null,
      lastHint: null,
      hintLevel: null,
      paused: false,
    },
  } as PuzzleState,
  reducers: {
    requestedPuzzle(_state) {
    },
    receivedPuzzle(state, action) {
      const puzzleData: Puzzle = jcc.camelCaseKeys(action.payload)
      puzzleData.constraints.killerCages ||= []
      state.data = puzzleData
      state.solved = false
      state.solveTimer = 0
      state.lastUpdate = formatISO(new Date())
      state.controls.selectedCell = null
      state.controls.actions = []
      state.controls.actionIndex = -1
      state.controls.hintSolution = null
      state.controls.lastHint = null
      state.controls.hintLevel = null
      state.controls.paused = false

      const { gridSize, fixedNumbers } = puzzleData.constraints
      const fixedNumbersGrid = computeFixedNumbersGrid(gridSize, fixedNumbers)
      state.grid = Array(gridSize).fill(null).map((_row, rowIndex) => Array(gridSize).fill(null).map((_col, colIndex) => (fixedNumbersGrid[rowIndex][colIndex])))

      state.notes = Array(gridSize).fill(null).map(() => Array(gridSize).fill(null).map(() => []))
    },
    clearPuzzle(state) {
      state.data = null
      state.lastUpdate = null
    },
    changeSelectedCell: (state, action) => {
      state.controls.selectedCell = action.payload
    },
    changeSelectedCellValue(state, action) {
      if (state.controls.selectedCell === null) {
        return
      }

      const value = action.payload
      const cell = state.controls.selectedCell
      const { row, col } = cell

      const previousDigit = state.grid![row][col]
      let newValue
      if (state.grid![row][col] === value) {
        newValue = null
      } else {
        newValue = value
      }

      const previousNotes = state.notes![row][col]
      const actionType = value === null ? ActionType.Delete : ActionType.Digit
      state.controls.actions.splice(state.controls.actionIndex + 1)
      const userAction: UserAction = {
        type: actionType,
        cell,
        value: newValue,
        previousDigit,
        previousNotes,
        time: state.solveTimer,
      }
      state.controls.actions.push(userAction)
      state.controls.actionIndex = state.controls.actions.length - 1

      performAction(state, userAction)

      state.controls.hintSolution = null
      state.controls.hintLevel = null
      state.lastUpdate = formatISO(new Date())
    },
    changeSelectedCellNotes(state, action) {
      if (state.controls.selectedCell === null) {
        return
      }

      const value = action.payload!
      const cell = state.controls.selectedCell
      const { row, col } = cell

      if (state.grid![row][col] !== null) {
        return
      }

      const previousDigit = state.grid![row][col]
      const previousNotes = [ ...state.notes![row][col] ]
      state.controls.actions.splice(state.controls.actionIndex + 1)
      const userAction: UserAction = {
        type: ActionType.Note,
        cell,
        value,
        previousDigit,
        previousNotes,
        time: state.solveTimer,
      }
      state.controls.actions.push(userAction)
      state.controls.actionIndex = state.controls.actions.length - 1

      performAction(state, userAction)

      state.lastUpdate = formatISO(new Date())
    },
    toggleNotesActive(state) {
      state.controls.notesActive = !state.controls.notesActive
    },
    updateTimer(state) {
      state.solveTimer += 1
    },
    requestSolved() {},
    responseSolved(state, action) {
      state.solved = action.payload.solved
      state.lastUpdate = formatISO(new Date())
    },
    fetchNewPuzzle(state) {
      // This will trigger refetching the puzzle
      state.refreshKey += 1
      state.lastUpdate = null
    },
    resetPuzzle(state) {
      const { gridSize, fixedNumbers } = state.data!.constraints
      const fixedNumbersGrid = computeFixedNumbersGrid(gridSize, fixedNumbers)
      state.grid = Array(gridSize).fill(null).map((_row, rowIndex) => Array(gridSize).fill(null).map((_col, colIndex) => (fixedNumbersGrid[rowIndex][colIndex])))
      state.notes = Array(gridSize).fill(null).map(() => Array(gridSize).fill(null).map(() => []))
      state.controls.actions = []
      state.controls.actionIndex = -1
    },
    undoAction(state) {
      const actionIndex = state.controls.actionIndex
      const userAction: UserAction = state.controls.actions[actionIndex]
      state.controls.selectedCell = userAction.cell
      state.grid![userAction.cell.row][userAction.cell.col] = userAction.previousDigit
      state.notes![userAction.cell.row][userAction.cell.col] = userAction.previousNotes
      state.controls.actionIndex--
    },
    redoAction(state) {
      state.controls.actionIndex++
      const actionIndex = state.controls.actionIndex
      const userAction: UserAction = state.controls.actions[actionIndex]
      state.controls.selectedCell = userAction.cell
      performAction(state, userAction)
    },
    changeHintSolution(state, action) {
      state.controls.hintSolution = action.payload
      state.controls.lastHint = formatISO(new Date())
      if (state.controls.hintSolution) {
        if (state.controls.hintLevel === null) {
          state.controls.hintLevel = HintLevel.Small
        } else if (state.controls.hintLevel === HintLevel.Small) {
          state.controls.hintLevel = HintLevel.Big
        }
      }
    },
    changeHintLevel(state, action) {
      state.controls.hintLevel = action.payload
    },
    changePaused(state, action) {
      state.controls.paused = action.payload
    },
  }
})

export const {
  requestedPuzzle, receivedPuzzle, clearPuzzle, changeSelectedCell, changeSelectedCellValue,
  changeSelectedCellNotes, toggleNotesActive, updateTimer, requestSolved, responseSolved,
  fetchNewPuzzle, resetPuzzle, undoAction, redoAction, changeHintSolution, changeHintLevel,
  changePaused,
} = puzzleSlice.actions

export default puzzleSlice.reducer
