import styled from "styled-components"
interface IAvatarProps {
    firstNameCharacter: string;
}


export default function Avatar(props: IAvatarProps) {
    return (
        <AvatarContainer>{props.firstNameCharacter}</AvatarContainer>
    )
}

const AvatarContainer = styled.div`
    width: 55px;
    height: 55px;
    border-radius: 50%;
    background-color: #E54065;
    color: white;
    font-size: 45px;
    text-align: center;
    padding: 5px;
`;  

