import { FC, useEffect, useState } from "react";
import { Text } from "@consta/uikit/Text";
import { useAppSelector } from "../../../../hooks/redux";
import { Layout } from "@consta/uikit/Layout";
import { Switch } from "@consta/uikit/Switch";
import { Tabs, cnTabsTab } from "@consta/uikit/Tabs";
import TabSalary from "./TabSalary";
import TabIsurance from "./TabIsurance";
import TabDepreciation from "./TabDepreciation";
import TabCostOtherBfoh from "./TabCostOtherBfoh";
import TabCostOverhead from "./TabCostOverhead";
import TabProfitability from "./TabProfitability";
import TabBtrip from "./TabBtrip";
import TabCostOther from "./TabCostOther";
import TabSummary from "./TabSummary";


const DescriptionCostMetod: FC = () => {

    const [isCostDepreciation, setIsCostDepreciation] = useState<boolean>(true);
    const [isCostOtherBfoh, setIsCostOtherBfoh] = useState<boolean>(true);
    const [isCostBtrip, setIsCostBtrip] = useState<boolean>(true);
    const [isCostOther, setIsCostOther] = useState<boolean>(true);

    type tabItem = {
        id: number
        label: string
        isHidable: boolean
        isValid: boolean
    };
    const tabItems: tabItem[] = [{
        id: 0,
        label: 'Заработная плата',
        isHidable: false,
        isValid: true
    }, {
        id: 1,
        label: 'Страховые взносы',
        isHidable: false,
        isValid: true
    }, {
        id: 2,
        label: 'Амортизация',
        isHidable: true,
        isValid: true
    }, {
        id: 3,
        label: 'Прочие до НР',
        isHidable: true,
        isValid: true
    }, {
        id: 4,
        label: 'Накладные расходы',
        isHidable: false,
        isValid: true
    }, {
        id: 5,
        label: 'Рентабельность',
        isHidable: false,
        isValid: true
    }, {
        id: 6,
        label: 'Командировочные расходы',
        isHidable: true,
        isValid: true
    }, {
        id: 7,
        label: 'Иные затраты',
        isHidable: true,
        isValid: true
    }, {
        id: 8,
        label: 'Итого',
        isHidable: false,
        isValid: true
    }];

    const [tabList, setTabList] = useState<tabItem[]>(tabItems);
    const [tab, setTab] = useState<tabItem>(tabList[0]);

    const tabListChange = (tabId: number, isAdd: boolean) => {
        if (isAdd) {
            const tabItem = tabItems[tabItems.findIndex((List: any) => List.id === tabId)]
            tabList.push(tabItem)
        } else {
            const index = tabList.findIndex((List: any) => List.id === tabId)
            tabList.splice(index, 1)
        }
        tabList.sort((a, b) => a.id - b.id);
        setTabList(tabList)
    }

    // useEffect(() => {
    //     tabListChange(2, isCostDepreciation)
    // }, [isCostDepreciation])
    // useEffect(() => {
    //     tabListChange(3, isCostOtherBfoh)
    // }, [ isCostOtherBfoh])
    // useEffect(() => {
    //     tabListChange(6, isCostBtrip)
    // }, [isCostBtrip])
    // useEffect(() => {
    //     tabListChange(7, isCostOther)
    // }, [isCostOther])

    const onTabTimes = (id: number) => {
        tabListChange(id, false)
        if (id === 2) { setIsCostDepreciation(false) }
        if (id === 3) { setIsCostOtherBfoh(false) }
        if (id === 6) { setIsCostBtrip(false) }
        if (id === 7) { setIsCostOther(false) }
    }

    return (
        <>
            <Layout className="mb1">
                <Layout flex={1} className="aic">
                    <Text as="div" size="xl" className="weight700">
                        Расшифровка ставок специалистов
                    </Text>
                </Layout>
                <Layout className="aic mr2">
                    <Switch
                        label="Амортизация"
                        checked={isCostDepreciation}
                        onChange={() => { setIsCostDepreciation(!isCostDepreciation); tabListChange(2, !isCostDepreciation) }}
                        size="m" />
                </Layout>
                <Layout className="aic mr2">
                    <Switch
                        label="Прочие до НР"
                        checked={isCostOtherBfoh}
                        onChange={() => { setIsCostOtherBfoh(!isCostOtherBfoh); tabListChange(3, !isCostOtherBfoh) }}
                        size="m" />
                </Layout>
                <Layout className="aic mr2">
                    <Switch
                        label="Командировочные расходы"
                        checked={isCostBtrip}
                        onChange={() => { setIsCostBtrip(!isCostBtrip); tabListChange(6, !isCostBtrip) }}
                        size="m" />
                </Layout>
                <Layout className="aic mr2">
                    <Switch
                        label="Иные затраты"
                        checked={isCostOther}
                        onChange={() => { setIsCostOther(!isCostOther); tabListChange(7, !isCostOther) }}
                        size="m" />
                </Layout>

            </Layout>
            <Tabs
                value={tab}
                onChange={({ value }) => setTab(value)}
                items={tabList}
                getItemLabel={(item:any) => item.label}
                className="mb2 tabsFilled"
                renderItem={({ label, checked, onChange, item }) => (
                    <>
                        <button
                            type="button"
                            onClick={onChange}
                            className={`${cnTabsTab({ checked })} tabFilled ${item.isValid ? 'Valid' : 'unValid'} ${item.isHidable ? 'isHidable' : ''} ${checked ? 'checked' : ''}`}>
                            <span role="img" aria-label="img" className="tabNum">
                                {item.label}
                            </span>
                        </button>
                        {item.isHidable ? (
                            <button type="button" className="times" onClick={() => onTabTimes(item.id)} >
                                x
                            </button>
                        ) : null}
                    </>
                )}
            />

            {tab.id === 0 ? (
                <TabSalary />
            ) : null}

            {tab.id === 1 ? (
                <TabIsurance />
            ) : null}

            {tab.id === 2 ? (
                <TabDepreciation />
            ) : null}

            {tab.id === 3 ? (
                <TabCostOtherBfoh />
            ) : null}

            {tab.id === 4 ? (
                <TabCostOverhead />
            ) : null}

            {tab.id === 5 ? (
                <TabProfitability />
            ) : null}

            {tab.id === 6 ? (
                <TabBtrip />
            ) : null}

            {tab.id === 7 ? (
                <TabCostOther />
            ) : null}

            {tab.id === 8 ? (
                <TabSummary />
            ) : null}

        </>
    );
};

export default DescriptionCostMetod;