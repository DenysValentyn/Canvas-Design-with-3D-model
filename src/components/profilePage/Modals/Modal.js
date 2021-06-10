import React, {useState} from 'react';
import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import {fetchSearchTarget, shareProject} from '../../../app/actions/index.js';
import * as theme from '../../../app/constants/theme.js';
import {ReactComponent as X} from '../../../static/images/icons/x.svg';
import {ReactComponent as SearchIcon} from '../../../static/images/icons/search.svg';
import avatar from '../../../static/images/backgrounds/profile-avatar.png';

function Modal(props) {
  const [email, setEmail] = useState('');
  const {searchTarget, selectedProject} = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  return (
    <Div>
      <Mask></Mask>
      <ModalBody>
        <Button onClick={() => handleClickX(props)}>
          <X width="24" height="24" />
        </Button>
        <Content>
          <SearchBar>
            <Input
              type="text"
              value={email}
              onChange={(event) => handleChange(event, setEmail)}
            ></Input>
            <SearchButton onClick={() => handleSubmit(dispatch, email)}>
              <SearchIcon />
            </SearchButton>
          </SearchBar>
          {searchTarget.id ? (
            <Target>
              <img src={avatar}></img>
              <p>{searchTarget.name}</p>
              <button
                onClick={() =>
                  handleClickShare(
                    dispatch,
                    selectedProject.id,
                    searchTarget.id
                  )
                }
              >
                Share
              </button>
            </Target>
          ) : (
            ''
          )}
        </Content>
      </ModalBody>
    </Div>
  );
}

function handleChange(event, setValue) {
  setValue(event.target.value);
}

function handleSubmit(dispatch, email) {
  dispatch(fetchSearchTarget(email));
}

function handleClickShare(dispatch, project_id, target_id) {
  dispatch(shareProject(project_id, target_id));
}

function handleClickX(props) {
  props.handleToggleShare(false);
}

const Div = styled.div`
  position: fixed;
  z-index: 40;
  width: 100%;
  height: 100%;
`;

const Mask = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #1c1c1c;
  opacity: 0.7;
`;

const ModalBody = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40%;
  height: 60%;
  background-color: white;
  border-radius: 5px;
  opacity: 1;

  @media (max-width: 1023px) {
    width: 50%;
  }

  @media (max-width: 767px) {
    width: 80%;
  }

  @media (max-width: 375px) {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`;

const Button = styled.button`
  position: absolute;
  right: 0;
  margin: 15px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const Content = styled.div`
  margin: 45px 30px 30px;
`;

const SearchBar = styled.div`
  display: flex;
`;

const SearchButton = styled.button`
  width: 28px;
  height: 28px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const Input = styled.input`
  margin: 0 5px 0 0;
  padding: 0 10px;
  width: 100%;
  font-size: 16px;
  line-height: 24px;
  align-text: center;
  border: 1px solid ${theme.SUMI}
  border-radius: 5px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
  font-size: 16px;

  :focus{
    outline: none;
  }
`;

const Target = styled.div`
  display: flex;
  align-items: center;
  margin: 15px 0;

  img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: ${theme.WHITESMOKE};
  }

  p {
    margin: 0 0 0 15px;
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    font-size: 16px;
  }

  button {
    margin: 0 0 0 auto;
    padding: 0 5px;
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    font-size: 16px;
    border: 1px solid ${theme.RURI};
    border-radius: 5px;
    color: ${theme.WHITE};
    background-color: ${theme.RURI};
    cursor: pointer;
  }
`;

export {Modal};