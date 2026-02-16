
/**
 * TAHAP 1: SETUP OTOMATIS
 * Jalankan fungsi 'setupSheet' ini satu kali untuk memperbarui kolom.
 */
function setupSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheets()[0];
  sheet.setName("Data Pakan");
  
  const headers = [
    "Tanggal Pemeriksaan",     // 0 (A)
    "Nama Toko/Poultry",       // 1 (B)
    "Lokasi Poultry",          // 2 (C)
    "Jenis Pakan / Bahan Pakan",// 3 (D)
    "Merek Pakan",             // 4 (E)
    "NPP (Nomor Pendaftaran Pakan)", // 5 (F) - BARU
    "Nomor Batch / Expired Date",// 6 (G)
    "Kondisi Fisik Pakan",      // 7 (H)
    "Indikasi Jamur (Ya/Tidak)", // 8 (I)
    "Kandungan Kadar Air Pakan", // 9 (J)
    "Kandungan Nutrisi Pakan",  // 10 (K) - BARU
    "Kondisi Kemasan",          // 11 (L)
    "Penyimpanan Pakai Palet",  // 12 (M)
    "Hasil Pemeriksaan",        // 13 (N)
    "Tindak Lanjut",            // 14 (O)
    "Keterangan",               // 15 (P)
    "Harga (Rp)"                // 16 (Q)
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers])
    .setBackground("#16a34a")
    .setFontColor("white")
    .setFontWeight("bold")
    .setHorizontalAlignment("center");
  
  // Contoh data
  const sampleData = [
    ["2024-01-15", "Toko Makmur Jaya", "Kasongan", "Pakan Ayam", "CP 511", "RI.I.2301001", "EXP: 12/2024", "Bagus", "Tidak", 12.5, "Protein 18%, Lemak 3%", "Utuh", "Ya", "Layak", "-", "Stok Baru", 350000]
  ];
  
  if (sheet.getLastRow() < 2) {
    sheet.getRange(2, 1, sampleData.length, sampleData[0].length).setValues(sampleData);
  }
  
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, headers.length);
  
  Logger.log("Update Berhasil! Kolom NPP (F) dan Nutrisi (K) telah disinkronkan.");
}

/**
 * TAHAP 2: API ENDPOINT
 */
function doGet(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheets()[0];
    const data = sheet.getDataRange().getValues();
    
    if (data.length < 2) return ContentService.createTextOutput("[]").setMimeType(ContentService.MimeType.JSON);

    const rows = data.slice(1);
    
    const result = rows.map(row => {
      let tanggalVal = row[0];
      if (tanggalVal instanceof Date) {
        tanggalVal = Utilities.formatDate(tanggalVal, "GMT+7", "yyyy-MM-dd");
      }

      return {
        tanggal: tanggalVal || "",
        toko: row[1] || "",
        lokasi: row[2] || "",
        jenis: row[3] || "",
        merek: row[4] || "",
        npp: row[5] || "",          // Kolom F
        batch: row[6] || "",        // Kolom G
        kondisiFisik: row[7] || "",
        jamur: row[8] || "Tidak",
        kadarAir: row[9] || 0,
        nutrisi: row[10] || "",     // Kolom K
        kemasan: row[11] || "",
        palet: row[12] || "Tidak",
        hasil: row[13] || "Layak",
        tindakLanjut: row[14] || "",
        keterangan: row[15] || "",
        harga: row[16] || 0         // Kolom Q
      };
    });
    
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
