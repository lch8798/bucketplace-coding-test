import React from 'react';
import styled from 'styled-components';

// images
import checkboxIcon from '@assets/images/checkbox.svg';
import checkboxOnIcon from '@assets/images/checkboxOn.svg';

type PropsType = {
    on: boolean;
    label?: string;
    onClick: Function;
};

export default function Checkbox(props: PropsType): JSX.Element {
    const { on, label, onClick } = props;

    return (
        <CheckboxButton type={'button'} onClick={(...args) => onClick(...args)}>
            <CheckboxIconWrap>
                {/* default */}
                <CheckboxIcon src={checkboxIcon} alt={'Checkbox'} show={!on} />

                {/* on */}
                <CheckboxIcon
                    src={checkboxOnIcon}
                    alt={'Cancel Checkbox'}
                    show={on}
                />
            </CheckboxIconWrap>

            {Boolean(label) && <Label>{label}</Label>}
        </CheckboxButton>
    );
}

const CheckboxButton = styled.button`
    display: flex;
    align-items: center;
`;

const CheckboxIconWrap = styled.div`
    position: relative;
    width: 24px;
    height: 24px;
    vertical-align: middle;
`;

const CheckboxIcon = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 24px;
    height: 24px;
    transition-duration: 0.2s;

    opacity: ${({ show }: { show: boolean }) => (show ? 1 : 0)};
`;

const Label = styled.p`
    text-indent: 6px;
    font-size: 15px;
    font-weight: 600;
    color: #424242;
`;
