import { ApiRequests } from "./api.js"
import { Modals } from "./modals.js"

class render{
    static arrCompaniesAll = []

    static async handleListCompanies (array) {
        const list = document.querySelector(".companies__list ")
        list.innerHTML = ""

        if (!array) {
            array = await ApiRequests.getAllCompanies()
            this.arrCompaniesAll = array
        }

        array.forEach((companie) => {
            const card = this.handleCardCompanies(companie)
            list.append(card)
        })
    }

    static handleCardCompanies(companie) {
        const {name, sectors: {description}} = companie

        const li = document.createElement("li")
        const pName = document.createElement("p")
        const pSector = document.createElement("p")
        const spanName = document.createElement("span")
        const spanSector = document.createElement("span")

        li.className = "companies__card"
        spanName.innerText = "Empresa: "
        spanSector.innerText = "Setor: "

        pName.append(spanName)
        pName.insertAdjacentText("beforeend", name)

        pSector.append(spanSector)
        pSector.insertAdjacentText("beforeend", description)

        li.append(pName, pSector)

        return li
    }

    static async handleSelectList() {

        const select = document.getElementById("selectListSector")
        const arrCompanies = await ApiRequests.getAllCompanies()
        arrCompanies.forEach((companie) => {

            const { sectors: { description }} = companie
            const arrOptions = Array.from(document.querySelectorAll("#selectListSector option"))
            const existUuid = arrOptions.some((op) => op.value == description)

            if (!existUuid) {
                const option = document.createElement("option")
                option.value = description
                option.innerText = description
                select.append(option)
            }
        })
    }

    static handleSelectEvent () {
        const select = document.getElementById("selectListSector")

        select.addEventListener("change", async () => {
            const value = select.value

            if (value != "all") {
                const arraySearch = await ApiRequests.getCompaniesSector(value)
                this.handleListCompanies(arraySearch)
            } else {
                const arrCompanies = await ApiRequests.getAllCompanies()
                this.handleListCompanies(arrCompanies)
            }
        })
    }

    static handleButtonLoginHeader () {
        const buttonLogin = document.getElementById("loginbtn")
        buttonLogin.addEventListener("click", () => {
            Modals.handleFormLogin()
            this.handleLogin()
        })
    }

    static handleLogin () {
        const button = document.querySelector("#buttonLoginForm")
        button.addEventListener("click", async () => {
            const email = document.getElementById("inputEmail").value
            const password = document.getElementById("inputPassword").value

                const user = {
                    email: email,
                    password: password
                }
                ApiRequests.login(user)
        })
    }

    static handleButtonRegisterHeader () {
        const buttonRegister = document.getElementById("registerbtn")
        buttonRegister.addEventListener("click", () => {
            Modals.handleFormRegister()
            this.handleRegister()
        })
    }

    static handleRegister () {
        const button = document.getElementById("buttonRegisterForm")
        button.addEventListener("click", () => {
            const password = document.getElementById("inputPassword").value
            const email = document.getElementById("inputEmail").value
            const professional_level = document.querySelector(".modal__form select").value.toLowerCase()
            const username = document.getElementById("inputName").value

               
                const user = { 
                    password: password,
                    email: email,
                    professional_level: professional_level,
                    username: username
                }

                ApiRequests.register(user)
            
        })
    }

}

render.handleButtonLoginHeader()
render.handleButtonRegisterHeader()
render.handleListCompanies()
render.handleSelectEvent()
render.handleSelectList()