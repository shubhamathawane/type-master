import styled from "styled-components";



export const Container = styled.div`
  background: ${({theme}) => theme.bg};
  color: ${({theme}) => theme.text};
  height: 100vh;
  width: 100vw;
  position: relative;
  `;

export const Wrapper = styled.div`
  background: ${({theme}) => theme.bg};
  padding: 20px;
  color: %{({theme}) => theme.text};
  height: 60vh;
  width: 80vw;
  margin: 10px;
  gap: 1em;
  border-radius: 7px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Text = styled.p`
color: %{({theme}) => theme.text};
  line-height: 2rem;
  margin: 10px auto;
  color: white;
  border-radius: 7px;
  font-family: "Poppins", sans-serif;
  font-weight: 200;
  font-size: 19.5px;
  background-color: #44475a;
  width: 956px;
  padding: 12px;
`;

export const HR = styled.hr`
  color: yellowgreen;
  width: 80%;
`;

export const Input = styled.input`
  height: 20px;
  margin-top: 2em;
  width: 390px;
  color: white;
  padding: 7px;
  font-size: 18px;
  font-family: "Poppins", sans-serif;
  border-radius: 7px;
  border: 1px solid gray;
  background-color: transparent;
  text-align: center;
`;

export const Info = styled.div`
  display: flex;
  padding: 8px;
  color: white;
  width: 100%;
  font-family: "Poppins", sans-serif;
  font-weight: 200;
  gap: 100px;
  font-size: 13px;
  height: 30px;
  width: 790px;
  margin-left: 60px;
  /* background-color: green; */
`;

export const Form = styled.form`
  display: flex;
  padding: 8px;
  color: white;
  width: 100%;
  font-family: "Poppins", sans-serif;
  font-weight: 200;
  gap: 100px;
  font-size: 13px;
  height: 30px;
  width: 790px;
  margin-left: 60px;
`;

export const Speed = styled.p``;