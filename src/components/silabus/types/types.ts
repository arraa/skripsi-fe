export interface silabusDomain {
    id: number
    domain: string
    capaianPembelajaran: string
}

export interface silabusKontenTujuan {
    id: number
    materi: string
    tujuanPembelajaran: string
    JP: number
}

export interface silabusDetail {
    id: number
    pertemuan: number
    tujuanPembelajaran: string
    kegiatanPembelajaran: string
}
