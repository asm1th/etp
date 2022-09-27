export interface IDashItem {
    id: number
    label: string
    num: number
    status: string
    percent: number
    period: string
    url: string
    chart_type: string
    chart: IDashChartItem[]
}
export interface IDash {
    isToggleSidebar: boolean
    dashItems: IDashItem[]
}

export interface IDashChartItem { 
    parameter: string
    number: number
}