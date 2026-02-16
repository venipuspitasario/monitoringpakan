
import { FeedData } from '../types';

// URL API Terbaru yang disesuaikan dengan spreadsheet user
const API_URL = 'https://script.google.com/macros/s/AKfycbzF6YlwkY5a2q72AYiQix78kxoqf08O8S0QVpOSYhNGss2V8QheepK76Epv_zy3ZtUH/exec';

const MOCK_DATA: FeedData[] = [
  {
    tanggal: '2023-10-25',
    toko: 'Poultry Sejahtera',
    lokasi: 'Malang',
    jenis: 'Pakan Ayam Petelur',
    merek: 'Charoen Pokphand',
    npp: 'RI. I. 2304123',
    batch: 'B-123 / 2024-10-25',
    kondisiFisik: 'Baik, Butiran Utuh',
    jamur: 'Tidak',
    kadarAir: 12.5,
    nutrisi: 'Protein 18%, Lemak 3%',
    kemasan: 'Karung Rapi',
    palet: 'Ya',
    hasil: 'Layak',
    tindakLanjut: '-',
    keterangan: 'Stok baru masuk',
    harga: 325000,
  }
];

export const fetchFeedData = async (): Promise<FeedData[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json();
    
    // Validasi jika data kosong atau bukan array
    if (!Array.isArray(data)) {
      console.warn('API returned non-array data, using mock/cache');
      throw new Error('Invalid data format');
    }

    localStorage.setItem('feed_data_cache', JSON.stringify(data));
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    const cached = localStorage.getItem('feed_data_cache');
    return cached ? JSON.parse(cached) : MOCK_DATA;
  }
};
