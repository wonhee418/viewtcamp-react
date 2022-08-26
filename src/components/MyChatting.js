

function MyChatting({ data }) {
  return (
    <>
      {data.length > 0
        ?
        <div className='mychat'>
          <div className='flexBox'>
            <div className='sender'>{data[0].sender}</div>
            <div className='message'>{data[0].message}</div>
          </div>
          <div className='profile'><img src={data[0].profileImg} alt="profileImg" /></div>
        </div>
        :
        null
      }
    </>
  )

}

export default MyChatting