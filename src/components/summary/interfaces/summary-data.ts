export interface SummaryLine {
  label: string;
  value: any;
  startsGroup: boolean;
}

export interface DownloadData {
  title: string;
  description: string;
  btnText: string;
  url: string;
}

export interface SummaryData {
  lines: SummaryLine[];
  downloadData?: DownloadData;
}
