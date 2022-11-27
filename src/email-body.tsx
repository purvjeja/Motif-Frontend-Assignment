import { useCallback, useEffect, useState } from "react";
import { filters } from "./common-types";
import styled from "styled-components";
import Avatar from "./avatar";
import EmailContent from "./email-content";
import onEmptyMessage from "./common-component";


interface IEmailContainer {
    currentFilter: filters;
}

export interface IEmailList {
    id: string;
    from_email: string;
    from_name: string;
    subject: string;
    short_description: string;
    date?: string;
    doneReading?: boolean;
    markedFav?: boolean;
}

export default function EmailContainer(props: IEmailContainer) {
    const { currentFilter } = props;
    const [emailList, setEmailList] = useState<IEmailList[]>([]);
    const [selectedMailDetails, setSelectedMailDetails] = useState<IEmailList>({ id: '', from_email: '', from_name: '', subject: '', short_description: '' });
    const PreFiltedData = {
        'All': emailList.filter(list => list),
        'Unread': emailList.filter(list => !list.doneReading),
        'Read': emailList.filter(list => list.doneReading),
        'Favorites': emailList.filter(list => list.markedFav),
    }

    useEffect(() => {
        fetch("https://6366339879b0914b75cba9c2.mockapi.io/api/email").then((res) => res.json()).then((result) => {
            const finalResult = result.map((res: IEmailList) => ({ ...res, date: '26/02/2020 10:30 AM', doneReading: false, markedFav: false }));
            setEmailList(finalResult);
        }
        ).catch((e) => console.log(e))
    }, []);

    useEffect(() => setSelectedMailDetails(selectedMailDetails), [emailList, selectedMailDetails]);

    const onListItemSelect = useCallback((props: IEmailList) => {
        setEmailList(current => current.map(list => list.id === props.id ? { ...list, doneReading: true } : list))
        setSelectedMailDetails(props);
    }, []);


    const renderEmailItem = useCallback((props: IEmailList) => {
        const { from_name, short_description, subject, markedFav, from_email, date, doneReading, id } = props;

        return (
            <ListItemContainer key={id} color={`${doneReading}`} itemID={`${id === selectedMailDetails.id}`} onClick={() => onListItemSelect(props)}>
                <AvatarContainer><Avatar firstNameCharacter={from_name[0]} /></AvatarContainer>
                <div>
                    <p> From: <b>{from_name + ' <' + from_email + '>'} </b> </p>
                    <DescriptionContainer> <p> Subject: {subject}  </p></DescriptionContainer>
                    <DescriptionContainer><p> {short_description} </p></DescriptionContainer>
                    <div><p> {date}  <BoldText>{markedFav ? 'Favorite' : null}</BoldText> </p></div>
                </div>
            </ListItemContainer>
        )
    }, [onListItemSelect, selectedMailDetails]);

    const toggleItemFavorite = useCallback((listId: string) => setEmailList(emailList.map(list => list.id === listId ? { ...list, markedFav: !list.markedFav } : list)), [emailList]);

    return (
        <>
            {
                selectedMailDetails.id === '' ? (PreFiltedData[currentFilter].length === 0) ? onEmptyMessage(currentFilter) : PreFiltedData[currentFilter].map((list: IEmailList) => <div key={list.id}> {renderEmailItem(list)} </div>) :
                    <Grid>
                        <ListViewContainer>
                            {
                              (PreFiltedData[currentFilter].length === 0) ? onEmptyMessage(currentFilter) : PreFiltedData[currentFilter].map((list: IEmailList) => renderEmailItem(list))
                            }
                        </ListViewContainer>
                        <EmailBodyViewContent>
                            <EmailContent mailDetails={selectedMailDetails} onFavoriteClick={toggleItemFavorite} />
                        </EmailBodyViewContent>
                    </Grid>
            }
        </>
    )
}

const Grid = styled.div`
    display: grid;
    grid-template-columns: 30% 70%;
    grid-gap: 20px;
`;

const ListItemContainer = styled.div`
    width: 99%;
    height: auto;
    background-color: ${({ color }) => color === 'true' ? '#F2F2F2' : 'white'};
    border-radius: 10px;
    display: flex;
    color: #636363;
    border: 1px solid ${({ itemID }) => itemID === 'true' ? '#E54065' : '#CFD2DC'};  ;
    margin: 0px 0px 30px 0px;
`;


const AvatarContainer = styled.div`
    margin: 15px 20px 0px 20px;
`;

const DescriptionContainer = styled.div`
    margin: 0px;
    padding: 0px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: '---';
    max-width: 400px;
`;

const BoldText = styled.b`
    margin-left: 20%;
    color: #E54065;
`;

const ListViewContainer = styled.div`
    height: 900px;
    width: 100%;
    margin: 0px;
    color: #636363;
    overflow-y: scroll; 
    ::-webkit-scrollbar {
        display: none;
    }
`;

const EmailBodyViewContent = styled.div`
    width: 90%;
    color: #636363;
    border-radius: 10px;
    background-color: white;
    border: 1px solid #CFD2DC;
    height: 900px;
`;

