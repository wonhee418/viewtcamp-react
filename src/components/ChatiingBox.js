import { useEffect, useState } from "react"
import MyChatting from "./../components/MyChatting"
import OtherChatting from "./../components/OtherChatting"
import jwtDecode from "jwt-decode";


import {useRef} from "react"

function ChattingBox({ chatData,chatRef}) {
    const token = sessionStorage.getItem("Authorization");

    const [chat, setChat] = useState(chatData)
    const userName = jwtDecode(token).USER_NAME;
    const userProfile = jwtDecode(token).PROFILE_IMG;

    useEffect(() => {
        setChat([...chat, chatData])
    }, [chatData])


    if (chatData.length > 0) {

        return (
            <>
                {chat.map((a, i) => {
                    if (a.length > 0) {
                        return (
                            <>
                                {
                                    a[0].sender === userName
                                        ?
                                        <MyChatting data={a} key={i} />
                                        :
                                        <OtherChatting data={a} key={i} />
                                }
                            </>
                        )
                    }
                })}
                <div ref={chatRef}/>
            </>
        )
    }
    else {
        return (
            <></>
        )
    }


}
export default ChattingBox