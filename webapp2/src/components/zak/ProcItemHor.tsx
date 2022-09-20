import { Text } from '@consta/uikit/Text';
import { Layout } from "@consta/uikit/LayoutCanary";
import { IconTop } from '@consta/uikit/IconTop';
import { IconDown } from '@consta/uikit/IconDown';
import { useAppSelector } from "../../hooks/redux";
import { Column } from '@consta/charts/Column'
import { Link } from 'react-router-dom';
import { IProc } from "../../store/reducers/zak/IZak"
import { Badge } from "@consta/uikit/Badge";

const ProcItemHor = (props: { proc_id: string }) => {

    const { procList } = useAppSelector(state => state.zakReducer)
    const proc = procList[procList.findIndex(proc => proc.id === props.proc_id)]

    return (
        <div className="procItem procItemHorizontal">
            <Link to={'/etp/zak/proc?proc_=' + props.proc_id}>
                <Layout className="mt05 aic bb pb1">
                    <Layout flex={1}>
                        <Text size="s" className="proclink">
                            {proc.title}
                        </Text>
                    </Layout>
                    <Layout flex={3}>
                        <Text size="xs" className="ml2">
                            <b>№ Процедуры</b> — {proc.num}
                        </Text>
                    </Layout>
                    <Layout flex={3} className="jcfe aic acc">
                        <Text size="xs" view="secondary" className="mr1">Начало приема</Text>
                        <Layout>
                            <Badge status="normal" view="stroked" label={proc.date_start} />
                            </Layout>
                        <Text size="xs" view="secondary" className="mr1">Окончание приема</Text>
                        <Layout>
                            <Badge status="warning" view="stroked" label={proc.date_end} />
                        </Layout>
                        <Badge size="xs" status={proc.status === "Заявка не подана" ? "normal" : proc.status === "Завершена" ? "system" : "success" } label={proc.status} className="ml2" />
                    </Layout>
                </Layout>
                <Text size="s" className="mt1">
                    {proc.desc}
                </Text>
            </Link>
        </div>
    );
};

export default ProcItemHor;