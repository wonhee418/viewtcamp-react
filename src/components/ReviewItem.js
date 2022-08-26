import openBtn from './../assets/openBtn.svg'
import closeBtn from './../assets/closeBtn.svg'
import url from "./../shared/url";
import { useState, useRef } from 'react';

function ReviewItem({ data, review, setReview }) {
  const [reviewDetail, setReviewDetail] = useState(false)
  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => setIsEdit(!isEdit);
  const [localContent, setLocalContent] = useState(data.review);
  const reviewRef = useRef();

  function useReviewEdit() {

    if (localContent.length < 5) {
      alert('리뷰는 5글자 이상이여야합니다.')
      reviewRef.current.focus();
      return
    }
    const token = sessionStorage.getItem("Authorization");

    fetch(`${url.BASE_URL}/user-reviews/${data.id}`, {
      method: "PATCH",
      headers: {
        "Authorization": token,
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        ...review,
        review: localContent
      })
    })
    setReview(
      review.map((it) => it.id === data.id ? { ...it, review: localContent } : it)
    )
    toggleIsEdit();
  }

  const handleQuitEdit = () => {
    setIsEdit(false)
    setLocalContent(data.review)
  }


  return (
    <div className='reviewList'>
      <img src={closeBtn} alt="closeBtn" onClick={() => {
        setReviewDetail(!reviewDetail)
      }} />
      <div className="cotentBox">
        <p className="title">{data.title}</p>
        <p className="createdAt">{data.createdAt}</p>
      </div>
      {reviewDetail
        ? <div className="reviewDetailBox">
          {isEdit ?
            <textarea ref={reviewRef} value={localContent} onChange={(e) => {
              setLocalContent(e.target.value)
            }}></textarea>
            :
            <div className="detail">
              {data.review}
            </div>
          }
          {isEdit ?
            <div className="editBox rightAlign">
              <button className="cancelBtn" onClick={handleQuitEdit}>취소</button>
              <button className="saveBtn" onClick={useReviewEdit}>저장</button>
            </div>
            :
            <div className="editBox">
              <button className="deleteBtn">삭제</button>
              <button className="editBtn" onClick={toggleIsEdit}>수정</button>
            </div>
          }
        </div>
        :
        null}
    </div>
  )
}

export default ReviewItem