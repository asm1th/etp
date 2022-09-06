import '../../App.css';
import './rnmc.css';
import { FC } from "react";
import { useLocation } from "react-router-dom";
import TopBar from "../../components/fragments/TopBar";
import BarKP from "../../components/fragments/BarKP";
import { useFetchSampQuery } from "../../services/SampService";
import Etaps from "../../components/fragments/Etaps";
import EtapsItog from "../../components/fragments/EtapsItog";
import EtapFooterButtons from "../../components/fragments/EtapFooterButtons";
import { ProgressSpin } from '@consta/uikit/ProgressSpin';
import { Responses503 } from '@consta/uikit/Responses503';

const RNMCapp: FC = () => {

    //test
    const params = useLocation().search;
    const kp_sample_guid = new URLSearchParams(params).get("guid") || '0050569CDC861EED87DD0FCCDBEA808C'
    const {data: samp, error, isLoading, isSuccess } = useFetchSampQuery(kp_sample_guid);
    //.test

    return (
        <>
            <div className='isErrorIsLoading'>
            {error && <Responses503 />}
            {isLoading && <ProgressSpin size="2xl" />}
            </div>
            {isSuccess && (
                <>
                    <TopBar />
                    <BarKP />
                    <Etaps />
                    <EtapsItog />
                    <EtapFooterButtons />
                    <pre>{JSON.stringify(samp, null, 2)}</pre>
                </>
            )}
        </>
    );
};

export default RNMCapp;