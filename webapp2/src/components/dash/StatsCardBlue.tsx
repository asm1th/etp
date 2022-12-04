import React from "react";
import { Text } from '@consta/uikit/Text';
import { Layout } from "@consta/uikit/Layout";
import { Link } from "react-router-dom";
import style from "./StatsCardBlue.module.scss";


interface StatsCardBlue {
    url: string
    value: number
    title: string
    rate: string
    status?: "error" | "success" | "warning" | "system" | undefined,
    size?: "s" | "m" | "xs" | "l" | "2xs" | undefined,
    unit?: string
    imgSrc?: string | undefined
}

export const StatsCardBlue = ({
    url = "/",
    value = 0,
    title = "",
    rate = "",
    status = "system",
    size = "xs",
    unit = "",
    imgSrc = undefined
}: StatsCardBlue) => {

    return (
        <>
            <Link
                to={url}
                className={[style.statCard, style[status], style.grow].join(" ")}>
                <Layout className={style.statCardContainer}>
                    <Layout className={style.statCardImg}>
                        <img src={imgSrc} />
                    </Layout>
                    <Layout direction='column' flex={1} className={style.statCardText}>
                        <Layout direction='column' flex={1}>
                            <Text className={style.title}>{title}</Text>
                            <Text className={style.rate}>{rate}</Text>
                        </Layout>
                        <Text className={style.value}>{value}</Text>
                        <Text className={style.unit}>{unit}</Text>
                    </Layout>

                </Layout>
            </Link>
        </>
    );
};

export default StatsCardBlue;