import React from 'react';
import styled from 'styled-components';

type PropsType = {
    profileImage: string;
    nickname: string;
};

export default function UserProfile(props: PropsType): JSX.Element {
    const { profileImage, nickname } = props;

    return (
        <Wrap>
            <ProfileImage src={profileImage} alt={'User Profile Image'} />
            <Nickname>{nickname}</Nickname>
        </Wrap>
    );
}

const Wrap = styled.div`
    display: flex;
    align-items: center;
    transition-duration: 0.2s;
    cursor: pointer;

    &:hover {
        opacity: 0.5;
    }
`;

const ProfileImage = styled.img`
    width: 36px;
    height: 36px;
    border-radius: 100%;
`;

const Nickname = styled.p`
    line-height: 19px;
    text-indent: 10px;
    font-size: 15px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.74);
`;
