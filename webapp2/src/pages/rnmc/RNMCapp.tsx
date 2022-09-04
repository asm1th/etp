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


const RNMCapp: FC = () => {
    const params = useLocation().search;
    const kp_sample_guid = new URLSearchParams(params).get("guid") || '0050569CDC861EED87DD0FCCDBEA808C'
    const {data: samp, error, isLoading, isSuccess } = useFetchSampQuery(kp_sample_guid);

    // samp && samp.stags.forEach(stag => {
    //     stag.units.forEach(unit => {
    //         unit.usrps.forEach(usrp => {
    //             usrp.
    //             usrp.isSubToggle = "",
    //             usrp.summ = "",
    //             usrp.summ_nds = ""
    //         }); 
    //     });
    // });

    return (
        <>
            <div className='isErrorIsLoading'>
            {error && <p>An error occured</p>}
            {isLoading && <p>Loading...</p>}
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