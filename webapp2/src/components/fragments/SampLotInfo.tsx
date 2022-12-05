import React, { FC } from "react";
import { Layout } from '@consta/uikit/Layout';
import { Text } from "@consta/uikit/Text";
import { Button } from "@consta/uikit/Button";
import { IconExit } from '@consta/uikit/IconExit';
import { IconCalendar } from '@consta/uikit/IconCalendar';
import { IconDownload } from "@consta/uikit/IconDownload";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { format } from "date-fns";
import { authSlice } from "../../store/reducers/authRTK/authSlice";
import { useNavigate } from "react-router-dom";
import { useFetchFileIDQuery, useFetchFileTZQuery } from "../../services/SampService";


const SampLotInfo: FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const { lot_name, links, waers, kp_accep_date, kp_send_date, kp_sample_guid } = useAppSelector(state => state.sampReducer)
    
    const { data: fileGuid } = useFetchFileIDQuery(kp_sample_guid)

    //const { getFile,  isLoading } = useFetchFileTZQuery()

    const getTz = () => {
        //const File = getFile(file_guid)
    }

    const logout = () => {
        dispatch(authSlice.actions.logout())
        navigate('/logout');
    }

    return (
        <>
            <Layout className="aic TopBarKPinfo">
                <Layout flex={2} direction="column" className="mr1">
                    <Text as="div" className="label">
                        Предмет закупки
                    </Text>
                    <Text as="div" className="labeltext">
                        {lot_name}
                    </Text>
                </Layout>
                <Layout flex={3}>
                    <Layout flex={4} direction="column" className="mr1">
                        <Text as="div" className="label">
                            Участник анализа рынка
                        </Text>
                        <Text as="div" className="labeltext">
                            {links.info_ka_name}
                        </Text>
                    </Layout>
                    <Layout flex={1} direction="column" className="valBlock mr1">
                        <Text as="div" className="label">
                            Валюта
                        </Text>
                        <Text as="div" className="labeltext">
                            {waers}
                        </Text>
                    </Layout>
                    <Layout flex={1} direction="column" className="mr2">
                        <Text as="div" className="label">
                            Дата запроса КП
                        </Text>
                        <Layout flex={1} className="aic">
                            <IconCalendar size="s" view="ghost" className="mr05" />
                            <Text as="div" className="labeltext">
                                {kp_send_date && format(new Date(kp_send_date), 'dd.MM.yyyy')}
                            </Text>
                        </Layout>
                    </Layout>
                    <Layout flex={1} direction="column" className="mr2">
                        <Text as="div" className="label">
                            Срок приема КП
                        </Text>
                        <Layout flex={1} className="aic">
                            <IconCalendar size="s" view="ghost" className="mr05" />
                            <Text as="div" className="labeltext">
                                {kp_accep_date && format(new Date(kp_accep_date), 'dd.MM.yyyy')}
                            </Text>
                        </Layout>
                    </Layout>
                    <Layout flex={1} direction="row">

                        <Button
                            size="m"
                            label="Скачать ТЗ"
                            view="secondary"
                            onClick={getTz}
                            iconLeft={IconDownload} />

                        <Button
                            size="m"
                            view="clear"
                            onlyIcon={true}
                            iconLeft={IconExit}
                            onClick={logout}
                            className="ml1 logoutButton" />
                    </Layout>
                </Layout>
            </Layout>
        </>
    );
};

export default SampLotInfo;