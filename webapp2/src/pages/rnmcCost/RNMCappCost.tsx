import '../../App.css';
import '../rnmc/RNMCapp.css';
import {useState, FC } from "react";
import { useLocation } from "react-router-dom";
import SampLotInfo from "../../components/fragments/SampLotInfo";
import { useFetchSampQuery } from "../../services/SampService";
import EtapsCost from "../../components/fragments/costmetod/EtapsCost";
import SampItog from "../../components/fragments/SampItog";
import SampFooterButtons from "../../components/fragments/costmetod/costdescription/SampFooterButtons";
import { ProgressSpin } from '@consta/uikit/ProgressSpin';
import { Responses503 } from '@consta/uikit/Responses503';
import { ResponsesNothingFound } from '@consta/uikit/ResponsesNothingFound';
import GuidEnter from '../rnmc/GuidEnter';
import { useAppDispatch } from "../../hooks/redux";
import { authSlice } from '../../store/reducers/authRTK/authSlice';
import { Layout } from '@consta/uikit/LayoutCanary';
import SampItogCost from '../../components/fragments/costmetod/SampItogCost';
import DescriptionCostMetod from '../../components/fragments/costmetod/costdescription/DescriptionCostMetod';
import { Tabs } from '@consta/uikit/Tabs';
import SampKpInfoCost from '../../components/fragments/costmetod/SampKpInfoCost';


type Item = string;
const items: Item[] = ['Форма КП', 'Расшифровка ставок'];

const RNMCapp: FC = () => {
    const dispatch = useAppDispatch()

    const params = useLocation().search;
    const link_id = new URLSearchParams(params).get("samp") || ''
    
    dispatch(authSlice.actions.setLink_id(link_id))
    const { data: samp, error, isLoading, isSuccess } = useFetchSampQuery(link_id);

    const [tab, setTab] = useState<string  | null>(items[0]);

    return (
        <div className='RNMCapp'>
            <div className='isErrorIsLoading jcc'>
                {/* {error  && <Responses503 />} */}
                {(isLoading && isSuccess) && <ProgressSpin size="2xl" />}
            </div>
            { isSuccess && samp && samp.stags && (samp.stags.length > 0) ? (
                <>
                    <SampLotInfo />
                    <SampKpInfoCost isTravelShow={false}/>
                    <Layout className="TabsPage" direction="column">
                        <Tabs
                            value={tab}
                            onChange={({ value }) => setTab(value)}
                            items={items}
                            getLabel={(item) => item}
                            className="mb2"
                        />
                        { tab === 'Форма КП' ? (
                            <EtapsCost isTravelShow={false}/>
                        ) : (
                            <DescriptionCostMetod/>
                        )}
                    </Layout>
                    <SampItogCost />
                    <SampFooterButtons />
                    {/* <pre>{JSON.stringify(samp, null, 2)}</pre> */}
                </>
            ) : (
                !isLoading &&
                <>
                    <ResponsesNothingFound actions={<></>} />
                    {/* <GuidEnter/> */}
                </>
            )}
        </div>
    );
};

export default RNMCapp;