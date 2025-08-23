import React from 'react';
import VcSelector from './vcSelector';

export const CustomTabBar = ({ navigationState, setIndex }: any) => {
    const data: any[] = navigationState.routes.map(({ key, title }: any) => ({
        id: key,
        value: title,
    }));
    return <VcSelector value={data[navigationState.index ?? 0]?.id} data={data} onChange={(item) => setIndex(data.findIndex(i => i.id === item.id))} />
};
