import { diffLines, Change } from 'diff';

export interface DiffResult {
  value: string;
  added?: boolean;
  removed?: boolean;
}

export const computeDiff = (text1: string, text2: string): DiffResult[] => {
  return diffLines(text1, text2);
};