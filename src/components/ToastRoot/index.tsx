import React from 'react';
import styled from 'styled-components';
import { Toast } from '@components/index';
import useToast from '@hooks/useToast';

export default function ToastRoot(): JSX.Element {
    const toast = useToast();

    return (
        <Wrap>
            {toast.state.toasts.length > 0 &&
                toast.state.toasts.map((toast) => (
                    <Toast key={toast.id} toast={toast} />
                ))}
        </Wrap>
    );
}

const Wrap = styled.div`
    position: fixed;
    bottom: 20px;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    width: fit-content;
`;
