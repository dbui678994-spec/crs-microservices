export interface Course {
  id: number;
  tenMonHoc: string;
  soTinChi: number;
  soChoConLai: number;
  soChoToiDa: number;
}

export interface PagedResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}
