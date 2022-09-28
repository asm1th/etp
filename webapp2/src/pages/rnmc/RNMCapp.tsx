import '../../App.css';
import './RNMCapp.css';
import { FC } from "react";
import { useLocation } from "react-router-dom";
import SampLotInfo from "../../components/fragments/SampLotInfo";
import SampKpInfo from "../../components/fragments/SampKpInfo";
import { useFetchSampQuery } from "../../services/SampService";
import Etaps from "../../components/fragments/Etaps";
import SampItog from "../../components/fragments/SampItog";
import SampFooterButtons from "../../components/fragments/SampFooterButtons";
import { ProgressSpin } from '@consta/uikit/ProgressSpin';
import { Responses503 } from '@consta/uikit/Responses503';
import { ResponsesNothingFound } from '@consta/uikit/ResponsesNothingFound';
import GuidEnter from './GuidEnter';
import { useAppDispatch } from "../../hooks/redux";
import { authSlice } from '../../store/reducers/authRTK/authSlice';
import { Text } from "@consta/uikit/Text";


const RNMCapp: FC = () => {
    const dispatch = useAppDispatch()

    const params = useLocation().search;
    const this_samp_id = new URLSearchParams(params).get("samp") || ''
    dispatch(authSlice.actions.setKp_sample_guid(this_samp_id))
    const { data: samp, error, isLoading, isSuccess } = useFetchSampQuery(this_samp_id);
    
    

    return (
        <div className='RNMCapp'>
            <div className='isErrorIsLoading jcc'>
                {error && <Responses503 />}
                {(isLoading && isSuccess) && <ProgressSpin size="2xl" />}
            </div>
            { isSuccess && samp && samp.stags && (samp.stags.length > 0) ? (
                <>
                    <SampLotInfo />
                    <SampKpInfo />
                    <Etaps />
                    <SampItog />
                    <SampFooterButtons />
                    {/* <pre>{JSON.stringify(samp, null, 2)}</pre> */}
                </>
            ) : (
                !isLoading &&
                <>
                    <ResponsesNothingFound actions={<></>} />
                    <GuidEnter/>
                </>
            )}
        </div>
    );
};

export default RNMCapp;