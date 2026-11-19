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
        return <p className="pt-20 pb-7">Memuat data ....</p>
    }

    if (error) {
        return <p className="pt-20 pb-7">Gagal memuat data: {error}</p>
    }

    return (
        <div className={`${theme} bg-white text-stone-800 dark:text-white dark:bg-stone-800 px-10 sm:px-20 flex flex-col gap-4 py-18`}>
            <div className="">
                <span className="font-bold text-4xl">Dokumentasi Praktikum</span>
                <br />
                <span>Dokumentasi pelaksanaan kegiatan praktikum di Lab IPA MTsN 1 Kudus</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {data.map((item, i) => (
                    <div className="flex flex-col bg-stone-100 dark:bg-zinc-700 rounded-tr-xl shadow">
                        <img
                            src={item.foto}
                            className="w-2xs h-full rounded-tr-xl"
                            alt="foto" />
                        <div className="p-1">
                            <div className="text-center">{item.kegiatan}</div>
                            <div className="text-center text-xs text-stone-500 dark:text-stone-400">{item.tanggal}</div>
                        </div>
                    </div>
                ))}
            </div>
            {/* <div>{JSON.stringify(data)}</div> */}
        </div>
    )
}

export default DokumentasiPage