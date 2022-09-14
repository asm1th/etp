import React, { FC, useState } from "react";
import { Tabs, cnTabsTab } from '@consta/uikit/Tabs';
import { Layout } from "@consta/uikit/LayoutCanary";
import { Text } from "@consta/uikit/Text";
import EtapRow from "./EtapRow";
import EtapFooter from "./EtapFooter";
import KomandBar from "./KomandBar";
import { IconInfo } from '@consta/uikit/IconInfo';
import { Popover } from '@consta/uikit/Popover';
import { useAppSelector } from "../../hooks/redux";
import { IStag } from "../../models/ISamp"
import { useFetchSampQuery } from "../../services/SampService";
import { useLocation } from "react-router-dom";

const Etaps: FC = () => {
    const params = useLocation().search;
    const {kp_sample_guid} = useAppSelector(state => state.authReducer)
    const this_kp_sample_guid = new URLSearchParams(params).get("kp_sample_guid") || kp_sample_guid || ''
    const { data: samp } = useFetchSampQuery(this_kp_sample_guid);

    const [tab, setTab] = useState<IStag>({
        "kp_stage_guid": "",
        "kp_sample_guid": "",
        "opr_usl_stage_id": "",
        "opr_usl_stage": "",
        "opr_usl_stage_num": 1,
        isNoNds: false,
        stagSumm: "",
        stagSumm_nds: "",
        "units": []
    });

    //popover
    type Position = any;
    const [position, setPosition] = useState<Position>(undefined);

    const handleMouseMove = (event: React.MouseEvent) => {
        setPosition({ x: event.clientX, y: event.clientY });
    };
    //

    return (
        <>
            {samp ? (
                <>
                    <Popover
                        direction="rightCenter"
                        spareDirection="downStartLeft"
                        offset="xl"
                        arrowOffset={0}
                        //onClickOutside={action('onClickOutside')}
                        isInteractive={false}
                        position={position}
                        className="tipPopover">

                        {(direction) => (
                            <div>
                                <Text size="xs">
                                    Введение альтернативного наименования<br /> расценки заполняется (при необходимости)<br />при нажатии на иконку “Редактирование”. <br />Указывается другое наименование расценки<br />(отличное от исходной), но сопоставимое<br /> по функционалу.
                                </Text>
                            </div>
                        )}
                    </Popover>
                    <Layout className="TabsPage" direction="column">
                        <KomandBar />
                        <Layout>
                            <Tabs
                                className="Tabs"
                                linePosition="right"
                                value={tab}
                                onChange={({ value }) => setTab(value)}
                                items={samp.stags}
                                getLabel={(item) => "этап "+item.opr_usl_stage_num}
                                renderItem={({ label, checked, onChange, item}) => (
                                    <button type="button" onClick={onChange} className={cnTabsTab({ checked })}>
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
                                    <Text as="div" className="Title Title2 mb1">
                                        Состав этапа / услуги (работы)
                                    </Text>
                                </Layout>
                                <Layout className="tableHeader">
                                    <Layout flex={3} className="tar">
                                        <Text className="label">
                                            Наименование расценки
                                        </Text>
                                        <div onMouseMove={handleMouseMove} onMouseLeave={() => setPosition(undefined)}>
                                            <IconInfo size="s" view="ghost" />
                                        </div>
                                    </Layout>
                                    <Layout flex={1}>
                                        <Text className="label" align="center">Единица измерения (ЕИ)</Text>
                                    </Layout>
                                    <Layout flex={1}>
                                        <Text className="label" align="center">Количество ЕИ</Text>
                                    </Layout>
                                    <Layout flex={1}>
                                        <Text className="label" align="center">* Стоимость ЕИ</Text>
                                    </Layout>
                                    <Layout flex={1}>
                                        <Text className="label" align="center">Ставка НДС</Text>
                                    </Layout>
                                    <Layout flex={1}>
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
                    </Layout>
                </>
            ) : null}
        </>
    );
};

export default Etaps;
