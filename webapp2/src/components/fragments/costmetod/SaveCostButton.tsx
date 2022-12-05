import { useState } from "react";
import { Layout } from '@consta/uikit/Layout';
import { Text } from "@consta/uikit/Text";
import { useAppSelector } from "../../../hooks/redux";
import { IconCheck } from '@consta/uikit/IconCheck';
import { Button } from "@consta/uikit/Button";
import { format } from "date-fns";
import { useUpdateCostMutation, useUpdateLinkMutation, useUpdateUsrpMutation } from "../../../services/SampService";


const SaveCostButton = () => {
    const { stags, costs, link, links } = useAppSelector(state => state.sampReducer)
    const [updateCost, { isLoading: isUpdatingCost }] = useUpdateCostMutation()
    const [updateLink, { isLoading: isUpdatingLink }] = useUpdateLinkMutation()
    const [updateUsrp, { isLoading: isUpdatingUsrp }] = useUpdateUsrpMutation()

    const [savedDate, setSavedDate] = useState<string>("")

    const onSave = () => {
        updateCost(costs)
        updateLink(links)
        stags.forEach(stag => {
            stag.units.forEach(unit => {
                const usrp = unit.usrps.filter(usrp => usrp.link_id === link);
                updateUsrp(usrp[0])
            });
        })
        setSavedDate(format(new Date(), 'dd.MM.yyyy HH:mm:ss'))
    }

    return (
        <Layout flex={4} className="aic jcfe mt1">
            {savedDate ? (
                <Text className="mr1 ml1 label tar">Сохранено {savedDate}</Text>
            ) : null}
            <Button label="Сохранить изменения" onClick={onSave} size="m" iconLeft={IconCheck} loading={isUpdatingCost || isUpdatingLink || isUpdatingUsrp} />
        </Layout>
    );
};

export default SaveCostButton;