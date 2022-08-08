export interface IOffer {
    id: number,
    participant: string,
    name: string,
    subject: string,
    end_date_contract: Date,
    end_date_offer: Date,
    valuta: string,
    date_request: Date,
    date_apply: Date,
    travel_expenses: boolean,
    price_plus_vat: number,
    price_no_vat: number,
    no_vat: boolean,
    date_saved: Date,
}

export interface IRow {
    id: number,
    stage: number,
    name: string,
    unit_of_measure: string,
    amount: number,
    price_for_unit: number,
    vat_rate: number,
    price_plus_vat: number,
    price_no_vat: number
}