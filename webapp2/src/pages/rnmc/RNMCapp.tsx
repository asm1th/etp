import '../../App.css';
import './rnmc.css';
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
    //test
    const params = useLocation().search;
    const kp_sample_guid = new URLSearchParams(params).get("kp_sample_guid") || ''
    dispatch(authSlice.actions.setKp_sample_guid(kp_sample_guid))

    const { data: samp, error, isLoading, isSuccess } = useFetchSampQuery(kp_sample_guid);
    //.test

    return (
        <>
            <div className='isErrorIsLoading jcc'>
                {error && <Responses503 />}
                {isLoading && <ProgressSpin size="2xl" />}
            </div>
            {isSuccess && samp && samp.stags && (samp.stags.length > 0) ? (
                <>
                    <SampLotInfo />
                    <SampKpInfo />
                    <Etaps />
                    <SampItog />
                    <SampFooterButtons />
                    {/* <pre>{JSON.stringify(samp, null, 2)}</pre> */}
                </>
            ) : (
                <>
                    <ResponsesNothingFound actions={<Text />}/>
                    <GuidEnter/>
                </>
            )}
        </>
    );
};

export default RNMCapp;