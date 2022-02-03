const calculatorForm = document.forms["calculator"]
const tipButtons = calculatorForm["discount"]
const customDiscount = document.getElementById("custom-discount")
const billingAmountInput = calculatorForm["billing-amount"]
const numPeopleInput = calculatorForm["people-count"]
const resetButton = document.getElementById("reset-button");

const price_tip = document.getElementById("tip-pricing");
const price_total = document.getElementById("total");

let cancelled = false;
let timerDelay
let notSet = true

function mainReset () {
    resetCustom()
    resetZero(billingAmountInput)
    resetZero(numPeopleInput)
    tipButtons.forEach(e => {
        if(e.checked){
            e.checked = false
        }
    })
    price_tip.innerHTML = "0.00"
    price_total.innerHTML = "0.00"
}

function customDiscountValidator () {
    const customDiscount = document.getElementById("custom-discount").value
    if(customDiscount.length == 0 || /[^0-9]/gi.test(customDiscount)){
        return true
    }
    return false
}

function resetCustom () {
    customDiscount.value = "Custom"
}

function resetZero (e) {
    e.value = "0"
}

[billingAmountInput, numPeopleInput].forEach(e => {
    e.addEventListener("focusout", () => {
        if(e.value == ""){
            resetZero(e)
        }
    })
})

function renderResult () {
    const bill = Number(calculatorForm["billing-amount"].value);
    const selectedTip = customDiscountValidator() ? Number(tipButtons.value) : Number(document.getElementById("custom-discount").value);
    const numPeople = Number(document.getElementById("people-count").value);
    const tipAmount = bill / numPeople
    const tipTotal = tipAmount * (selectedTip / 100);
    isFinite(tipAmount) ? price_tip.innerHTML = tipTotal.toFixed(2) : null
    isFinite(tipAmount) ? price_total.innerHTML = (tipTotal + tipAmount).toFixed(2) : null
}

[calculatorForm, customDiscount].forEach(e => {
    if(e == customDiscount){
        e.addEventListener("click", () => {
            if(notSet){
                customDiscount.style.textAlign = "right"
                customDiscount.style.paddingRight = "10px"
                notSet = false
            }
            tipButtons.forEach(e => {
                if(e.checked){
                    e.checked = false
                }
            })
            customDiscount.value = "";
        })

        e.addEventListener("focusout", () => {
            if(customDiscount.value == ""){
                resetCustom();
            }
        })
    }

    e.addEventListener("keydown", () => {
        clearTimeout(timerDelay);
    })
    
    e.addEventListener("keyup", () => {
        clearTimeout(timerDelay);
        timerDelay = setTimeout(() => {renderResult()}, 500)
    })
})

tipButtons.forEach(e => {
    e.addEventListener("click", renderResult);
    e.addEventListener("click", resetCustom);
})

resetButton.addEventListener("click", () => {
    mainReset()
})