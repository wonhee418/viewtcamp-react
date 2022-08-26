function TypeBox({
  company,
  career,
  interview,
  handleActiveCompany,
  handleActiveCareer,
  handleActiveInterview,
}) {
  const companyArry = [
    "공기업",
    "사기업",
    "공무원",
    "외국계",
    "금융권",
    "기타",
  ];

  const careerArry = ["신입", "경력"];

  const interviewArry = [
    "일대일 면접",
    "일대다 면접",
    "그룹 면접",
    "PT",
    "1분 자기소개",
  ];

  return (
    <div className="typeBox">
      {/* 기업 분류 */}
      <p className="tag">기업분류</p>
      {companyArry.map((a, i) => {
        return (
          <>
            {company === a ? (
              <>
                <input
                  type="radio"
                  id={a}
                  className="active"
                  name="company"
                  value={a}
                  onClick={(e) => {
                    handleActiveCompany(e.target.value);
                  }}
                />
                <label htmlFor={a}>{a}</label>
              </>
            ) : (
              <>
                <input
                  type="radio"
                  id={a}
                  name="company"
                  value={a}
                  onClick={(e) => {
                    handleActiveCompany(e.target.value);
                  }}
                />
                <label htmlFor={a}>{a}</label>
              </>
            )}
          </>
        );
      })}

      {/* 신입 / 경력 */}
      <div className="setCareer">
        <p className="tag">신입/경력</p>
        {careerArry.map((a, i) => {
          return (
            <>
              {career === a ? (
                <>
                  <input
                    type="radio"
                    id={a}
                    name="career"
                    className="active"
                    value={a}
                    onClick={(e) => {
                      handleActiveCareer(e.target.value);
                    }}
                  />
                  <label htmlFor={a}>{a}</label>
                </>
              ) : (
                <>
                  <input
                    type="radio"
                    id={a}
                    name="career"
                    value={a}
                    onClick={(e) => {
                      handleActiveCareer(e.target.value);
                    }}
                  />
                  <label htmlFor={a}>{a}</label>
                </>
              )}
            </>
          );
        })}
      </div>

      {/* 면접 유형 */}
      <div className="setInterviewType">
        <p className="tag">면접 유형</p>
        {interviewArry.map((a, i) => {
          return (
            <>
              {interview === a ? (
                <>
                  <input
                    type="radio"
                    id={a}
                    name="interview"
                    className="active"
                    value={a}
                    onClick={(e) => {
                      handleActiveInterview(e.target.value);
                    }}
                  />
                  <label htmlFor={a}>{a}</label>
                </>
              ) : (
                <>
                  <input
                    type="radio"
                    id={a}
                    name="interview"
                    value={a}
                    onClick={(e) => {
                      handleActiveInterview(e.target.value);
                    }}
                  />
                  <label htmlFor={a}>{a}</label>
                </>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
}
export default TypeBox;
