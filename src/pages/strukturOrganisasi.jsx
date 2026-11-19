import { useState, useEffect } from "react"
import { getSheetData } from "../services/sheetServices"


const StrukturOrganisasiPage = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        async function LoadData() {
            try {
                const result = await getSheetData('StrukturOrganisasi')
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
        <div className={`bg-white text-stone-800 dark:text-white dark:bg-stone-800 px-10 sm:px-20 flex flex-col gap-4 py-18`}>
            <div className="">
                <span className="font-bold text-4xl">Struktur Organisasi</span>
                <br />
                <span>Struktur organisasi yang menjelaskan peran, tanggung jawab, dan garis koordinasi seluruh pihak yang terlibat dalam pengelolaan dan pemanfaatan laboratorium IPA.</span>
            </div>
            <div className="my-5 flex justify-center">
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
    )
}

export default StrukturOrganisasiPage