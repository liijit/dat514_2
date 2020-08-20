import { createGlobalStyle } from 'styled-components';

interface Global {
  theme:{ mobile: string; }; open?: boolean;
}

//create global css properties
export const GlobalStyles = createGlobalStyle<Global>`
/*<--- OVERRIDES --->*/

html,
body {
    margin: 0 !important;
    padding: 0 !important;
}

.root {
    width: 100vw;
    height: 100vh;
    z-index: -100;
}

*,
*::after,
*::before {
    box-sizing: border-box;
}

body {
    height: 100vh;
    align-items: center;
    color: unset;
    font-family: Arial, "Segoe UI", Helvetica, sans-serif;
    justify-content: center;
    text-rendering: optimizeLegibility;
}

form,
label,
blockquote,
dd,
dt,
dl,
figure,
form,
ol,
p,
pre,
table,
ul,
li {
    margin: 0;
    padding: 0;
}

button {
    margin-bottom: 0;
}

/* <--- FLEXY ---> */

.isFlexColumn {
    display: flex;
    flex-direction: column;
}

/* <--- GENERIC ---> */

.labelcont {
    display: flex;
    padding-top: 20px;
    justify-content: space-between;
    padding: 0;
}

.label {
    width: auto;
    padding: 6.5px;
}

.labelres {
    width: auto;
    text-align: right;
    font-size: 14px;

}

.labelres p {
    border: 2px solid red;
    border-radius: 4px;
    padding: 2.5px;
    padding-color: red;
    background: red;
    color: white;
}

.label p {
    color: grey;
    font-size: 1.5rem;
}

.menucontainer {
    display: flex;
    width: 100%;
    height: 100vh;
    overflow-y: hidden;
}

.container {
    height: inherit;
    width: inherit;
    padding: unset;
}

.topPadding{
    padding: 10rem 0 0.5rem 0rem;
}

.dashContainer {
    margin: auto;
    height: inherit;
    display: flex;
    width: 80%;
    padding: 0rem 0 0.5rem 0rem;
}

.dashBack {
    display: inherit;
    height: inherit;
    margin: auto;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    padding: 10rem 0 0rem 0rem;
}

.listCont {}

.nopad {
    padding: 0;
}

.flexy {
    justify-content: center;
    align-items: center;
    display: flex;
    width: inherit;
    height: inherit;
}

.flexy2 {
    justify-content: space-between;
    align-items: center;
    display: flex;
    height: inherit;
}

.flexy3 {
    justify-content: center;
    align-items: center;
    display: flex;
    height: inherit;
}

.menu {
    padding: 50px 50px;
    width: 400px;
    min-width: 350px;
    border-color: black;
    border-radius: 20px;
    border-width: 0.4rem;
    border-style: solid;
}

.grid p {
    color: black;
    font-style: bold;
    font-size: 2.5rem;
}

.logo-c {
    display: flex;
    height: 100px;
    justify-content: center;
    align-items: center;
}

.logo {
    height: 90%;
    display: flex;
}

.buttonW {
    width: 100%;
    background-color: #9b4dca;
    border: 0.1rem solid #9b4dca;
    border-radius: .4rem;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    font-size: 1.1rem;
    font-weight: 700;
    height: 3.8rem;
    letter-spacing: .1rem;
    line-height: 3.8rem;
    padding: 0 3.0rem;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    white-space: nowrap;
}

.buttonW:hover {
    background-color: grey;
    color: #fff;
}

.b1 {}

.b2 {
    margin-top: 40px;
}

.buttonCont {
    width: 40%;
}

.plantList {
    padding-top: 2rem;
}

.plantList ul {
    list-style-type: none;
}

.plants {
    flex-direction: row-reverse;
    text-align: center;
}

.plants p {
    justify-content: center;
    color: black;
    font-style: bold;
    font-size: 2.5rem;
}

.buttonMod{
    display: flex;
    flex-direction: row;
}

.buttonMod .text{
    padding-left: 1rem;
}

@media (max-width: ${({ theme }) => theme.mobile}) {
    .menu {
    padding: 50px 50px;
    width: 400px;
    min-width: 350px;
    border-color: black;
    border-radius: unset;
    border-width: unset;
    border-style: unset;
}
}
  `