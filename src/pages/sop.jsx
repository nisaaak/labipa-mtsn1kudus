import { Astroid } from "lucide-react"
import { useState, useEffect } from "react"
import { getSheetData } from "../services/sheetServices"

const SopPage = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        async function LoadData() {
            try {
                const result = await getSheetData('SOP')
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
        <div className={`bg-white text-gray-800 dark:text-white dark:bg-gray-800 px-5 sm:px-20 flex flex-col gap-4 py-18`}>
            <div className="">
                <span className="font-bold text-4xl">SOP</span>
                <br />
                <span className="text-xl">(Standar Operasional Prosedur)</span>
                <br />
                <span>SOP pelaksanaan praktikum di Lab IPA MTsN 1 Kudus</span>
            </div>
            <div className="flex flex-col gap-10 py-5">
                <div className="bg-gray-100 dark:bg-gray-700 p-1 rounded-tr-4xl">
                    <div className="flex flex-col bg-gray-100 dark:bg-gray-700 p-4 rounded-tr-4xl gap-3 border-dashed border-2 border-gray-300 dark:border-gray-500">
                        <div className="flex items-center">
                            <Astroid size={20} className="dark:text-amber-200 text-amber-500" />
                            <span className="text-sm sm:text-xl font-semibold">SOP Penggunaan Laboratorium IPA</span>
                        </div>
                        <iframe
                            src={data[0].link}
                            title="Pratinjau dokumen PDF"
                            width="100%"
                            height="600"
                            style={{ border: "none" }}
                            allow="autoplay"
                        />
                    </div>
                </div>

                <div className="bg-gray-100 dark:bg-gray-700 p-1 rounded-tr-4xl">
                    <div className="flex flex-col bg-gray-100 dark:bg-gray-700 p-4 rounded-tr-4xl gap-3 border-dashed border-2 border-gray-300 dark:border-gray-500">
                        <div className="flex items-center">
                            <Astroid size={20} className="text-amber-500" />
                            <span className="text-sm sm:text-xl font-semibold">SOP Pelaksanaan Praktikum/Kegiatan di Laboratorium IPA</span>
                        </div>
                        <iframe
                            src={data[1].link}
                            title="Pratinjau dokumen PDF"
                            width="100%"
                            height="600"
                            style={{ border: "none" }}
                            allow="autoplay"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SopPage