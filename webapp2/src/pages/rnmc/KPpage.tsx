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
    const params = useLocation().search;
    const {kp_sample_guid} = useAppSelector(state => state.authReducer)
    const this_kp_sample_guid = new URLSearchParams(params).get("kp_sample_guid") || kp_sample_guid || ''
    const { data: samp, error, isLoading, isSuccess } = useFetchSampQuery(this_kp_sample_guid);
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
                    <SampKpInfo />
                    <KPBlock />
                </>
            )}
        </main>
    );
};

export default KPpage;