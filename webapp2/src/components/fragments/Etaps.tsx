import React, { FC, useState } from "react";
import { Tabs, cnTabsTab } from '@consta/uikit/Tabs';
import { Layout } from "@consta/uikit/LayoutCanary";
import { Text } from "@consta/uikit/Text";
import EtapRow from "./EtapRow";
import EtapFooter from "./EtapFooter";
import KomandBar from "./KomandBar";
import { IconInfo } from '@consta/uikit/IconInfo';
import { useAppSelector } from "../../hooks/redux";
import { IStag } from "../../models/ISamp"
import { useFetchSampQuery } from "../../services/SampService";
import PopoverCustom from "../util/PopoverCustom";



const Etaps = (props: { isTravelShow: boolean }) => {
    
    const { link_id } = useAppSelector(state => state.authReducer)
    //const params = useLocation().search;
    //const this_samp_id = new URLSearchParams(params).get("samp") || kp_sample_guid || ''
    const { data: samp } = useFetchSampQuery(link_id);

    const [tab, setTab] = useState<IStag>({
        "kp_stage_guid": "",
        "kp_sample_guid": "",
        "opr_usl_stage_id": "",
        "opr_usl_stage": "",
        "opr_usl_stage_num": 1,
        isNoNds: false,
        stagSumm: "",
        stagSumm_nds: "",
        nds_comm: "",
        isValid: true,
        "units": [],

        //cost
        "stage_laboriousness": "",
        "stage_price_ei":  "",
        "stage_price":  "",
        "stage_price_nds": "",
    });

    //popover
    type Position = any;
    const [position, setPosition] = useState<Position>(undefined);
    const popoverText = "Введение альтернативного наименования\n расценки заполняется (при необходимости)\n при нажатии на иконку “Редактирование”.\n Указывается другое наименование расценки\n (отличное от исходной), но сопоставимое\n по функционалу."
    const handleMouseMove = (event: React.MouseEvent) => {
        setPosition({ x: event.clientX, y: event.clientY });
    };
    //

    return (
        <>
            {samp ? (
                <>
                    <PopoverCustom position={position} text={popoverText} />
                    
                    { props.isTravelShow ? (
                        <KomandBar />
                    ) : null }
                    <Layout>
                        <Tabs
                            className="Tabs"
                            linePosition="right"
                            value={tab}
                            onChange={({ value }) => setTab(value)}
                            items={samp.stags}
                            getLabel={(item) => "этап "+item.opr_usl_stage_num}
                            renderItem={({ label, checked, onChange, item}) => (
                                <button type="button" onClick={onChange} 
                                    className={`${cnTabsTab({ checked })} ${item.isValid ? 'Valid': 'unValid'}`}>
                                    <span role="img" aria-label="img" className="tabNum">
                                    {/* {checked ? '🤘' : '✋'} */}
                                    {item.opr_usl_stage_num}
                                    </span>
                                    <span className="tabLabel">{label.split(' ')[0]}</span>
                                </button>
                                )}
                        />
                        <Layout flex={1} className="TabsPageContainer" direction="column">
                            <Layout flex={1} direction="row" className="mb1 aib mt05">
                                <Text as="div" className="subTitleOpr_usl_stageLabel mr2">
                                    Полное наименование этапа / услуги (работы):
                                </Text>
                                <Text as="div" className="labeltext subTitleOpr_usl_stage">
                                    {samp.stags[tab.opr_usl_stage_num - 1].opr_usl_stage}
                                </Text>
                            </Layout>
                            <Layout>
                                <Text as="div" className="Title Title2 mb1 weight700">
                                    Состав этапа / услуги (работы)
                                </Text>
                            </Layout>
                            <Layout className="tableHeader">
                                <Layout flex={2} className="tar">
                                    <Text className="label">
                                        Наименование расценки
                                    </Text>
                                    <div onMouseMove={handleMouseMove} onMouseLeave={() => setPosition(undefined)}>
                                        <IconInfo size="s" view="ghost" />
                                    </div>
                                </Layout>
                                <Layout flex={2}>
                                    <Text className="label" align="center">Единица измерения (ЕИ)</Text>
                                </Layout>
                                <Layout flex={1}>
                                    <Text className="label" align="center">Количество ЕИ</Text>
                                </Layout>
                                <Layout flex={1}>
                                    <Text className="label" align="center">Стоимость ЕИ </Text><span className="FieldLabel-Star">*</span>
                                </Layout>
                                <Layout flex={1}>
                                    <Text className="label" align="center">Ставка НДС</Text>
                                </Layout>
                                <Layout flex={1} className="mr1">
                                    <Text className="label" align="center">Сумма без НДС</Text>
                                </Layout>
                                <Layout flex={1}>
                                    <Text className="label" align="center">Сумма с НДС</Text>
                                </Layout>
                            </Layout>
                            <EtapRow etapId={tab.opr_usl_stage_num} />
                            <EtapFooter etapId={tab.opr_usl_stage_num} />
                        </Layout>
                    </Layout>
                </>
            ) : null}
        </>
    );
};

export default Etaps;
