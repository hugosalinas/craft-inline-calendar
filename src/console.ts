/* ---------------------------------*/
/* ------------ CONSOLE ----------- */
/* ---------------------------------*/

export function showConsole() {
    let element = document.getElementById("consoleContent")
    let clearBtn = document.getElementById("consoleClear")
    element.style.display = "block"
    clearBtn.style.visibility = "visible"
    document.getElementById("console").style.minHeight = "50%"
    document.getElementById("console").classList.add("surfaceShadow")
  }
  
  export function hideConsole() {
    let element = document.getElementById("consoleContent")
    let clearBtn = document.getElementById("consoleClear")
    element.style.display = "none"
    clearBtn.style.visibility = "hidden"
    document.getElementById("console").style.minHeight = "0"
    document.getElementById("console").classList.remove("surfaceShadow")
  }
  
  export function clearConsole() {
    document.getElementById("consoleItems").innerHTML = ""
    document.getElementById("consoleItemCount").style.visibility = "hidden"
  }
  
  
  export function logInPageConsoleMessage(msg : string) {
    console.log("InPageConsole: " + msg)
    let newElement = document.createElement("div")
    newElement.className = "consoleContentItem"
    newElement.innerHTML = msg
    let consoleItemDiv = document.getElementById("consoleItems")
    let consoleMsgCountDiv = document.getElementById("consoleItemCount")
    consoleItemDiv.append(newElement)
    consoleMsgCountDiv.style.visibility = "visible"
    consoleMsgCountDiv.style.visibility = "visible"
    consoleMsgCountDiv.innerHTML = document.getElementById("consoleItems").childNodes.length.toString()
  }
  

  export const initConsole = ()=>{
    document.getElementById("openConsole").onclick = async () => {
        let element = document.getElementById("consoleContent")
        if (element.style.display == "none") {
          showConsole()
        } else {
          hideConsole()
        }
      }
      
      document.getElementById("openConsole").onclick = async () => {
        let element = document.getElementById("consoleContent")
        if (element.style.display == "none") {  showConsole();  } 
        else { hideConsole();}
      }
      
      document.getElementById("consoleClear").onclick = async () => {
        clearConsole()
      }
  }
  

  
  