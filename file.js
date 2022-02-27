class FormValidation 
{
    formValues = {
        name: "",
        email: "",
        phonenumber: "",
        address: ""
    }
    errorValues = {
        nameErr: "",
        emailErr: "",
        phonenumberErr: "",
        addressErr: ""
    }
    showErrorMsg(index, msg) {
        const form_group = document.getElementsByClassName('form-group')[index]
        form_group.classList.add('error')
        form_group.getElementsByTagName('span')[0].textContent = msg
    }
    showSuccessMsg(index) {
        const form_group = document.getElementsByClassName('form-group')[index]
        form_group.classList.remove('error')
        form_group.classList.add('success')
    }
    getInputs() {
        this.formValues.name = document.getElementById('name').value.trim()
        this.formValues.email = document.getElementById('email').value.trim()
        this.formValues.phonenumber = document.getElementById('phonenumber').value.trim()
        this.formValues.types = document.getElementById('types').value.trim()
        this.formValues.address = document.getElementById('address').value.trim()
    }
    validatename() {
        if (this.formValues.name === "") {
            this.errorValues.nameErr = "* Name field is required"
            this.showErrorMsg(0, this.errorValues.nameErr)
        } else if (this.formValues.name.length <= 4) {
            this.errorValues.nameErr = "* name must be atleast 5 Characters"
            this.showErrorMsg(0, this.errorValues.nameErr)
        } else if (this.formValues.name.length > 14) {
            this.errorValues.nameErr = "* name should not exceeds 14 Characters"
            this.showErrorMsg(0, this.errorValues.nameErr)
        } else {
            this.errorValues.nameErr = ""
            this.showSuccessMsg(0)
        }
    }
    validateEmail() {
        //abc@gmail.co.in
        const regExp = /^([a-zA-Z0-9-_\.]+)@([a-zA-Z0-9]+)\.([a-zA-Z]{2,10})(\.[a-zA-Z]{2,8})?$/
        if (this.formValues.email === "") {
            this.errorValues.emailErr = "* Email field is required"
            this.showErrorMsg(1, this.errorValues.emailErr)
        } else if (!(regExp.test(this.formValues.email))) {
            this.errorValues.emailErr = "* Invalid Email"
            this.showErrorMsg(1, this.errorValues.emailErr)
        } else {
            this.errorValues.emailErr = ""
            this.showSuccessMsg(1)
        }
    }
    validatePhonenumber() {
        const phoneno = /^\d{10}$/
        if (this.formValues.phonenumber === "") {
            this.errorValues.phonenumberErr = "* Phone Number field is required"
            this.showErrorMsg(2, this.errorValues.phonenumberErr)
        } else if (phoneno.test(this.formValues.phonenumber)) {
            this.errorValues.phonenumberErr = ""
            this.showSuccessMsg(2)
        } else {
            this.errorValues.phonenumberErr = "* Invalid Phone Number"
            this.showErrorMsg(2, this.errorValues.phonenumberErr)
        }
    }
    validateAddress() {
        const regExp = /^([a-zA-Z-_\.]+)$/
        if (this.formValues.address === "") {
            this.errorValues.addressErr = "* Invalid address"
            this.showErrorMsg(4, this.errorValues.addressErr)
        }
        else {
            this.errorValues.addressErr = ""
            this.showSuccessMsg(4)
        }
    }
    alertMessage() {
        const { nameErr, emailErr, phonenumberErr, addressErr } = this.errorValues
        if (nameErr === "" && emailErr === "" && phonenumberErr === "" && addressErr === "") {
            swal("you have successfully registered", "ThankYou , " + this.formValues.name, "success").then(() => {
                console.log(this.formValues)
                this.removeInputs()
            })
        } else {
            swal("Give Valid Inputs", "Click ok to Continue", "error")
        }
    }

    removeInputs() {
        const form_groups = document.getElementsByClassName('form-group')
        Array.from(form_groups).forEach(element => {
            element.getElementsByTagName('input')[0].value = ""
            element.getElementsByTagName('span')[0].textContent = ""
            element.classList.remove('success')
        })
    }
}

const ValidateUserInputs = new FormValidation()

document.getElementsByClassName('form')[0].addEventListener('submit', event => {
    event.preventDefault()
    ValidateUserInputs.getInputs()
    ValidateUserInputs.validatename()
    ValidateUserInputs.validateEmail()
    ValidateUserInputs.validatePhonenumber()
    ValidateUserInputs.validateAddress()
    ValidateUserInputs.alertMessage()
})