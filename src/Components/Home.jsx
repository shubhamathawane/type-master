import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { quotesArray, random } from "./Helper";
import { words } from "./words";

var current = 0;
var correct = new Array(100).fill(0);

const Container = styled.div`
  background: #282a36;
  height: 100vh;
  width: 100vw;
  position: relative;
`;

const Wrapper = styled.div`
  background: #282a36;
  padding: 20px;
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

const Text = styled.p`
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

const HR = styled.hr`
  color: yellowgreen;
  width: 80%;
`;

const Input = styled.input`
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

const Info = styled.div`
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

const Form = styled.form`
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

const Speed = styled.p``;

const Word = ({ word, index }) => {
  var color;
  if (current === index) {
    color = "#f1fa8c";
  } else if (correct[index] === 1) {
    color = "#50fa7b";
  } else if (correct[index] === -1) {
    color = "#ff5555";
  }
  return <span style={{ color: color }}>{word} </span>;
};

var timeRunning = false,
  time = 0,
  timer,
  correctNumber = 0;

const Home = () => {
  const inputRef = useRef(null);
  const outputRef = useRef(null);
  const [duration, SetDuration] = useState(60);
  const [sentenceArr, setSentenceArr] = useState([]);
  const [started, setStarted] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [checked, setChecked] = useState(15);
  const [errorIndex, setErrorIndex] = useState(0);
  const [highest, setHighest] = useState(0);
  const [input, setInput] = useState("");
  const [cpm, setCpm] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [last, setLast] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [isError, setIsError] = useState(false);
  const [lastScore, setLastScore] = useState("0");

  const getRandomWords = (n) => {
    if (!n) n = checked;
    let random = words.sort(() => 0.5 - Math.random()).slice(0, n);
    setSentenceArr(random);
    inputRef.current.focus();
  };

  useEffect(() => {
    const localhighest = localStorage.getItem("highest");
    if (localhighest) setHighest(localhighest);
    const localChecked = localStorage.getItem("checked");
    if (localChecked) setChecked(Number(localChecked));
    getRandomWords(localChecked);
  }, []);

  const handleInput = (e) => {
    const tempinput = e.target.value;
    if (tempinput[tempinput.length - 1] === " ") return;
    setInput(tempinput);
    if (current == checked - 1 && tempinput === sentenceArr[checked - 1]) {
      handleSubmit(tempinput)
      setLast(speed);
      localStorage.setItem("highest", Math.max(highest, speed));      if (highest < speed) setHighest(speed);
      if(highest < speed) setHighest(speed)
      else setHighest(Number(localStorage.getItem("highest")));
      timeClearer()
      setInput("");
      return 0;
    }
  };

  const handleSubmit = (tempInput) => {
    if (
      input === sentenceArr[current] ||
      tempInput === sentenceArr[current]
    ) {
      correct[current] = 1;
      correctNumber++;
    } else correct[current] = -1;
    
    setAccuracy(((correctNumber / (current + 1)) * 100).toFixed(0));
    current++;

    if (current === sentenceArr.length) {
      timeClearer();
      restart(checked);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key !== " " || current === checked || e.target.value.trim() === "")
      return false;
    if (!timeRunning && current < sentenceArr.length) {
      timeRunning = true;
      timer = setInterval(() => {
        time++;
        setSpeed(((60 * correctNumber) / time).toFixed(0));
      }, 1000);
    }
    handleSubmit();
    setInput("");
  };

  const timeClearer = () => {
    clearInterval(timer);
    timeRunning = false;
    time = 0;
    correctNumber = 0;
  };

  const restart = (number) => {
    correct.fill(0);
    current = 0;
    getRandomWords(Number);
    setSpeed(0);
    setAccuracy(0);
    timeClearer();
  };

  const handleRadio = (e) => {
    const value = e.target.value;
    restart(value);
    localStorage.setItem("checked", Number(value));
    setChecked(Number(value));
  };

  return (
    <Container>
      <Wrapper>
        <Form>
          <p>Select the words per minute</p>
          <Speed>
            <input
              type="radio"
              name="number"
              id="radio-1"
              value={15}
              onChange={handleRadio}
              checked={checked === 15}
            />
            <span> 15</span>
          </Speed>
          <Speed>
            <input
              type="radio"
              name="number"
              id="radio-2"
              value={30}
              onChange={handleRadio}
              checked={checked === 30}
            />
            <span> 30</span>
          </Speed>
          <Speed>
            <input
              type="radio"
              name="number"
              id="radio-3"
              value={45}
              onChange={handleRadio}
              checked={checked === 45}
            />
            <span> 45</span>
          </Speed>
          <Speed>
            <input
              type="radio"
              name="number"
              id="radio-4"
              value={60}
              onChange={handleRadio}
              checked={checked === 60}
            />
            <span> 60</span>
          </Speed>
        </Form>
        <Info>
          <Speed>Current Speed (WPM) : {speed}</Speed>
          <Speed>Last Time : {last}</Speed>
          <Speed>Highest : {highest}</Speed>
          <Speed>Accuracy : {accuracy}</Speed>
        </Info>
        <Text>
          {sentenceArr.map((word, index) => {
            return <Word key={index} word={word} index={index} />;
          })}
        </Text>
        {/* <HR /> */}
        <Input
          ref={inputRef}
          type="text"
          className="type-input"
          placeholder="Start Typing"
          value={input}
          onChange={handleInput}
          onKeyPress={handleKeyPress}
        />
      </Wrapper>
    </Container>
  );
};

export default Home;
