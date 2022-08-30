export interface IEtapItem {
    id: number,
    etapId: number,
    name: string,
    ei_id: number,
    ei_name: string,
    ei_value: string,
    ei_price: string,
    ei_name_disable: boolean,
    ei_value_disable: boolean,
    nds: number,
    nds_text: string,
    nds_statia: string,
    summ: string,
    summ_nds: string,
    sub: {
        isSub: boolean,
        name: string,
    }
}
export interface IEtap {
    id: number,
    name: string,
    //etapItems: IEtapItem[]
    etapSumm: string,
    etapSumm_nds: string,
    noNds: true,
    noNdsStatia: "15",
}
export interface ISamp {
    kp_sample_guid: string,
    // link: string,
    // konkurs_id: string,
    // konkurs_name: string,
    // lot_id: string,
    // lot_name: string,
    // waers: string,
    // kp_accep_date: string,
    // kp_send_date: string

    // ==============
    lot_id: number,
    lot_name: string,
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
    isLoading: boolean,
    error: string
}