import { useState, useEffect, useMemo } from "react"
import { getSheetData } from "../services/sheetServices"
import { Search, List, LayoutGrid } from "lucide-react"
import { Link, useSearchParams } from "react-router-dom"

const Inventaris = () => {
    const [theme, setTheme] = useState("light");
    const [searchParams, setSearchParams] = useSearchParams()
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [filter, setFilter] = useState(searchParams.get("kategori") || '');
    const [search, setSearch] = useState("");
    const [layout, setLayout] = useState('list')

    useEffect(() => {
        async function loadData() {
            try {
                const result = await getSheetData("Inventaris");
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        loadData();

    }, []);

    const filteredData = useMemo(() => {
        let difilter = data.filter((item) => {
            if (filter && search) {
                console.log('kondisi 1')
                return item.kategori === filter && item.nama.toLowerCase().includes(search.toLowerCase())
            } else if (filter) {
                console.log('kondisi 2')
                return item.kategori === filter
            } else if (search) {
                console.log('kondisi 3')
                return item.nama.toLowerCase().includes(search.toLowerCase())
            } else {
                console.log('kondisi 4')
                return item
            }
        })
        return difilter
    }, [data, filter, search]);

    if (loading) {
        return <p className="pt-20 pb-7">Memuat data ....</p>;
    }

    if (error) {
        return <p className="pt-20 pb-7">Gagal memuat data: {error}</p>;
    }

    return (
        <div className={`${theme} bg-slate-50 text-midnight-violet-800 dark:text-ivory-50 px-10`}>
            <div className="pt-20 pb-7">
                <span className="font-bold text-4xl text-dusty-grape-600">Inventaris</span>
                <br />
                <span>Daftar alat, bahan dan perabot Lab IPA MTsN 1 Kudus</span>
            </div>

            <div className="flex flex-col">
                <div className="flex items-center gap-1">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cari nama, kode, atau lokasi..."
                        className="w-full rounded border border-dusty-grape-200 p-2"
                    />
                    <button
                        type="button"
                        className="p-4 cursor-pointer rounded-full bg-dusty-grape-100"
                    >
                        <Search size={20} color="#8078ba" />
                    </button>
                </div>
                <div className="flex justify-between">
                    <div className="flex gap-2 m-2">
                        <button onClick={() => { setFilter(filter !== 'Fisika' ? 'Fisika' : '') }} className={`${filter === "Fisika" ? "bg-blue-200" : "bg-slate-200"} p-2 rounded font-semibold`}>
                            Fisika
                        </button>
                        <button onClick={() => { setFilter(filter !== 'Kimia' ? 'Kimia' : '') }} className={`${filter === "Kimia" ? "bg-sandy-brown-200" : "bg-slate-200"} p-2 rounded font-semibold`}>
                            Kimia
                        </button>
                        <button onClick={() => { setFilter(filter !== 'Biologi' ? 'Biologi' : '') }} className={`${filter === "Biologi" ? "bg-celadon-200" : "bg-slate-200"} p-2 rounded font-semibold`}>
                            Biologi
                        </button>
                        <button onClick={() => { setFilter(filter !== 'Bahan' ? 'Bahan' : '') }} className={`${filter === "Bahan" ? "bg-midnight-violet-200" : "bg-slate-200"} p-2 rounded font-semibold`}>
                            Bahan
                        </button>
                        <button onClick={() => { setFilter(filter !== 'Perabot' ? 'Perabot' : '') }} className={`${filter === "Perabot" ? "bg-banana-cream-200" : "bg-slate-200"} p-2 rounded font-semibold`}>
                            Perabot
                        </button>
                    </div>
                    <div className="flex items-center">
                        <button onClick={() => { setLayout('list') }} className={`p-2 border border-dusty-grape-300 rounded-l-xl ${layout == 'list' ? 'bg-dusty-grape-200' : 'bg-white'}`}>
                            <List size={20} color="#8078ba" />
                        </button>
                        <button onClick={() => { setLayout('grid') }} className={`p-2 border border-dusty-grape-300 rounded-r-xl ${layout == 'grid' ? 'bg-dusty-grape-200' : 'bg-white'}`}>
                            <LayoutGrid size={20} color="#8078ba" />
                        </button>
                    </div>
                </div>
            </div>
            {/* <div>{JSON.stringify(filteredData)}</div> */}
            {layout === 'list' ? (
                <div className="max-h-[600px] overflow-auto rounded-lg border border-dusty-grape-200 mb-5">
                    <table className="w-full min-w-[1100px] table-fixed border-collapse text-sm">
                        <thead className="sticky top-0 z-10 bg-dusty-grape-200">
                            <tr>
                                <th className="w-64 px-3 py-3 text-center sm:text-xl">Nama</th>
                                <th className="w-28 px-3 py-3 text-center sm:text-xl">Kategori</th>
                                <th className="w-32 px-3 py-3 text-center sm:text-xl">Kode</th>
                                <th className="w-32 px-3 py-3 text-center sm:text-xl">Lokasi</th>
                                <th className="w-20 px-3 py-3 text-center sm:text-xl">Jumlah</th>
                                <th className="w-20 px-3 py-3 text-center sm:text-xl">Baik</th>
                                <th className="w-24 px-3 py-3 text-center sm:text-xl">Rusak ringan</th>
                                <th className="w-24 px-3 py-3 text-center sm:text-xl">Rusak berat</th>
                                <th className="w-64 px-3 py-3 text-center sm:text-xl">Keterangan</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredData.map((item, i) => (
                                <tr
                                    key={i}
                                    className={`border-b cursor-pointer border-dusty-grape-200 hover:bg-magenta-bloom-100 ${i % 2 === 0 ? "bg-white" : "bg-dusty-grape-50"}`}
                                >
                                    <td className="break-words px-3 py-3">{item.nama}</td>

                                    <td className="px-3 py-3 text-center">
                                        <span
                                            className={`inline-block rounded-md px-2 py-1 text-xs ${item.kategori === "Fisika"
                                                ? "bg-blue-200"
                                                : item.kategori === "Kimia"
                                                    ? "bg-sandy-brown-200"
                                                    : item.kategori === "Biologi"
                                                        ? "bg-celadon-200"
                                                        : item.kategori === "Bahan"
                                                            ? "bg-midnight-violet-200"
                                                            : "bg-banana-cream-200"
                                                }`}
                                        >
                                            {item.kategori}
                                        </span>
                                    </td>

                                    <td className="px-3 py-3 text-center">{item.kode}</td>
                                    <td className="break-words px-3 py-3 text-center">
                                        {item.lokasi}
                                    </td>
                                    <td className="px-3 py-3 text-center">{item.jumlah}</td>
                                    <td className="px-3 py-3 text-center">{item.baik}</td>
                                    <td className="px-3 py-3 text-center">
                                        {item.rusak_ringan}
                                    </td>
                                    <td className="px-3 py-3 text-center">
                                        {item.rusak_berat}
                                    </td>
                                    <td className="break-words px-3 py-3">
                                        {item.keterangan || "-"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-5">
                    {filteredData.map((item, i) => (
                        <Link key={i} to={`/detailInventaris/${item.kode}`}>
                            <div className="flex flex-col shadow rounded-md bg-dusty-grape-100 hover:scale-105 p-1">
                                <img
                                    src={item.foto}
                                    className="w-4xs h-full rounded-t-md"
                                    alt="foto" />
                                <div className="flex flex-col p-2">
                                    <span className="font-semibold text-md mb-1 text-center">{item.nama}</span>
                                    <div className="flex justify-between">
                                        <span className={`rounded-md px-2 py-1 text-xs text-midnight-violet-500 ${item.kategori === "Fisika"
                                            ? "bg-blue-200"
                                            : item.kategori === "Kimia"
                                                ? "bg-sandy-brown-200"
                                                : item.kategori === "Biologi"
                                                    ? "bg-celadon-200"
                                                    : item.kategori === "Bahan"
                                                        ? "bg-midnight-violet-200"
                                                        : "bg-banana-cream-200"}`}>{item.kategori}</span>
                                        <span className="text-xs text-midnight-violet-500">{item.kode}</span>
                                        <span className="text-xs text-midnight-violet-500">jumlah: {item.jumlah}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Inventaris