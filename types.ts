
export interface FeedData {
  tanggal: string;
  toko: string;
  lokasi: string;
  jenis: string;
  merek: string;
  npp: string; // Baru
  batch: string;
  kondisiFisik: string;
  jamur: 'Ya' | 'Tidak';
  kadarAir: number | string;
  nutrisi: string; // Baru
  kemasan: string;
  palet: 'Ya' | 'Tidak';
  hasil: 'Layak' | 'Tidak Layak' | 'Tindak Lanjut';
  tindakLanjut: string;
  keterangan: string;
  harga: number | string;
}

export interface FilterState {
  search: string;
  lokasi: string;
  merek: string;
  hasil: string;
  jamur: string;
  sortField: 'tanggal' | 'harga';
  sortOrder: 'asc' | 'desc';
}
