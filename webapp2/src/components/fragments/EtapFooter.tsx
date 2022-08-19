import React, { FC, useState } from "react";
import { Text } from "@consta/uikit/Text";
import { Layout } from "@consta/uikit/LayoutCanary";
import { Checkbox } from '@consta/uikit/Checkbox';
import { Button } from "@consta/uikit/Button";
import { IconSave } from '@consta/uikit/IconSave';
import { TextField } from "@consta/uikit/TextField";
import { IconInfo } from '@consta/uikit/IconInfo';
import { Popover } from '@consta/uikit/Popover';
import { useAppSelector } from "../../hooks/redux";

const EtapFooter: FC = () => {
    const { noNdsStatia, summKP, summKP_nds } = useAppSelector(state => state.mainReducer)

    //popover
    type Position = any;
    const [position, setPosition] = useState<Position>(undefined);

    const handleMouseMove = (event: React.MouseEvent) => {
        setPosition({ x: event.clientX, y: event.clientY });
    };
    //

    return (
        <div className="footer">
            <Popover
                direction="rightCenter"
                spareDirection="downStartLeft"
                offset="xl"
                arrowOffset={0}
                //onClickOutside={action('onClickOutside')}
                isInteractive={false}
                position={position}
                className="tipPopover"
            >
                {(direction) => (
                    <div>
                        <Text size="xs">
                            При активации чекбокса изменения<br /> автоматически применятся<br />ко всем расценкам этапа
                        </Text>
                    </div>
                )}
            </Popover>
            <Layout>
                <Layout flex={6} className="aic ">
                    <Text as="div" className="label">
                        Представленное Коммерческое предложение должно учитывать все затраты Участника анализа рынка.<br />
                        Все показатели, участвующие в расчете цены, остаются неизменными на весь период действия Коммерческого предложения.
                    </Text>
                </Layout>
                <Layout flex={3} className="SubSummFooter">
                    <Layout flex={1} className="aic jcc">Итого</Layout>
                    <Layout flex={1} className="aic jcc">{summKP}</Layout>
                    <Layout flex={1} className="aic jcc">{summKP_nds}</Layout>
                </Layout>
            </Layout>
            <Layout className="mt2">
                <Layout className="aic" flex={10}>
                    <Checkbox

                        label="Не применяется НДС"
                        checked={false} />
                    <div className="mr2 ml05" onMouseMove={handleMouseMove} onMouseLeave={() => setPosition(undefined)}>
                        <IconInfo size="s" view="ghost" />
                    </div>
                    <Text as="div" className="mr1">
                        Стоимость предложения не облагается НДС, в соответствии со статьей
                    </Text>
                    <TextField
                        placeholder="Указать статью"
                        size="s"
                        labelPosition="left"
                        value={noNdsStatia}
                        required
                        style={{ width: '115px' }} />
                    <Text as="div" className="ml1">
                        НК РФ
                    </Text>
                </Layout>
                <Layout flex={1} className="aic">
                    <Button label="Сохранить изменения" size="s" iconLeft={IconSave} disabled />
                </Layout>
            </Layout>
        </div>
    );
};

export default EtapFooter;
