import React, { FC, useState } from "react";
import { Tabs } from '@consta/uikit/Tabs';

const LeftTabs: FC = () => {
    type Item = string;
    const items: Item[] = ['один', 'два', 'три'];
    const [value, setValue] = useState<Item | null>(items[0]);

    return (
        <>
            
            <Tabs
                value={value}
                onChange={({ value }) => setValue(value)}
                items={items}
                getLabel={(item) => item}
                view="clear"
                linePosition="left"
            />
        </>
    );
};

export default LeftTabs;
