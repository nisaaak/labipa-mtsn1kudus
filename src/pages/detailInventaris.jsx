import { useState, useEffect } from "react"
import { getSheetData } from "../services/sheetServices"
import { useParams } from "react-router-dom"
import { MapPin, Astroid } from "lucide-react"


const DetailInventarisPage = () => {
    const { kode } = useParams()
    const [theme, setTheme] = useState("light")
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        async function LoadData() {
            try {
                const result = await getSheetData('Inventaris', kode)
                setData(result)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        LoadData()
    }, [])

    if (loading) {
        return (
            <div class="flex items-center min-h-screen justify-center space-x-2 pt-20">
                <div
                    class="h-8 w-8 animate-spin rounded-full border-4 border-solid border-gray-500 border-t-transparent"
                ></div>
                <p class="text-gray-600 dark:text-gray-300">Loading...</p>
            </div>
        )
    }

    if (error) {
        return <p className="pt-20 pb-7">Gagal memuat data: {error}</p>
    }

    return (
        <div className={`${theme}  bg-white text-gray-800 dark:text-white dark:bg-gray-800 px-5 sm:px-20 flex flex-col gap-4 py-18`}>
            <div className="">
                <span className="font-bold text-4xl">Detail Inventaris</span>
            </div>
            <div className="flex flex-col gap-3">
                <div className="bg-gray-100 dark:bg-gray-700 p-1 rounded-tr-4xl">
                    <div className="flex flex-col bg-gray-100 dark:bg-gray-700 p-4 rounded-tr-4xl gap-3 border-dashed border-2 border-gray-300 dark:border-gray-500">
                        <div className="flex justify-between">
                            <div className={`rounded-xl px-2 text-gray-600 
                            ${data[0].kategori === "Fisika"
                                    ? "bg-blue-200"
                                    : data[0].kategori === "Kimia"
                                        ? "bg-orange-200"
                                        : data[0].kategori === "Biologi"
                                            ? "bg-green-200"
                                            : data[0].kategori === "Bahan"
                                                ? "bg-rose-200"
                                                : "bg-yellow-200"
                                }`}>
                                {data[0].kategori}
                            </div>
                            <div className="text-gray-600 dark:text-gray-300">
                                Kode: {data[0].kode}
                            </div>
                        </div>
                        <div className="flex justify-center">
                            {data[0].foto && (
                                <img
                                    src={data[0].foto}
                                    className="w-md h-auto rounded-tr-4xl"
                                    alt="foto inventaris" />
                            )}
                        </div>
                        <span className="text-2xl font-semibold border-b-2 border-gray-300">
                            {data[0].nama}
                        </span>
                        <div className="flex gap-2">
                            <div className="flex flex-1 p-3 gap-2 flex-col bg-white dark:bg-gray-600 shadow-xl rounded-xs">
                                <div className="text-gray-500 dark:text-gray-300 text-sm sm:text-lg text-center flex-1">
                                    Lokasi Penyimpanan
                                </div>
                                <div className="flex sm:text-xl font-semibold items-center justify-center flex-1">
                                    <MapPin size={15} className="" />
                                    {data[0].lokasi}
                                </div>
                            </div>
                            <div className="flex flex-1 p-3 gap-2 flex-col bg-white dark:bg-gray-600 shadow-xl rounded-xs">
                                <div className="text-gray-500 dark:text-gray-300 text-sm sm:text-lg text-center flex-1">
                                    Jumlah Inventaris
                                </div>
                                <div className="font-semibold sm:text-xl flex-1 text-center">
                                    {data[0].jumlah}{' '}{data[0].satuan}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col bg-white dark:bg-gray-600 shadow-xl rounded-xs p-3 gap-2">
                            <div className="flex justify-between">
                                <div className="text-gray-500 dark:text-gray-300 text-sm sm:text-lg">
                                    Kondisi
                                </div>
                                <div className="bg-green-200 dark:bg-green-400 px-2 rounded-xl text-sm sm:text-lg">
                                    {data[0].baik / data[0].jumlah * 100}% baik
                                </div>
                            </div>
                            <div className="flex w-full">
                                <div className={`bg-green-500 dark:bg-green-400 h-2`} style={{ width: `${data[0].baik / data[0].jumlah * 100}%` }}></div>
                                <div className={`bg-yellow-500 dark:bg-yellow-400 h-2`} style={{ width: `${data[0].rusak_ringan / data[0].jumlah * 100}%` }}></div>
                                <div className={`bg-red-500 dark:bg-red-400 h-2`} style={{ width: `${data[0].rusak_berat / data[0].jumlah * 100}%` }}></div>
                            </div>
                            <div className="flex justify-between">
                                <div className="flex items-center gap-1">
                                    <div className="bg-green-500 dark:bg-green-400 rounded-full w-2 h-2" />
                                    <div className="text-green-500 dark:text-green-400 text-xs sm:text-lg">Baik: {data[0].baik}</div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="bg-yellow-500 dark:bg-yellow-400 rounded-full w-2 h-2" />
                                    <div className="text-yellow-500 dark:text-yellow-400 text-xs sm:text-lg">Rusak ringan: {data[0].rusak_ringan}</div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="bg-red-500 dark:bg-red-400 rounded-full w-2 h-2" />
                                    <div className="text-red-500 dark:text-red-400 text-xs sm:text-lg">Rusak berat: {data[0].rusak_berat}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {data[0]?.detail && (
                    <div className="bg-gray-100 dark:bg-gray-700 p-1 rounded-tr-4xl">
                        <div className="flex flex-col bg-gray-100 dark:bg-gray-700 p-4 rounded-tr-4xl gap-3 border-dashed border-2 border-gray-300 dark:border-gray-500">
                            <div className="flex items-center gap-1">
                                <Astroid size={20} className="dark:text-amber-200 text-amber-500" />
                                <span className="text-xl font-semibold">Keterangan</span>
                            </div>
                            <div className="text-gray-600 dark:text-gray-300">{data[0]?.detail}</div>
                        </div>
                    </div>
                )}

                {data[0]?.fungsi && (
                    <div className="bg-gray-100 dark:bg-gray-700 p-1 rounded-tr-4xl">
                        <div className="flex flex-col bg-gray-100 dark:bg-gray-700 p-4 rounded-tr-4xl gap-3 border-dashed border-2 border-gray-300 dark:border-gray-500">
                            <div className="flex items-center gap-1">
                                <Astroid size={20} className="dark:text-amber-200 text-amber-500" />
                                <span className="text-xl font-semibold">Fungsi</span>
                            </div>
                            <div className="text-gray-600 dark:text-gray-300">{data[0]?.fungsi}</div>
                        </div>
                    </div>
                )}

                {data[0]?.penggunaan && (
                    <div className="bg-gray-100 dark:bg-gray-700 p-1 rounded-tr-4xl">
                        <div className="flex flex-col bg-gray-100 dark:bg-gray-700 p-4 rounded-tr-4xl gap-3 border-dashed border-2 border-gray-300 dark:border-gray-500">
                            <div className="flex items-center gap-1">
                                <Astroid size={20} className="dark:text-amber-200 text-amber-500" />
                                <span className="text-xl font-semibold">Penggunaan</span>
                            </div>
                            {data[0].penggunaan.split('\n').map((item, i) => (
                                <div key={i} className="flex gap-1">
                                    <div className="text-gray-600 dark:text-gray-300">{i + 1}</div>
                                    <div className="text-gray-600 dark:text-gray-300">{item}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {data[0].video && (
                    <div className="bg-gray-100 dark:bg-gray-700 p-1 rounded-tr-4xl">
                        <div className="flex flex-col bg-gray-100 dark:bg-gray-700 p-4 rounded-tr-4xl gap-3 border-dashed border-2 border-gray-300 dark:border-gray-500">
                            <div className="flex items-center gap-1">
                                <Astroid size={20} className="dark:text-amber-200 text-amber-500" />
                                <span className="text-xl font-semibold">Video Penggunaan</span>
                            </div>
                            <iframe
                                className="w-fit aspect-video"
                                src={`https://www.youtube.com/embed/${data[0]?.video}`}
                                title="YouTube video player"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowfullscreen>
                            </iframe>
                        </div>
                    </div>
                )}

                {data[0].sumber && (
                    <div className="bg-gray-100 dark:bg-gray-700 p-1 rounded-tr-4xl">
                        <div className="flex flex-col bg-gray-100 dark:bg-gray-700 p-4 rounded-tr-4xl gap-3 border-dashed border-2 border-gray-300 dark:border-gray-500">
                            <div className="flex items-center gap-1">
                                <Astroid size={20} className="dark:text-amber-200 text-amber-500" />
                                <span className="text-xl font-semibold">Referensi</span>
                            </div>
                            {data[0].sumber.split('\n').map((item, i) => (
                                <div key={i} className="flex gap-1">
                                    <div className="text-sm text-gray-600 dark:text-gray-300">{item}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
            {/* <div>{JSON.stringify(data)}</div> */}
        </div>
    )
}

export default DetailInventarisPage