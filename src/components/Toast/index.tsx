import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Toast as ToastType } from '@modules/toast';
import useToast from '@hooks/useToast';

type PropsType = {
    toast: ToastType;
};

export default function Toast(props: PropsType): JSX.Element {
    const { id, text, duration } = props.toast;
    const toast = useToast();

    useEffect(() => {
        setTimeout(() => toast.removeToast(id), duration);
    }, []);

    return <Wrap>{text}</Wrap>;
}

const Wrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    width: 440px;
    height: 80px;
    text-align: center;
    font-size: 15px;
    color: #424242;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.26);
    background-color: #fff;
    border-radius: 8px;

    transition: opacity 0.3s, transform 0.3s;
`;
