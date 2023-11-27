const buttons = document.querySelectorAll('.buttons button')
let inputEl = document.querySelector('input')
const output = document.querySelector('#output')
const fahrenheit_button = document.querySelector(".fahernheit")
const celsius_button = document.querySelector(".celsius")
const historyContainer = document.querySelector('.historyContainer')

const STORAGE_NAME = 'historyStorage';

if (localStorage.getItem(STORAGE_NAME) == null) {
    localStorage.setItem(STORAGE_NAME, JSON.stringify([]))
}

refreshHistory()

for (let button of buttons) {
    const symbol = button.innerHTML

    button.addEventListener('pointerdown', () => {

        if (symbol == '=') {

            const historyElements = JSON.parse(localStorage.getItem(STORAGE_NAME))
            if (!historyElements.includes(inputEl.value)) {
                historyElements.push(inputEl.value)
            }
            localStorage.setItem(STORAGE_NAME, JSON.stringify(historyElements))
        
            inputEl.value = output.value
            refreshHistory()
        }
        else if (symbol == 'DEL') {
            inputEl.value = inputEl.value.slice(0, inputEl.value.length - 1)
        } 
        else if (symbol == 'CLEAR') {
            inputEl.value = ''
        }
        // else if(symbol=="F"){
        //    output.value = (inputEl.value - 32) / 1.8
        //     console.log(output.value)
        //     //fahernheit()
        // }
        

        else {
            if(symbol != 'F' && symbol != "C" && symbol != "%")
            inputEl.value += symbol;
        }
        registrateChange()
    })

    
}

inputEl.addEventListener('input', registrateChange)
// inputEl.addEventListener('input', fahernheit)

function registrateChange() {
    

    let newValue = eval(inputEl.value) || '';
    output.value = newValue

    console.log(newValue)

    if ( newValue == Infinity){
        output.value = "Can't divide by 0";
    } 

    if (newValue == 0 + 0 ){
        output.value = 0
        window.location.reload()
        // inputEl.value = "";
    }     
}


function fahernheit (){
    let fvalue = (inputEl.value * 1.8) + 32
    output.value = fvalue
    console.log(output.value)
}

function celsius(){
    let fvalue = (inputEl.value - 32 ) / 1.8
    output.value = fvalue
    console.log(output.value)
}

function percentage(){
    let fvalue = inputEl.value / 100
    output.value = fvalue
    console.log(output.value)

}

function ClearHistory(){
    window.location.reload()
    localStorage.clear()
}


function refreshHistory() {
    historyContainer.innerHTML = ''

    let historyElements = JSON.parse(localStorage.getItem(STORAGE_NAME))

    for (let i = historyElements.length - 1; i >= 0; i--) {

        const div = document.createElement('div')
        div.className = 'historyItem'

        let evaluated = ''

        try {
            evaluated = eval(historyElements[i])
        
            
        } catch (error) {
            evaluated = 'INVALID RESULT'
        }

        div.innerHTML = `
            <div>${truncate(historyElements[i], 14)}</div>
            <div>${truncate(evaluated, 14)}</div>
        `
        
        historyContainer.appendChild(div)

        div.addEventListener('pointerdown', () => {
            inputEl.value = historyElements[i];
            registrateChange()
        })

    }

    

    // function onDeleteAll() {
    //     console.log("Deleted all history");
    //   }
      
    //   function deleteAllHistory() {
    //     let deletingAll = browser.history.deleteAll();
    //     deletingAll.then(onDeleteAll);
    //   }
      
    //   deleteAllHistory();
}

function truncate(string, max) {
    string = String(string)
    if (string.length > max) {
        return string.substring(0, max - 3) + '...'
    } else {
        return string
    }
}

function deleteAllHistory(){

        localStorage.clear()

        window.location.reload()

    }
