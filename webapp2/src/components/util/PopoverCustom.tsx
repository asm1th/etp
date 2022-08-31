import { Popover } from '@consta/uikit/Popover';
import { Text } from "@consta/uikit/Text";

const PopoverCustom = (props: {position: any, text: string })  => {

    return (
        <>
            <Popover
                direction="rightCenter"
                spareDirection="downStartLeft"
                offset="xl"
                arrowOffset={0}
                //onClickOutside={action('onClickOutside')}
                isInteractive={false}
                position={props.position}
                className="tipPopover">

                {(direction) => (
                    <Text size="xs" style={{ whiteSpace: "pre-line" }}>
                        {props.text}
                    </Text>
                )}
            </Popover>
        </>
    );
};

export default PopoverCustom;