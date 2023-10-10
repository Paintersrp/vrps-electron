export interface ProcessPathData {
  total: number;
  conditions: {
    [condition: string]: number;
  };
}

export interface BatchData {
  [processPath: string]: ProcessPathData;
}

export interface ParsedData {
  [batchKey: string]: BatchData;
}

export interface CsvEntry {
  dwell: string;
  processPath: string;
  condition: string;
}
