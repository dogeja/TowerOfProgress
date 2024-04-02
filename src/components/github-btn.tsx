import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { styled } from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Button = styled.span`
  margin: 1rem;
  margin-bottom: 1.325rem;
  background-color: white;
  width: 100%;
  max-width: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.9;
  font-weight: 400;
  color: black;
  padding: 6px 8px;
  border-radius: 4px;
  border: 0;
  gap: 5px;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
    transition: 0.4s ease;
  }
  &:active {
    opacity: 1;
    transition: 0.4s ease;
    transform: scale(0.98);
    border-radius: 16px;
  }
`;

const Logo = styled.img`
  height: 25px;
`;
export default function GithubBtn() {
  const navigate = useNavigate();
  const onclick = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div>OR</div>
      <Button onClick={onclick}>
        <Logo src="/github-logo.svg" />
        Continue with Github
      </Button>
    </>
  );
}
