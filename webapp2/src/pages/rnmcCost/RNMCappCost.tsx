import '../../App.css';
import '../rnmcCost/RNMCappCost.css';
import { useState, FC } from "react";
import SampLotInfo from "../../components/fragments/SampLotInfo";
import EtapsCost from "../../components/fragments/costmetod/EtapsCost";
import SampFooterButtons from "../../components/fragments/costmetod/costdescription/SampFooterButtons";
import { Layout } from '@consta/uikit/Layout';
import SampItogCost from '../../components/fragments/costmetod/SampItogCost';
import DescriptionCostMetod from '../../components/fragments/costmetod/costdescription/DescriptionCostMetod';
import { Tabs } from '@consta/uikit/Tabs';
import SampKpInfoCost from '../../components/fragments/costmetod/SampKpInfoCost';


type Item = string;
const items: Item[] = ['Форма КП', 'Расшифровка ставок'];

const RNMCappCost: FC = () => {
    const [tab, setTab] = useState<string | null>(items[0]);

    return (
        <div className='RNMCapp'>
            <SampLotInfo />
            <SampKpInfoCost isTravelShow={false} />
            <Layout className="TabsPage" direction="column">
                <Tabs
                    value={tab}
                    onChange={({ value }) => setTab(value)}
                    items={items}
                    getItemLabel={(item) => item}
                    className="mb2"
                />
                {tab === 'Форма КП' ? (
                    <EtapsCost isTravelShow={false} />
                ) : (
                    <DescriptionCostMetod />
                )}
            </Layout>
            <SampItogCost />
            <SampFooterButtons />
        </div>
    );
};

export default RNMCappCost;