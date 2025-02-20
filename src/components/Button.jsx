import "./Button.css";

const Button = ({ text, type, onClick }) => {   // 부모 컴포넌트로부터 받는 props에 따라서 각각 다르게 동작하도록 만듬.
  return (
    <button
      onClick={onClick}
      className={`Button Button_${type}`}   // 버튼 태그의 classname은 우리가 전달한 type props에 따라 달라지게 됨(classname 동적으로 변경되도록 함). 버튼 css를 type에 따라 달리 주기 위해서!
    >
      {text}
    </button>
  )
};

export default Button;