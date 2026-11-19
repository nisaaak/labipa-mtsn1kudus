import { useState, useEffect } from "react"
import { getSheetData } from "../services/sheetServices"

const LabVirtualPage = () => {
    const [theme, setTheme] = useState("light")
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        async function LoadData() {
            try {
                const result = await getSheetData('LabVirtual')
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
        <div className={`${theme} bg-slate-50 text-midnight-violet-800 dark:text-ivory-50 px-10`}>
            <div className="pt-20 pb-7">
                <span className="font-bold text-4xl text-dusty-grape-600">Laboratorium Virtual</span>
                <br />
                <span>Eksplorasi sains melalui simulasi interaktif</span>
                <br />
                <span>Temukan simulasi untuk membantu memahami konsep IPA dan melakukan eksperimen secara virtual.</span>
            </div>
            {/* <div>{JSON.stringify(data)}</div> */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-5">
                {data.map(item => (
                    <a href={item.link}>
                        <div className="flex flex-col shadow rounded-md bg-dusty-grape-200 hover:scale-105 p-1">
                            <img
                                src={item.image}
                                className="w-2xs h-full rounded-t-md"
                                alt="lkpd" />
                            <div className="flex flex-col p-2">
                                <span className="font-semibold text-xl mb-2 text-center">{item.nama}</span>
                                <div className="flex gap-2">
                                    {item.bidang.split(',').map(i => (
                                        <div className={`rounded p-1 font-semibold text-xs text-white ${i == 'Biologi' ? 'bg-celadon-400' : i == 'Kimia' ? 'bg-sandy-brown-400' : 'bg-dusty-grape-400'}`}>
                                            {i}
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    )
}

export default LabVirtualPage