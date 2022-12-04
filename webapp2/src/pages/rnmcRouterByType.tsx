
import { FC } from "react";
import { useAppDispatch } from "../hooks/redux";
import { useFetchSampQuery } from "../services/SampService";
import { useLocation } from "react-router-dom";
import { ResponsesNothingFound } from "@consta/uikit/ResponsesNothingFound";
import { authSlice } from "../store/reducers/authRTK/authSlice";
import { ProgressSpin } from "@consta/uikit/ProgressSpin";
import RNMCapp from "../pages/rnmc/RNMCapp";
import RNMCappCost from "../pages/rnmcCost/RNMCappCost";

const RnmcRouterByType: FC = () => {
    const dispatch = useAppDispatch()
    const params = useLocation().search;
    const link_id = new URLSearchParams(params).get("samp") || ''
    dispatch(authSlice.actions.setLink_id(link_id))
    const { data: samp, isLoading, isSuccess } = useFetchSampQuery(link_id);


    return (
        <div className='RNMCapp'>
            <div className='isErrorIsLoading jcc'>
                {(isLoading && isSuccess) && <ProgressSpin size="2xl" />}
            </div>
            {isSuccess && samp && samp.stags && (samp.stags.length > 0) ? (
                samp.sample_type === "C" ? (
                    <RNMCappCost/>
                ) : (
                    <RNMCapp/>
                )
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

export default RnmcRouterByType;