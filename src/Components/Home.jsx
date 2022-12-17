import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { A, Container, Form, Info, Input, Speed, Text, Wrapper } from "../Styles/Home";
import { quotesArray, random } from "./Helper";
import { words } from "./words";

var current = 0;
var correct = new Array(100).fill(0);

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
  const [sentenceArr, setSentenceArr] = useState([]);
  const [speed, setSpeed] = useState(0);
  const [checked, setChecked] = useState(15);
  const [highest, setHighest] = useState(0);
  const [input, setInput] = useState("");
  const [last, setLast] = useState(0);
  const [accuracy, setAccuracy] = useState(0);

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
      handleSubmit(tempinput);
      setLast(speed);
      localStorage.setItem("highest", Math.max(highest, speed));
      if (highest < speed) setHighest(speed);
      if (highest < speed) setHighest(speed);
      else setHighest(Number(localStorage.getItem("highest")));
      timeClearer();
      setInput("");
      return;
    }
  };

  const handleSubmit = (tempInput) => {
    if (input === sentenceArr[current] || tempInput === sentenceArr[current]) {
      correct[current] = 1;
      correctNumber++;
    } else correct[current] = -1;

    setAccuracy(((correctNumber / (current + 1)) * 100).toFixed(0));
    current++;

    if (current === sentenceArr.length) {
      //timeClearer();
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
    getRandomWords(number);
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
        <br /><br /><br />
        <p>Created with ♥ by <A href="https://github.com/shubhamathawane/"> Shubham Athawane</A></p>
      </Wrapper>
    </Container>
  );
};

export default Home;
