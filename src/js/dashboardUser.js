import { ApiRequests } from "./api.js"
import { Modals } from "./modals.js"


class Dashboard {

    static handleLogout() {
        const buttonLogout = document.getElementById("logoutBtn")
        buttonLogout.addEventListener("click", () => {
            window.location.replace("../../../../index.html")
            localStorage.removeItem("@kenzieEmpresas:token")
            localStorage.removeItem("@kenzieEmpresas:uuid")
            localStorage.removeItem("@kenzieEmpresas:is_admin")
        })
    }

    static async handleRenderCompanie() {
        const demartament = await ApiRequests.getUserPeopleDepartament()
        const company_uuid = demartament[0].company_uuid

        const arrCompanies = await ApiRequests.getAllCompanies()
        const companie = arrCompanies.find(({ uuid }) => uuid == company_uuid)

        const { name, opening_hours, description: descriptionCompanie, sectors: { description: descriptionSector } } = companie

        const content = document.querySelector(".companie__content")

        content.insertAdjacentHTML("beforeend", `

            <p><span>Nome: </span>${name}</p>
                <p"><span >Horário de Abertura: </span>${opening_hours}</p>
                <p"><span >Ramo: </span>${descriptionCompanie}</p>
            <p><span >Descrição: </span>${descriptionSector}</p>  
        `)
    }

    static async handleRenderDepartament() {
        const departament = await ApiRequests.getUserDepartaments()
        const { name, description } = departament

        const content = document.querySelector(".departament__content")

        content.insertAdjacentHTML("beforeend", `
            <p><span>Nome: </span>${name}</p>
            <p><span>Descrição: </span>${description}</p>
        `)
    }

    static async handleListPeopleDepartament() {
        const content = document.querySelector(".list__people-departaments")
        const arrPeopleDepartament = await ApiRequests.getUserPeopleDepartament()


        arrPeopleDepartament[0].users.forEach((people) => {
            const { username, professional_level, kind_of_work } = people

            content.insertAdjacentHTML("beforeend", `
                <li class="list-slide__card">
                    <p>>Nome: </span>${username}</p>
                    <p>>Nível: </span>${professional_level}</p>
                    <p>>modalidade: </span>${kind_of_work}</p>
                </li>
            `)
        })

    }


    static async handleListDepartamentes() {
        const content = document.querySelector(".list__companie-departaments")
        const companie = await ApiRequests.getUserDepartaments()

        companie.departments.forEach((departament) => {
            const { name, description } = departament

            content.insertAdjacentHTML("beforeend", `
            <li class="list-slide__card">
                <p>>Nome: </span>${name}</p>
                <p>>Descrição: </span>${description}</p>
            </li>
            `)
        })

    }


    static async handleeditInfouser() {
        const buttonEditUser = document.getElementById("edit")
        buttonEditUser.addEventListener("click", () => {
            Modals.handleFormEditUser()

            setTimeout(() => {
                const buttonEditForm = document.getElementById("buttonEditForm")
                buttonEditForm.addEventListener("click", async () => {
                    const username = document.getElementById("inputUsername").value
                    const email = document.getElementById("inputEmail").value
                    const passowrd = document.getElementById("inputPassword").value

                    if (username || email || passowrd != "") {
                        const newData = {}

                        const data = {
                            username: username,
                            email: email,
                            passowrd: passowrd
                        }

                        for (let key in data) {
                            if (data[key] != "") {
                                newData[key] = data[key]
                            }
                        }
                        ApiRequests.userUpdate(newData)
                    }
                })
            }, 500)
        })
    }

}


Dashboard.handleRenderCompanie()
Dashboard.handleRenderDepartament()
Dashboard.handleListPeopleDepartament()
Dashboard.handleListDepartamentes()
Dashboard.handleeditInfouser()
Dashboard.handleLogout()