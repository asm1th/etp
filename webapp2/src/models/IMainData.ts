export interface IEtapItem {
    id: number,
    etapId: number,
    name: string,
    ei_id: number,
    ei_name: string,
    ei_value: string,
    ei_price: string,
    nds: number,
    nds_text: string,
    summ: string,
    summ_nds: string,
    sub: {
        isSub: boolean,
        name: string,
        statia: string,
    }
}

export interface IEtap {
    id: number,
    //etapItems: IEtapItem[]
    etapSumm: string,
    etapSumm_nds: string,
}

export interface IMainData {
    lot: string,
    participant_name: string,
    valuta: string,
    dateStartKP: number | Date,
    dateEndKP: number | Date,

    trip: {
        isTrip: boolean,
        tripPrice: string,
        tripComment: string,
    },
    dateContract: number | Date,
    dateKP: Date | null,
    valutaKP: number | null,

    etapItems: IEtapItem[],
    etapsSumms: IEtap[],

    summKP: string,
    summKP_nds: string,
    noNds: boolean,
    noNdsStatia: string,

    isLoading: boolean,
    error: string
}