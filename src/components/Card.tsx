import { styled } from "styled-components";
const Contents = styled.div``;
const Box = styled.div``;
const UserProfile = styled.div``;
interface Sampledata {
  username: string;
  userhandle: string;
  contents: string;
  con_img: string;
}

export default function Card(sampledata: Sampledata) {
  return (
    <Box>
      <UserProfile>
        <div>{sampledata.username}</div>
        <div>{sampledata.userhandle}</div>
      </UserProfile>
      <Contents>
        <div>{sampledata.contents}</div>
        <div>{sampledata.con_img}</div>
      </Contents>
    </Box>
  );
}
