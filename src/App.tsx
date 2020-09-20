import React from 'react';
import { ToastRoot } from '@components/index';
import { Feed } from '@pages/index';

export default function App(): JSX.Element {
    return (
        <>
            <Feed />
            <ToastRoot />
        </>
    );
}
