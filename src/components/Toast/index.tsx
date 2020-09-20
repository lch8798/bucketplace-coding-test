import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Toast as ToastType } from '@modules/toast';
import useToast from '@hooks/useToast';

const FADE_DURATION = 500;

type PropsType = {
    toast: ToastType;
};

export default function Toast(props: PropsType): JSX.Element {
    const { id, text, duration } = props.toast;
    const toast = useToast();
    const [gaugeDuration, setGaugeDuration] = useState(0);
    const [gaugeFadeOut, setGaugeFadeOut] = useState(false);

    useEffect(() => {
        const schedules: number[] = [];

        // 토스트 제거 스케줄
        schedules.push(
            setTimeout(() => toast.removeToast(id), duration + FADE_DURATION)
        );

        // 토스트 제거 애니메이션 스케줄
        schedules.push(setTimeout(() => setGaugeFadeOut(true), duration));

        // 토스트 게이지 시작
        setGaugeDuration(duration);

        // 스케줄러 클리어
        return () =>
            schedules.forEach((schedule: number) => clearInterval(schedule));
    }, []);

    return (
        <Wrap fadeOut={gaugeFadeOut} onClick={() => toast.removeToast(id)}>
            <TimeGauge duration={gaugeDuration}></TimeGauge>
            <Text>{text}</Text>
        </Wrap>
    );
}

const Wrap = styled.div`
    position: relative;
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
    background-color: #efefef;
    border-radius: 8px;
    overflow: hidden;
    opacity: ${({ fadeOut }: { fadeOut: boolean }) => (fadeOut ? 0 : 1)};
    transition-duration: ${FADE_DURATION}ms;
    animation-duration: ${FADE_DURATION}ms;
    animation-name: fadeIn;

    @keyframes fadeIn {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }
`;

const TimeGauge = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: ${({ duration }: { duration: number }) =>
        Boolean(duration) ? `0%` : `100%`};
    height: 100%;
    background-color: #fff;
    transition-duration: ${({ duration }: { duration: number }) => duration}ms;
    transition-timing-function: linear;
`;

const Text = styled.p`
    position: relative;
`;
