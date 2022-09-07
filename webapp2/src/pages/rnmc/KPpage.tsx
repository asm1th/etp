import '../../App.css';
import './rnmc.css';
import { FC } from "react";
import { useLocation } from "react-router-dom";
import SampLotInfo from "../../components/fragments/SampLotInfo";
import SampKpInfo from "../../components/fragments/SampKpInfo";
import { useFetchSampQuery } from "../../services/SampService";
import SampItog from "../../components/fragments/SampItog";
import { ProgressSpin } from '@consta/uikit/ProgressSpin';
import { Responses503 } from '@consta/uikit/Responses503';

const KPpage: FC = () => {

    //test
    const params = useLocation().search;
    const kp_sample_guid = new URLSearchParams(params).get("guid") || '0050569CDC861EED87DD0FCCDBEA808C'
    const { data: samp, error, isLoading, isSuccess } = useFetchSampQuery(kp_sample_guid);
    //.test

    return (
        <>
            <div className='isErrorIsLoading'>
                {error && <Responses503 />}
                {isLoading && <ProgressSpin size="2xl" />}
            </div>
            {isSuccess && (
                <>
                    <SampLotInfo />
                    <SampKpInfo />
                    <SampItog />
                </>
            )}
        </>
    );
};

export default KPpage;