import url from "../shared/url";
import deleteIcon from './../assets/deleteBtnIcon.svg'

function QuestionItem({ question, setQuestion, data, i }) {

  function useQuestionDelete() {
    const token = sessionStorage.getItem("Authorization");
    fetch(`${url.BASE_URL}/user-questions/${data.id}`, {
      method: "DELETE",
      headers: {
        "Authorization": token,
      }
    })
    const newQuestion = question.filter((it) => it.id !== data.id)
    setQuestion(newQuestion)
  }

  return (
    <div className='list'>
      <img src={deleteIcon} alt="deleteBtn" onClick={useQuestionDelete} />
      <span>Q{i + 1}. {data.question}</span>
    </div>
  )
}

export default QuestionItem