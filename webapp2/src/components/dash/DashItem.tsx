import React from "react";
import { Text } from '@consta/uikit/Text';
import { Layout } from "@consta/uikit/LayoutCanary";
import { IconTop } from '@consta/uikit/IconTop';
import { IconDown } from '@consta/uikit/IconDown';
import { useAppSelector } from "../../hooks/redux";
import { Column } from '@consta/charts/Column'
import { Link } from 'react-router-dom';
import './DashItem.css'


const DashItem = (props: { id: number }) => {
    const { dashItems } = useAppSelector(state => state.dashReducer)
    const item = dashItems[dashItems.findIndex(dashItems => dashItems.id === props.id)]

    const style = {
          fill: 'blue',
          fillOpacity: 0.2,
          stroke: 'blue',
          lineWidth: 1,
          //lineDash: [4, 5],
          strokeOpacity: 0.7,
          shadowColor: 'rgb(138 138 138 / 50%)',
          shadowBlur: 5,
          shadowOffsetX: 2,
          shadowOffsetY: 2,
          cursor: 'pointer',
          r: 5
        }
        const axis = {
            //nice: false
            tickLine:{
                
            }
        }

    return (
        <>
            <Link to={item.url} className="dashItem">
                <Layout>
                    <Layout direction="column" >

                        <Text className="dashItemLabel">{item.label}</Text>
                        <Text className="dashItemNumbers">{item.num}</Text>
                        <Layout className="dashItemSubLabel">
                            {item.status === "up" ? (
                                <IconTop />
                            ) : (
                                <IconDown />
                            )}
                            <Text className="dashItemPercent">{item.percent}%</Text>
                            <Text className="dashItemPeriod">{item.period}</Text>
                        </Layout>
                        {/* <Stats
                                value={2170}
                                title="Молний за год"
                                iconTitle={IconLightningBolt}
                                unit="разрядов"
                                rate="20%"
                                status="success"
                                layout="default"
                                size="s"
                            /> */}

                    </Layout>
                    {item.chart.length > 0 ?(
                    <Layout className="dashItemChart">
                        <Column
                            style={{ marginBottom: 'var(--space-m)', width:"80px" }}
                            data={item.chart}
                            xField="parameter"
                            yField="number"
                            //autoFit={true}
                            padding={0}
                            columnStyle={style}
                            columnWidthRatio={.2}
                            marginRatio={.2}
                            intervalPadding={5}
                            maxColumnWidth={5}
                            yAxis={axis}
                        />
                    </Layout>
                    ): null}
                </Layout>
            </Link>
        </>
    );
};

export default DashItem;