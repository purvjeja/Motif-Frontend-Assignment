import { useEffect, useState } from "react";
import styled from "styled-components";
import Avatar from "./avatar";
import { IEmailList } from "./email-body";
import Parser from 'html-react-parser';


interface IEmailContentProps {
    mailDetails: IEmailList;
    onFavoriteClick: (id: string) => void;
}

export default function EmailContent(props: IEmailContentProps) {
    const { mailDetails, onFavoriteClick } = props;
    const [contentBody, setContentBody] = useState<string>('');
    const [favoriteMessageBoolean, setFavoriteMessageBoolean] = useState<boolean>(mailDetails.markedFav || false);
    const favoriteButtonMessage = `${favoriteMessageBoolean ? 'Remove' : 'Mark'} as favorite`;
    const onFavoriteButtonClick = (id: string) => {
        onFavoriteClick(id);
        setFavoriteMessageBoolean(!favoriteMessageBoolean);
    } 

    useEffect(() => {
        fetch(`https://6366339879b0914b75cba9c2.mockapi.io/api/email/${mailDetails.id}`).then((res) => res.json()).then((result) => {
            setContentBody(result.body);
        }
        ).catch((e) => console.log(e))
    }, [mailDetails]);

    return (
        <>
            <MailContentHeader>
                <Avatar firstNameCharacter={mailDetails.from_name[0]} />
                <Title>{mailDetails.subject}</Title>
                <FavoriteButton onClick={() => onFavoriteButtonClick(mailDetails.id)}>{favoriteButtonMessage}</FavoriteButton>
            </MailContentHeader>
            <DateContainer><p>{mailDetails.date}</p></DateContainer>
            <BodyTextContentContainer>{Parser(contentBody)}</BodyTextContentContainer>
        </>
    )
}

const MailContentHeader = styled.div`
    display: grid;
    grid-template-columns: 7% 75% 13%;
    padding: 40px 0px 0px 40px;
`;

const Title = styled.h1`
    margin: 5px 0px 0px 0px;
`;

const FavoriteButton = styled.button`
    width: auto;
    height: 30px;
    margin: 10px 0px 0px 10px;
    border: none;
    cursor: pointer;
    color: white;
    border-radius: 40px;
    background-color: #E54065;
`;

const DateContainer = styled.div`
    margin-left: 130px;
`;

const BodyTextContentContainer = styled.div`
    padding: 10px 80px 0px 130px;   
`;

