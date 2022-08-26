import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
input,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
button,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 0.0521vw;
  font-family:inherit;
  vertical-align: baseline;
  box-sizing: border-box;
  text-decoration: none;
  text-align:left;
  list-style: none;
  line-height:1.1;
  color:#232323;
}
input,
button,
select {
  outline: none;
  border: none;
  caret-color:#6B63F6;
  
} /* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
button{
  cursor: pointer;
}
body {
  line-height: 1;
  font-family:Pretendard;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
img {
  max-width: 100%;
}
span {
  font: inherit;
}

.clearfix:before, .clearfix:after {
  display: block;
  content: '';
  line-height: 0;
}

.clearfix:after {
  clear:both;
}

.clearfix {
*zoom: 1;
}

body{
  background:#EFEFFB;
}
.inner{
  width: calc(100% - 272rem);
  padding:40px 60px;
  position:fixed;
  left:272rem;
}

.inner .btnCont{
  display: flex;
  justify-content: flex-end;
}

.inner .btnCont .kakaoLoginBtn{
  max-width: 180px;
  width: 180rem;
  padding: 17px 0 16px 0;
  background: #6B63F6;
  border-radius: 10px;
  color: #fff;
  text-align: center;
  line-height: 1;
  font-size: 16px;
  transition: all .2s;
}
.inner .btnCont .kakaoLoginBtn:hover{
  background:#8983ff;
}


.inner .btnCont .kakaoLogoutBtn{
  max-width: 180px;
  width: 180rem;
  padding: 17px 0 16px 0;
  background: #aaa;
  border-radius: 10px;
  color: #fff;
  text-align: center;
  line-height: 1;
  font-size: 16px;
}

.inner .btnCont .profile{
  display:flex;
  align-items: center;
  padding-right:41px;
}

.inner .btnCont .profile img{
  width:50rem;
  height: 50rem;
  margin-right:16px;
  border-radius:50px;
}

.inner .btnCont .profile span{
  font-size:20rem;
  font-weight:600;
}

.inner .tit{
  font-size:32rem;
  font-weight:bold;
  line-height:41rem;
  padding-bottom:40px;
}

.bold{
  font-weight:bold;
}

`;
