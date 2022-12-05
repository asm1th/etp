import { Stats } from '@consta/widgets/Stats';

import React from "react";
import { Text } from '@consta/uikit/Text';
import { Layout } from "@consta/uikit/Layout";
import { Link } from "react-router-dom";
import style from "./StatsCard.module.scss";
import { IconArrowUp } from '@consta/uikit/IconArrowUp';
import { IconLightningBolt } from "@consta/uikit/IconLightningBolt";


interface StatsCard {
    url: string
    value: number
    title: string
    rate: string
    status?: "error" | "success" | "warning" | "system" | undefined,
    size?: "s" | "m" | "xs" | "l" | "2xs" | undefined,
    unit?: string
    imgSrc?: string | undefined
}

export const StatsCard = ({
    url = "/",
    value = 0,
    title = "",
    rate = "",
    status = "system",
    size = "xs",
    unit = "",
    imgSrc = undefined
}: StatsCard) => {

    return (
        <>
            <Link
                to={url}
                className={[style.statCard, style[status], style.grow].join(" ")}>
                <Layout>
                    <Layout direction='column' flex={1}>
                        <Stats
                            value={value}
                            title={title}
                            iconTitle={IconLightningBolt}
                            rate={rate}
                            status={status}
                            size={size}
                            unit={unit}
                        />
                    </Layout>
                    <Layout className={style.statCardImg}>
                        <img src={imgSrc} />
                    </Layout>
                </Layout>
            </Link>
        </>
    );
};

export default StatsCard;