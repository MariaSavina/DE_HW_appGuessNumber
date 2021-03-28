let questionDisp = document.createElement('div')
questionDisp.classList.add('content__element')
questionDisp.innerHTML="Let's play?"

let buttonYes=document.createElement('button')
buttonYes.classList.add('content__button')
let buttonNo=document.createElement('button')
buttonNo.classList.add('content__button')
buttonYes.innerHTML='yes'
buttonNo.innerHTML='no'

let content=document.querySelector('.content')

content.appendChild(questionDisp)
content.appendChild(buttonYes)
content.appendChild(buttonNo)

let intervalSettingsDisplay = document.createElement('div')
intervalSettingsDisplay.classList.add('content__element')
intervalSettingsDisplay.innerHTML="Enter a range of positive integers from 1 to 100 and the number of attempts (1-15)"


let minInp=document.createElement('input')
minInp.classList.add('content__element')
minInp.setAttribute('type','number')
minInp.setAttribute('value','1')
let minInpMes=document.createElement('span')
minInpMes.classList.add('content__element')
let maxInp=document.createElement('input')
maxInp.classList.add('content__element')
maxInp.setAttribute('type','number')
maxInp.setAttribute('value','100')
let maxInpMes=document.createElement('span')
maxInpMes.classList.add('content__element')
let attInp = document.createElement('input')
attInp.classList.add('content__element')
attInp.setAttribute('type','number')
attInp.setAttribute('value','5')
let attInpMes=document.createElement('span')
attInpMes.classList.add('content__element')


let buttonGo=document.createElement('button')
buttonGo.classList.add('content__element')
buttonGo.innerHTML='go'

let playerMessage=document.createElement('span')
playerMessage.classList.add('content__element')

let playerNum=document.createElement('input')
playerNum.classList.add('content__element')
playerNum.setAttribute('type','number')

let buttonTry=document.createElement('button')
buttonTry.classList.add('content__element')
buttonTry.innerHTML='try'

let result=document.createElement('div')
result.classList.add('content__element')

buttonNo.onclick=()=>{questionDisp.innerHTML="Changed your mind?"}
buttonYes.onclick=()=>{

    questionDisp.remove();
    buttonYes.remove();
    buttonNo.remove();
    content.appendChild(intervalSettingsDisplay)
    minInpMes.innerHTML='min'
    content.appendChild(minInpMes)
    content.appendChild(minInp)
    maxInpMes.innerHTML='max'
    content.appendChild(maxInpMes)
    content.appendChild(maxInp)
    attInpMes.innerHTML='attend'
    content.appendChild(attInpMes)
    content.appendChild(attInp)
    content.appendChild(buttonGo)

}    

buttonGo.onclick=()=>{

    let verifiedMin = verifideData(+minInp.value, 100)
    let verifiedMax = verifideData(+maxInp.value, 100)
    let verifiedAtt = verifideData(+attInp.value, 15)

    minInp.remove()
    minInpMes.remove()
    maxInp.remove()
    maxInpMes.remove()
    attInp.remove()
    attInpMes.remove()
    intervalSettingsDisplay.remove()
    buttonGo.remove()

    let generateNumber=createGenerateNumber(verifiedMin,verifiedMax)

    console.log(generateNumber)

    playerMessage.innerHTML=`Hi, I figured a number from ${verifiedMin} till ${verifiedMax} from your range. Try to guess it in ${verifiedAtt} attempts!`
    content.appendChild(playerMessage)
    content.appendChild(playerNum)
    content.appendChild(buttonTry)

    buttonTry.onclick=()=>{
         
        if(result.innerHTML=="You won"){
            result.innerHTML="You won"
        }
        else if(result.innerHTML=="you loose"){
            result.innerHTML=="you loose"
        }
        else{
            verifiedAtt--
            result.innerHTML=checkNumbers(generateNumber,+playerNum.value,verifiedAtt)
        }
      
        content.appendChild(result)
    }
}


document.querySelector('.header-item__reset').onclick = function() {
    location.reload(); // перезагружаем страницу
  }


function verifideData(data,max){
    data = Math.floor(data)
    let res=0

    if(data<1){
        res=1
    }
    else if(data>max){
        res=max
    }
    else{
        res=data
    }
    return res
}

function createGenerateNumber(min,max){
    let res=0
    if(min<max){
        res = Math.floor(Math.random() * (max - min + 1)) + min
    }
    else{
        res = Math.floor(Math.random() * (min - max + 1)) + max
    }
    return res
}

function checkNumbers(progNum,yourNum,attend){
    let res = ''

    if(attend>=0){
         if(progNum===yourNum){
            res='You won'
        }
        else {
            let a
            let b
            let controlNum
            progNum>yourNum?(a=progNum, b=yourNum):(a=yourNum,b=progNum)
            controlNum=a-b
            if(controlNum<20 && controlNum>10){
                res=`Not so cold. Try again. You have left ${attend} attends`
            }
            else if(controlNum<10 && controlNum>3){
                res=`Warm. Try again. You have left ${attend} attends`
            }
            else if(controlNum<3){
                res=`So hot. Try again. You have left ${attend} attends`
            }
            else{
                res=`So cold. Try again. You have left ${attend} attends`
            }
        }
    }
    else res='you loose'
       
    return res
}