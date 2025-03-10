import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useReducer, useRef, createContext, useEffect, useState } from 'react';
import Home from './pages/Home';
import New from './pages/New';
import Diary from './pages/Diary';
import Notfound from './pages/Notfound';
import Edit from './pages/Edit';

function reducer(state, action) {
  let nextState;

  switch (action.type) {
    case 'INIT':
      return action.data;
    case 'CREATE':
      {
        nextState = [action.data, ...state]; 
        break;
      }
    case 'UPDATE':
      {
        nextState = state.map((item) =>
          String(item.id) === String(action.data.id)
            ? action.data
            : item
        );
        break;
      }
    case 'DELETE':
      {
        nextState = state.filter(
          (item) => String(item.id) !== String(action.id)
        );
        break;
      }
    default:
      return state;
  }

  localStorage.setItem("diary", JSON.stringify(nextState));
  return nextState;
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(1);

  useEffect(() => {
    const storedData = localStorage.getItem("diary");
    if (!storedData) {
      setIsLoading(false);
      return;
    }

    const parsedData = JSON.parse(storedData);  
    if (!Array.isArray(parsedData)) { // parsedData가 배열이 아닐 경우에 대한 예외처리
      setIsLoading(false);
      return;
    }

    let maxId = 0;
    parsedData.forEach((item) => {
      if (Number(item.id) > maxId) {
        maxId = Number(item.id)   
      }
    });
  
    idRef.current = maxId + 1;

    dispatch({
      type: "INIT",
      data: parsedData,
    });
    setIsLoading(false);
  }, []);     // 컴포넌트가 마운트 되었을때만 실행되도록 deps 빈배열로

  // 새로운 일기 추가
  const onCreate = (createdDate, weatherId, content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createdDate,
        weatherId,
        content,
      },
    });
  };

  // 기존 일기 수정
  const onUpdate = (id, createdDate, weatherId, content) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createdDate,
        weatherId,
        content,
      },
    });
  };

  // 기존 일기 삭제
  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      id,
    });
  };

  if (isLoading) {
    return <div>데이터 로딩중입니다 ...</div>
  }

  return (
    <>   
      <DiaryStateContext.Provider value={data}>   {/* App 컴포넌트의 data state 값을 Routes 아래에 있는 모든 페이지 컴포넌트들에게 공급할 수 있도록 감싸줌. */}
        <DiaryDispatchContext.Provider  
          value={{  // 모든 페이지 컴포넌트들에 상태 변화 함수들을 공급함.
            onCreate,
            onUpdate,
            onDelete,
          }}
        >
           <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/new' element={<New />} />
            <Route path='/diary/:id' element={<Diary />} />
            <Route path='/Edit/:id' element={<Edit />} />
            <Route path='*' element={<Notfound />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  )
}

export default App
