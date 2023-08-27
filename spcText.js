let startBtn = document.getElementById("start")

let textArea = document.getElementById("txt-area")
let micOnOff = document.getElementById("mic-onOff")

let sr = window.webkitSpeechRecognition || window.SpeechRecognition
let spRec = new sr()
spRec.continuous = true
spRec.interimResults = true
// spRec.lang = "hi"
let count = 2
spRec.start()
setTimeout(function(){
    spRec.stop()
}, 1000)
startBtn.addEventListener("click", () => {
    if(count % 2 == 0){
        spRec.start()
        count++
        micOnOff.setAttribute("src", "./assets/voice.png")
        startBtn.style.borderColor = "#29eb07"
        
    }else{
        spRec.stop()
        count++
        micOnOff.setAttribute("src", "./assets/mic.png")
        startBtn.style.borderColor = "#fff"
    }
})

spRec.onresult = res => {
    let text = Array.from(res.results).map(r => r[0]).map(ar => ar.transcript).join("")
    textArea.value = text
}