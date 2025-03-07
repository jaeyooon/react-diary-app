import { replace, useParams } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { DiaryDispatchContext, DiaryStateContext } from "../App";
import useDiary from "../hooks/useDiary";
import Swal from "sweetalert2";

const Edit = () => {
  const params = useParams();
  const nav = useNavigate();
  const { onDelete, onUpdate } = useContext(DiaryDispatchContext);

  const curDiaryItem = useDiary(params.id);

  const onClickDelete = () => {
    Swal.fire({
      icon: "warning",
      title: "일기를 정말 삭제할까요?",
      text: "삭제된 일기는 복구할 수 없어요.",
      showCancelButton: true,
      confirmButtonColor: "#0eb1d2",
      cancelButtonColor: "#ff7075",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then((res) => {
      if (res.isConfirmed) {
        onDelete(params.id);
        nav("/", { replace: true });
      };
    });
  };

  const onSubmit = (input) => {
    onUpdate(
      params.id,
      input.createdDate.getTime(),
      input.weatherId,
      input.content
    );
    Swal.fire({
      icon: "success",
      title: "수정 완료되었습니다!",
      showCancelButton: false,
      confirmButtonColor: "#0eb1d2",
      confirmButtonText: "확인",
    }).then((res) => {
      if (res.isConfirmed) {
        nav("/", { replace: true });
      };
    });
  };

  return (
    <div>
      <Header
        title={"일기 수정하기"}
        leftChild={
          <Button text={"뒤로 가기"} onClick={() => nav(-1)}
          />}
        rightChild={
          <Button
            text={"삭제하기"}
            type={"NEGATIVE"}
            onClick={onClickDelete}
          />}
      />
      <Editor initData={curDiaryItem} onSubmit={onSubmit} />
    </div>
  )
};

export default Edit;