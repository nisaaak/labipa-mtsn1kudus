import { useState, useEffect } from "react"
import { getSheetData } from "../services/sheetServices"

const LkpdPage = () => {
    const [theme, setTheme] = useState("light")
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        async function LoadData() {
            try {
                const result = await getSheetData('LKPD')
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

    const items = [
        {
            name: 'Kromatografi',
            image: 'https://lh3.googleusercontent.com/d/1nHzLqgx0vqnt27ukRfx9qEkw3E1tN5sH',
            link: 'https://docs.google.com/document/d/1q31IVZym2oM2GI93PKXeaDrPamxYpuDc/edit?usp=drive_link&ouid=104736341450467433139&rtpof=true&sd=true',
            topik: 'Pemisahan campuran',
            bidang: 'Fisika'
        },
        {
            name: 'Dekantasi',
            image: 'https://lh3.googleusercontent.com/d/1WrCYxQSdCUofPR4RfzmU7RROm61a8p9n',
            link: 'https://docs.google.com/document/d/1QuLv4reOT_HZE8yZNap-n-K2muSFSPOV/edit?usp=drive_link&ouid=104736341450467433139&rtpof=true&sd=true',
            topik: 'Pemisahan campuran',
            bidang: 'Fisika',
        },
        {
            name: 'Filtrasi',
            image: 'https://lh3.googleusercontent.com/d/1C9KLdbP5YwxI2MUq_lwhTELQZdswtNpF',
            link: 'https://docs.google.com/document/d/1qRvKI__kltgylF0OgJVgWRbj9YtpfMxm/edit?usp=drive_link&ouid=104736341450467433139&rtpof=true&sd=true',
            topik: 'Pemisahan campuran',
            bidang: 'Fisika',
        },
        {
            name: 'Magnetis',
            image: 'https://lh3.googleusercontent.com/d/1XBe3nciexFU_m2u_2VtF1Fu4Wo57Aa-D',
            link: 'https://docs.google.com/document/d/1nCOzmNSxAlFK8fbpkHyeqLJGiOePobqS/edit?usp=drive_link&ouid=104736341450467433139&rtpof=true&sd=true',
            topik: 'Pemisahan campuran',
            bidang: 'Fisika',
        },
        {
            name: 'Uji zat makanan',
            image: 'https://lh3.googleusercontent.com/d/1cny06QCT5_gogtxjZhLXeODc-eMb6OmJ',
            link: 'https://docs.google.com/document/d/1Xd1D1nNWup0sWxqkCooGxrJh_G1IlUcC/edit?usp=drive_link&ouid=104736341450467433139&rtpof=true&sd=true',
            topik: 'Sistem Pencernaan',
            bidang: 'Biologi',
        },
        {
            name: 'Uji asam basa',
            image: 'https://lh3.googleusercontent.com/d/1LmWxJ9rebbJz4XYFoV-KZNnRwevvrMzT',
            link: 'https://docs.google.com/document/d/1bauvrNxpe7cfEWW96T6gwwf5oubNk7TY/edit?usp=drive_link&ouid=104736341450467433139&rtpof=true&sd=true',
            topik: 'Zat Asam Basa',
            bidang: 'Kimia',
        },
        {
            name: 'Uji kualitas air',
            image: 'https://lh3.googleusercontent.com/d/17gULiDVSKlu71wLJhLDkoSb713Qu0tI4',
            link: 'https://docs.google.com/document/d/17wbRpeyN5vZxUFkYd5eCquEmi5lO1Fs2/edit?usp=drive_link&ouid=104736341450467433139&rtpof=true&sd=true',
            topik: 'Riset lingkungan',
            bidang: 'Fisika',
        },
        {
            name: 'Sabun minyak jelantah',
            image: 'https://lh3.googleusercontent.com/d/1zhv4IoOKqh5vCM9Roy48hzfnpJFjEs4i',
            link: 'https://docs.google.com/document/d/1ZQSgobBjaRqnemtNkuWaKDEuUJj-s9Ic/edit?usp=drive_link&ouid=104736341450467433139&rtpof=true&sd=true',
            topik: 'Riset limbah',
            bidang: 'Kimia',
        },
    ]
    return (
        <div className={`${theme} bg-slate-50 text-midnight-violet-800 dark:text-ivory-50 px-10`}>
            <div className="pt-20 pb-7">
                <span className="font-bold text-4xl text-dusty-grape-600">LKPD</span>
                <br />
                <span className="text-xl">(Lembar Kerja Peserta Didik)</span>
                <br />
                <span>bahan ajar yang berisi panduan, langkah-langkah percobaan, serta tugas terstruktur bagi siswa untuk melakukan kegiatan eksperimen, penyelidikan, atau pengamatan di laboratorium maupun lapangan.</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 my-5">
                {data.map(item => (
                    <a href={item.link}>
                        <div className="flex flex-col shadow rounded-md bg-sandy-brown-300 hover:scale-105 p-1">
                            <img
                                src={item.image}
                                className="w-xs h-full rounded-t-md"
                                alt="lkpd" />
                            <div className="flex items-center flex-col p-2 gap-1">
                                <span className="font-semibold text-xl">{item.nama}</span>
                                <span className="text-sm">{item.topik}</span>
                                <span className={`rounded p-1 font-semibold text-xs text-white ${item.bidang == 'Biologi' ? 'bg-celadon-400' : item.bidang == 'Kimia' ? 'bg-sandy-brown-400' : 'bg-dusty-grape-400'}`}>{item.bidang}</span>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    )
}

export default LkpdPage