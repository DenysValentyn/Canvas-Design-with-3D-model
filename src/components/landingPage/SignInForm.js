import React, {useState} from 'react';
import styled from 'styled-components';
import {getUserId} from '../../app/utils/firebase.js';
import {ReactComponent as GoogleIcon} from '../../static/images/icons/google.svg';
import {ReactComponent as FacebookIcon} from '../../static/images/icons/facebook.svg';

function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Form>
      <InputDiv>
        Email
        <Input
          type="text"
          value={email}
          onChange={(event) => handleChange(event, setEmail)}
        ></Input>
      </InputDiv>
      <InputDiv>
        Password
        <Input
          type="text"
          value={password}
          onChange={(event) => handleChange(event, setPassword)}
        ></Input>
      </InputDiv>
      <ButtonDiv>
        <Button onClick={() => handleSubmit(email)}>Sign In</Button>
      </ButtonDiv>
      <TPLDiv>
        <Button>
          <GoogleIcon width="16" height="16" />
          <p>Google</p>
        </Button>
        <Button>
          <FacebookIcon width="24" hieght="24" />
          <p>Facebook</p>
        </Button>
      </TPLDiv>
    </Form>
  );
}

async function handleSubmit(email) {
  const id = await getUserId(email);
  if (id) {
    localStorage.setItem('user_id', id);
    window.location.href = './profile';
  } else {
    console.log('id not exist');
    return;
  }
}

function handleChange(event, setValue) {
  setValue(event.target.value);
}

const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 80%;
  border: 1px solid #fffffb;
  background-color: transparent;

  @media (max-width: 768px) {
    height: 100%;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const InputDiv = styled.label`
  margin: 5px;
  font-size: 16px;
  color: #fffffb;
`;

const Input = styled.input`
  padding: 0 10px;
  width: 100%;
  height: 30px;
  border: 1px solid #fffffb;
  border-radius: 5px;
  color: #fffffb;
  background-color: transparent;

  :focus {
    outline: none !important;
  }
`;

const ButtonDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
`;

const TPLDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 5px 5px;
  margin: auto 5px 5px 5px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 30px;
  border: 1px solid #fffffb;
  border-radius: 5px;
  font-size: 16px;
  color: #fffffb;
  background-color: transparent;

  :hover {
    cursor: pointer;
    color: #81c7d4;
    background-color: #fffffb;
  }
`;

export {SignInForm};
