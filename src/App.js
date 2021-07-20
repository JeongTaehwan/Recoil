import React from 'react';
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue, } from 'recoil';

const textState = atom({ // atom | atom은 상태의 일부를 나타냄
  key: 'textState',
  default: '',
});

const charCountState = selector({ // selector | selector는 파생된 상태의 일부를 나타냄 | 여기서 파생된 상태라는 것은 상태의 '변화'임
  key: 'charCountState',
  get: ({ get }) => {
    const text = get(textState);

    return text.length;
  },
});

function App() {
  return (
    <RecoilRoot>
      <CharacterCounter />
    </RecoilRoot>
  );
}

function CharacterCounter() {
  return (
    <div>
      <TextInput />
      <CharacterCount />
    </div>
  );
}

function TextInput() {
  const [text, setText] = useRecoilState(textState); // 컴포넌트가 atom을 읽고 쓰게 하기 위해 useRecoilState를 사용함

  const onChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <input type="text" value={text} onChange={onChange} />
      <br />
      Echo: {text}
    </div>
  );
}

function CharacterCount() {
  const count = useRecoilValue(charCountState); // useRecoilValue Hooks를 이용하여 charCountState의 값을 읽어낼 수 있음

  return <>Character Count: {count}</>;
}

export default App;
