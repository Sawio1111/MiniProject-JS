window.onload = () => {
    calculator.start()
}

let calculator = {
    buttons: undefined,
    input: undefined,

    start: function() {
        this.buttons = document.querySelectorAll(".numbers button, .operators button");
        this.input = document.getElementById("input");

        for (let i=0; i<this.buttons.length; i++) {
            let element = this.buttons[i];
            element.addEventListener("click", this.buttonUse);
        }
    },
    buttonUse: function (e) {
        let divHTMLtext = e.target.innerHTML

        switch (divHTMLtext) {
            case "=":
                calculator.evaluate();
                break;
            case "c":
                calculator.clear();
                break;
            default:
                calculator.addInput(divHTMLtext)
                break;
        }
        },
    addInput: function (NumOrOpe) {
        calculator.input.value += NumOrOpe;
        },
    evaluate: function () {
        try {
            calculator.input.value = math.evaluate(calculator.input.value);
        } catch (e) {
            calculator.input.value = "";
        }
        if (calculator.input.value === "undefined") {
            calculator.input.value = "";
        }
        },
    clear: function () {
        calculator.input.value = "";
     },
};