import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useReducer, useRef, createContext } from 'react';
import Home from './pages/Home';
import New from './pages/New';
import Diary from './pages/Diary';
import Notfound from './pages/Notfound';
import Edit from './pages/Edit';

const mockData = [
  {
    id: 1,
    createdDate: new Date("2025-02-25").getTime(),
    weatherId: 1,
    content: "1번 일기 내용"
  },
      {
    id: 2,
    createdDate: new Date("2025-02-26").getTime(),
    weatherId: 2,
    content: "2번 일기 내용"
  },
            {
    id: 3,
    createdDate: new Date("2025-01-07").getTime(),
    weatherId: 3,
    content: "3번 일기 내용"
  },
]

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      return [action.data, ...state];
    case 'UPDATE':
      return state.map((item) =>
        String(item.id) === String(action.data.id)
          ? action.data
          : item
      );
    case 'DELETE':
      return state.filter((item) => String(item.id) !== String(action.id))
    default:
      return state;
  }
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {

  const [data, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3);

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
