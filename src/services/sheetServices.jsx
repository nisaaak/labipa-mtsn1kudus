
const API_URL = 'https://script.google.com/macros/s/AKfycbzujD_PjOZQwQVRA3bru9K9Ao08BGj8kmfwHAROqKermg9jFSJ06heaJaejL4UUhYrLCQ/exec';

export async function getSheetData(sheet, kode = "") {
    const url = new URL(API_URL);

    url.searchParams.set("sheet", sheet);

    if (kode) {
        url.searchParams.set("kode", kode);
    }

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Gagal mengambil data dari server.");
    }

    const result = await response.json();

    if (!Array.isArray(result)) {
        throw new Error(result.message || "Format data API tidak valid.");
    }

    return result;
}



