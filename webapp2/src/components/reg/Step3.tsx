import React, { FC } from "react";
import { ResponsesEmptyBox } from '@consta/uikit/ResponsesEmptyBox';

const Step3: FC = () => {

    return (
        <>
            <ResponsesEmptyBox size="m"
            title="Проверка обот-Не-Робот"
            description="Можно двигаться дальше: сначала два шага направо, потом четыре налево, и всё — только вперёд!"
            actions={<></>}
            />
        </>
    );
};

export default Step3;