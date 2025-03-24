export interface PaginationInterface {
  showPerPage?: boolean;
  showPageChange?: boolean;
  showGotoPage?: boolean;
  dataCount: number;
  goToPage: () => void;
  getPerPage: (value: number) => void;
  getCurrentPage: (value: number) => void;
}
