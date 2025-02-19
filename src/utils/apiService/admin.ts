import axios from 'axios'
import { PuzzleFormData } from 'src/screens/AdminPage/PuzzleEditPage'
import { Puzzle } from 'src/types/sudoku'
const jcc = require('json-case-convertor')

export const fetchGroupCounts = async (userToken: string) => {
  return axios.get('/puzzles/group_counts', {
    headers: { 'Authorization': `Bearer ${userToken}` },
  }).then(response => response.data)
}

export const apiAddPuzzle = async (puzzle: Puzzle, userToken: string) => {
  const apiPuzzle = jcc.snakeCaseKeys(puzzle)
  return axios.post('/puzzles', {
    puzzle: apiPuzzle,
  }, {
    headers: { 'Authorization': `Bearer ${userToken}` },
  }).then(response => response.data)
}

export const apiDeletePuzzle = async (id: string, userToken: string) => {
  return axios.delete(`/puzzles/${id}`, {
    headers: { 'Authorization': `Bearer ${userToken}` },
  }).then(response => response.data)
}

export const apiUpdatePuzzle = async (id: string, formData: PuzzleFormData, userToken: string) => {
  const body = {
    difficulty: formData.difficulty,
    source_collection_id: formData.sourceCollectionId === '' ? null : parseInt(formData.sourceCollectionId),
  }
  return axios.patch(`/puzzles/${id}`, body, {
    headers: { 'Authorization': `Bearer ${userToken}` },
  }).then(response => response.data)
    .catch(error => error.response.data)
}

export const fetchAllPuzzles = async (userToken: string) => {
  return axios.get('/puzzles', {
    headers: { 'Authorization': `Bearer ${userToken}` },
  }).then(response => response.data)
}

export const fetchPuzzleById = async (id: string, userToken: string) => {
  return axios.get('/puzzles', {
    params: { id },
    headers: { 'Authorization': `Bearer ${userToken}` },
  }).then(response => response.data)
}

export const fetchAllCollections = async (userToken: string) => {
  return axios.get('/puzzle_collections', {
    headers: { 'Authorization': `Bearer ${userToken}` },
  }).then(response => response.data)
}

export type PuzzleCollectionInput = {
  name: string
  url: string
}

export const createPuzzleCollection = async (puzzleCollection: PuzzleCollectionInput, userToken: string) => {
  const apiPuzzleCollection = jcc.snakeCaseKeys(puzzleCollection)
  return axios.post('/puzzle_collections', {
    puzzle_collection: apiPuzzleCollection,
  }, {
    headers: { 'Authorization': `Bearer ${userToken}` },
  }).then(response => response.data)
}

export const deletePuzzleCollection = async (id: number, userToken: string) => {
  return axios.delete(`/puzzle_collections/${id}`, {
    headers: { 'Authorization': `Bearer ${userToken}` },
  }).then(response => response.data)
}

export const apiUpdatePuzzleCollection = async (id: string, puzzleCollection: PuzzleCollectionInput, userToken: string) => {
  const apiPuzzleCollection = jcc.snakeCaseKeys(puzzleCollection)
  return axios.patch(`/puzzle_collections/${id}`, {
    puzzle_collection: apiPuzzleCollection,
  }, {
    headers: { 'Authorization': `Bearer ${userToken}` },
  }).then(response => response.data)
}

export type CompetitionInput = {
  name: string
  url: string
  fromDate: string
  toDate: string
  puzzleCollectionId: string | null
  ibPuzzleCollectionId: string | null
}

export const createCompetition = async (competition: CompetitionInput, userToken: string) => {
  const body = {
    name: competition.name,
    url: competition.url,
    from_date: competition.fromDate,
    to_date: competition.toDate,
    puzzle_collection_id: competition.puzzleCollectionId ? parseInt(competition.puzzleCollectionId) : null,
    ib_puzzle_collection_id: competition.ibPuzzleCollectionId ? parseInt(competition.ibPuzzleCollectionId) : null,
  }
  return axios.post('/competitions', {
    competition: body,
  }, {
    headers: { 'Authorization': `Bearer ${userToken}` },
  }).then(response => response.data)
}

export const deleteCompetition = async (id: number, userToken: string) => {
  return axios.delete(`/competitions/${id}`, {
    headers: { 'Authorization': `Bearer ${userToken}` },
  }).then(response => response.data)
}

export const apiUpdateCompetition = async (id: string, competition: CompetitionInput, userToken: string) => {
  const body = {
    name: competition.name,
    url: competition.url,
    from_date: competition.fromDate,
    to_date: competition.toDate,
    puzzle_collection_id: competition.puzzleCollectionId ? parseInt(competition.puzzleCollectionId) : null,
    ib_puzzle_collection_id: competition.ibPuzzleCollectionId ? parseInt(competition.ibPuzzleCollectionId) : null,
  }
  return axios.patch(`/competitions/${id}`, {
    competition: body,
  }, {
    headers: { 'Authorization': `Bearer ${userToken}` },
  }).then(response => response.data)
}
