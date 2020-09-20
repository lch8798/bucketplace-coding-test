import React from 'react';
import styled from 'styled-components';

// images
import scrapIcon from '@assets/images/scrap.svg';
import scrapOnIcon from '@assets/images/scrapOn.svg';

type PropsType = {
    on: boolean;
    onClick: Function;
};

export default function Scrap(props: PropsType): JSX.Element {
    const { on, onClick } = props;

    return (
        <ScrapButton type={'button'} onClick={(...args) => onClick(...args)}>
            {/* default */}
            <ScrapIcon src={scrapIcon} alt={'Scrap Button'} show={!on} />

            {/* on */}
            <ScrapIcon
                src={scrapOnIcon}
                alt={'Scrap Cancel Button'}
                show={on}
            />
        </ScrapButton>
    );
}
const ScrapButton = styled.button`
    position: relative;
    width: 32px;
    height: 32px;
    vertical-align: middle;

    &:hover {
        opacity: 0.8;
    }
`;

const ScrapIcon = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 32px;
    height: 32px;
    transition-duration: 0.2s;

    opacity: ${({ show }: { show: boolean }) => (show ? 1 : 0)};
`;
