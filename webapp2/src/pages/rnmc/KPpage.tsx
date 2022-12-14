import '../../App.css';
import './RNMCapp.css';
import { FC } from "react";
import { useLocation } from "react-router-dom";
import SampLotInfo from "../../components/fragments/SampLotInfo";
import SampKpInfo from "../../components/fragments/SampKpInfo";
import { useFetchSampQuery } from "../../services/SampService";
import KPBlock from "../../components/fragments/KP/KPBlock";
import { ProgressSpin } from '@consta/uikit/ProgressSpin';
import { Responses503 } from '@consta/uikit/Responses503';
import { useAppSelector } from "../../hooks/redux";



const KPpage: FC = () => {

    //test
    const {link_id} = useAppSelector(state => state.authReducer)
    const params = useLocation().search;
    const this_samp_id = new URLSearchParams(params).get("samp") || link_id || ''

    const { data: samp, error, isLoading, isSuccess } = useFetchSampQuery(this_samp_id);
    //.test

    return (
        <main className='pt2 pl2 pr2'>
            <div className='isErrorIsLoading'>
                {error && <Responses503 />}
                {isLoading && <ProgressSpin size="2xl" />}
            </div>
            {isSuccess && (
                <>
                    <SampLotInfo />
                    <SampKpInfo isTravelShow={true}/>
                    <KPBlock />
                </>
            )}
        </main>
    );
};

export default KPpage;