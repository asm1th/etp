import { Text } from '@consta/uikit/Text';
import { Layout } from "@consta/uikit/LayoutCanary";
import { IconTop } from '@consta/uikit/IconTop';
import { IconDown } from '@consta/uikit/IconDown';
import { useAppSelector } from "../../hooks/redux";
import { Link } from 'react-router-dom';
import { Badge } from "@consta/uikit/Badge";

const ProcItem = (props: { proc_id: string }) => {

    const { procList } = useAppSelector(state => state.zakReducer)
    const proc = procList[procList.findIndex(proc => proc.id === props.proc_id)]

    return (
        <div className="procItem">
            <Link to={'/etp/zak/proc?proc_id=' + props.proc_id}>
                <Layout className="mt05 jcsb">
                    <Text size="m" className="proclink">
                        {proc.title}
                    </Text>
                    <Badge size="xs" status="system" label="Заявка не подана" className="mt05" />
                </Layout>
                <Text size="s" className="mb05 mt1">
                    <b>№ Процедуры</b> — {proc.num}
                </Text>
                <Text size="s" className="mb05">
                    {proc.desc}
                </Text>
                <Layout className="mt05">
                    <Layout direction="column" className="mr2">
                        <Text size="xs" view="secondary" className="mb05">Начало приема</Text>
                        <Layout>
                            <Badge status="system" view="stroked" label={proc.date_start +' | '+proc.date_start_time} />
                        </Layout>
                    </Layout>
                    <Layout direction="column">
                        <Text size="xs" view="secondary" className="mb05">Окончание приема</Text>
                        <Layout>
                            <Badge status="warning" view="stroked" label={proc.date_end +' | '+proc.date_end_time} />
                        </Layout>
                    </Layout>
                </Layout>
            </Link>
        </div>
    );
};

export default ProcItem;