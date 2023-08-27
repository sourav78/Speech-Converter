let voiceArea = document.getElementById("voice")
let speak = document.getElementById("speak")
let textArea = document.getElementById("txt-area")

let speakStop = document.getElementById("idplaypause")
let pauseresume = document.getElementById("idresume")

let startStop = 0
let pauseResume = 0

let voices
if("speechSynthesis" in window){
    speechSynthesis.onvoiceschanged = () => {
        voices = speechSynthesis.getVoices()
        voices.map(voice => {
            voiceArea.innerHTML += `<option>${voice.name}</option>`
        })

    }

    speak.addEventListener("click", (e) => {
        if(startStop % 2 == 0){
            let txtSp = new SpeechSynthesisUtterance()
            txtSp.text = textArea.value
            let selectedVoice = voiceArea.querySelector("option:checked").value
            let finalVoice = voices.filter(v => {
                return v.name ==selectedVoice
            })
            txtSp.voice = finalVoice[0]
            speechSynthesis.cancel();
            speechSynthesis.speak(txtSp)

            startStop++
            speakStop.setAttribute("src", "./assets/volume-mute.png")
            speak.style.borderColor = "#fd925c"
            
            txtSp.onend = () => {
                startStop++
                speakStop.setAttribute("src", "./assets/volume-up.png")
                speak.style.borderColor = "#fff"
            }
        }else{
            speechSynthesis.cancel()
            speechSynthesis.resume()
            pauseResume++
            startStop++
            speakStop.setAttribute("src", "./assets/volume-up.png")
            pauseresume.setAttribute("src", "./assets/pause.png")
            speak.style.borderColor = "#fff"
        }
        
    })

    document.getElementById("pause").addEventListener("click", (e) => {
        if(pauseResume % 2 == 0){
            speechSynthesis.pause()
            pauseResume++
            pauseresume.setAttribute("src", "./assets/play-button.png")
        }else{
            speechSynthesis.resume()
            pauseResume++
            pauseresume.setAttribute("src", "./assets/pause.png")
        }
    })

}else{
    alert("Your browser does not support this app")
}