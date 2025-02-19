import _ from 'lodash'
import { SudokuDifficulty, SudokuVariant } from 'src/types/sudoku'
import { StepRule } from 'src/types/wasm'

export const GRID_SIZES = [ 4, 6, 9 ]

export const ACTIVE_VARIANTS: SudokuVariant[] = [
  SudokuVariant.Classic,
  SudokuVariant.Killer,
  SudokuVariant.Thermo,
  SudokuVariant.Kropki,
  SudokuVariant.Diagonal,
  SudokuVariant.AntiKnight,
  SudokuVariant.Irregular,
  SudokuVariant.ExtraRegions,
  SudokuVariant.OddEven,
  SudokuVariant.TopBottom,
  SudokuVariant.Mixed,
]

export const DEFAULT_CELL_SIZE = 56

export const SudokuVariantDisplay: { [key in SudokuVariant]: string } = {
  [SudokuVariant.Classic]: 'Classic',
  [SudokuVariant.Killer]: 'Killer',
  [SudokuVariant.Thermo]: 'Thermo',
  [SudokuVariant.Arrow]: 'Arrow',
  [SudokuVariant.Irregular]: 'Irregular',
  [SudokuVariant.Kropki]: 'Kropki',
  [SudokuVariant.TopBottom]: 'Top-Bottom',
  [SudokuVariant.Diagonal]: 'Diagonal',
  [SudokuVariant.AntiKnight]: 'Anti Knight',
  [SudokuVariant.ExtraRegions]: 'Extra Regions',
  [SudokuVariant.OddEven]: 'Odd Even',
  [SudokuVariant.Mixed]: 'Mixed',
}

export const SudokuVariantRank = _.chain(SudokuVariant).values().invert().mapValues(_.toInteger).value()

export const SudokuDifficultyDisplay: { [key in SudokuDifficulty]: string } = {
  [SudokuDifficulty.Easy4x4]: 'Easy 4x4',
  [SudokuDifficulty.Easy6x6]: 'Easy 6x6',
  [SudokuDifficulty.Hard6x6]: 'Hard 6x6',
  [SudokuDifficulty.Easy9x9]: 'Easy 9x9',
  [SudokuDifficulty.Medium9x9]: 'Medium 9x9',
  [SudokuDifficulty.Hard9x9]: 'Hard 9x9',
}

export const SudokuDifficultyRank = _.chain(SudokuDifficulty).values().invert().mapValues(_.toInteger).value()

export const StepRuleDisplay: { [key in StepRule]: string } = {
  [StepRule.HiddenSingle]: 'Hidden Single',
  [StepRule.NakedSingle]: 'Naked Single',
  [StepRule.Thermo]: 'Thermo Single',
  [StepRule.Candidates]: 'Candidates',
  [StepRule.ThermoCandidates]: 'Thermo Candidates',
  [StepRule.KillerCandidates]: 'Killer Cage Candidates',
  [StepRule.Killer45]: 'Killer Sum Rule',
  [StepRule.Kropki]: 'Kropki Dot Pair Logic',
  [StepRule.KropkiChainCandidates]: 'Kropki Dot Chain Logic',
  [StepRule.TopBottomCandidates]: 'Top-Bottom Candidates',
  [StepRule.LockedCandidatesPairs]: 'Locked Candidate Pairs',
  [StepRule.NakedPairs]: 'Naked Pairs',
  [StepRule.HiddenPairs]: 'Hidden Pairs',
  [StepRule.CommonPeerEliminationKropki]: 'Common Peer Elimination (Kropki)',
  [StepRule.LockedCandidatesTriples]: 'Locked Candidate Triples',
  [StepRule.NakedTriples]: 'Naked Triples',
  [StepRule.HiddenTriples]: 'Hidden Triples',
  [StepRule.XWing]: 'X-Wing',
  [StepRule.YWing]: 'Y-Wing',
  [StepRule.XYWing]: 'XY-Wing',
  [StepRule.Swordfish]: 'Swordfish',
  [StepRule.CommonPeerElimination]: 'Common Peer Elimination',
  [StepRule.TurbotFish]: 'Turbot Fish',
}

export const enum EStepRuleDifficulty {
  Easy,
  Medium,
  Hard,
}

export const StepRuleDifficultyDisplay: { [key in EStepRuleDifficulty]: string } = {
  [EStepRuleDifficulty.Easy]: 'Easy',
  [EStepRuleDifficulty.Medium]: 'Medium',
  [EStepRuleDifficulty.Hard]: 'Hard',
}

export const StepRuleDifficulty: { [key in StepRule]: EStepRuleDifficulty } = {
  [StepRule.HiddenSingle]: EStepRuleDifficulty.Easy,
  [StepRule.NakedSingle]: EStepRuleDifficulty.Easy,
  [StepRule.Thermo]: EStepRuleDifficulty.Easy,
  [StepRule.Candidates]: EStepRuleDifficulty.Medium,
  [StepRule.ThermoCandidates]: EStepRuleDifficulty.Medium,
  [StepRule.KillerCandidates]: EStepRuleDifficulty.Medium,
  [StepRule.Killer45]: EStepRuleDifficulty.Medium,
  [StepRule.Kropki]: EStepRuleDifficulty.Medium,
  [StepRule.KropkiChainCandidates]: EStepRuleDifficulty.Medium,
  [StepRule.TopBottomCandidates]: EStepRuleDifficulty.Medium,
  [StepRule.LockedCandidatesPairs]: EStepRuleDifficulty.Medium,
  [StepRule.NakedPairs]: EStepRuleDifficulty.Medium,
  [StepRule.HiddenPairs]: EStepRuleDifficulty.Medium,
  [StepRule.CommonPeerEliminationKropki]: EStepRuleDifficulty.Hard,
  [StepRule.LockedCandidatesTriples]: EStepRuleDifficulty.Hard,
  [StepRule.NakedTriples]: EStepRuleDifficulty.Hard,
  [StepRule.HiddenTriples]: EStepRuleDifficulty.Hard,
  [StepRule.XWing]: EStepRuleDifficulty.Hard,
  [StepRule.YWing]: EStepRuleDifficulty.Hard,
  [StepRule.XYWing]: EStepRuleDifficulty.Hard,
  [StepRule.Swordfish]: EStepRuleDifficulty.Hard,
  [StepRule.CommonPeerElimination]: EStepRuleDifficulty.Hard,
  [StepRule.TurbotFish]: EStepRuleDifficulty.Hard,
}
