import React, { FC, useState } from "react";
import { Tabs } from '@consta/uikit/Tabs';

const LeftTabs: FC = () => {
    type Item = string;
    const items: Item[] = ['этап', 'этап', 'этап'];
    const [tabs, setTabs] = useState<Item | null>(items[0]);

    return (
        <>
            <Tabs
                className="Tabs"
                value={tabs}
                onChange={({ value }) => setTabs(value)}
                items={items}
                getLabel={(item) => item}
                linePosition="right"
            />
        </>
    );
};

export default LeftTabs;
