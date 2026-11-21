import { useState, useEffect } from "react"
import { getSheetData } from "../services/sheetServices"


const DokumentasiPage = () => {
    const [theme, setTheme] = useState("light")
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        async function LoadData() {
            try {
                const result = await getSheetData('Dokumentasi')
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
        <div className={`${theme} bg-white text-gray-800 dark:text-white dark:bg-gray-800 px-5 sm:px-20 flex flex-col gap-4 py-18`}>
            <div className="">
                <span className="font-bold text-4xl">Dokumentasi Praktikum</span>
                <br />
                <span>Dokumentasi pelaksanaan kegiatan praktikum di Lab IPA MTsN 1 Kudus</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {data.map((item, i) => (
                    <div className="flex flex-col bg-gray-100 dark:bg-zinc-700 rounded-tr-xl shadow">
                        <img
                            src={item.foto}
                            className="w-2xs h-full rounded-tr-xl"
                            alt="foto" />
                        <div className="p-1">
                            <div className="text-center">{item.kegiatan}</div>
                            <div className="text-center text-xs text-gray-500 dark:text-gray-400">{item.tanggal}</div>
                        </div>
                    </div>
                ))}
            </div>
            {/* <div>{JSON.stringify(data)}</div> */}
        </div>
    )
}

export default DokumentasiPage