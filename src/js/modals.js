import { ApiRequests } from "./api.js"

export class Modals {

    static body = document.body

    static handleRemoveModal() {
        const modal = document.querySelector(".modal__container")
        if (modal) {
            modal.remove()
        }
    }

    static handleFormBasic(titleForm) {
        const form = document.createElement("form")
        const title = document.createElement("h2")
        const spanButtonClose = document.createElement("span")

        form.className = "modal modal__form"
        title.className = "title-1"
        spanButtonClose.className = "modal__button-close"

        title.innerHTML = titleForm
        spanButtonClose.innerText = "X"

        form.addEventListener("submit", (event) => {
            event.preventDefault()
        })

        spanButtonClose.addEventListener("click", () => {
            form.classList.add("modal__animate--close")

            setTimeout(() => {
                this.handleRemoveModal()
            }, 700)
        })

        form.append(spanButtonClose, title)
        return form
    }

    static handleAppendForm(form) {
        this.handleRemoveModal()

        const modalContainer = document.createElement("section")
        modalContainer.className = "modal__container"
        modalContainer.append(form)
        this.body.append(modalContainer)
    }

    static handleFormLogin() {
        const form = this.handleFormBasic("Login")

        const inputEmail = document.createElement("input")
        const inputPassword = document.createElement("input")
        const button = document.createElement("button")

        inputEmail.className = "inputs"
        inputPassword.className = "inputs"
        button.className = "button-default button-primary"

        inputEmail.type = "email"
        inputEmail.name = "email"
        inputEmail.id = "inputEmail"
        inputEmail.placeholder = "Seu e-mail"
        inputEmail.required = true

        inputPassword.type = "password"
        inputPassword.name = "passowrd"
        inputPassword.id = "inputPassword"
        inputPassword.placeholder = "Sua senha"
        inputPassword.required = true

        button.innerText = "Login"
        button.id = "buttonLoginForm"


        form.append(inputEmail, inputPassword, button)
        this.handleAppendForm(form)
    }


    static handleFormRegister() {
        const form = this.handleFormBasic("Cadastro")

        const inputEmail = document.createElement("input")
        const inputPassword = document.createElement("input")
        const inputName = document.createElement("input")
        const select = document.createElement("select")
        const button = document.createElement("button")



        const arrProfessionalLevel = ["Estágio", "Júnior", "Pleno", "Sênior"]
        const option = document.createElement("option")
        option.innerText = "Selecionar nível"
        option.disabled = true
        option.selected = true
        select.append(option)

        arrProfessionalLevel.forEach((level) => {
            const option = document.createElement("option")
            option.value = level
            option.innerText = level
            select.append(option)
        })

        button.className = "button-default button-primary"
        inputEmail.className = "inputs"
        inputPassword.className = "inputs"
        inputName.className = "inputs"
        select.className = "selects"


        inputEmail.type = 'email'
        inputEmail.name = "email"
        inputEmail.id = "inputEmail"
        inputEmail.placeholder = "Seu email"
        inputEmail.required = true

        inputPassword.type = "password"
        inputPassword.name = "password"
        inputPassword.id = "inputPassword"
        inputPassword.placeholder = "Sua senha"
        inputPassword.required = true

        inputName.type = "text"
        inputName.name = "name"
        inputName.id = "inputName"
        inputName.placeholder = "Seu nome"
        inputName.required = true

        button.innerText = "Cadastro"
        button.id = "buttonRegisterForm"

        form.append(inputName, inputEmail, inputPassword, select, button)
        this.handleAppendForm(form)
    }

    static async handleFormCreateCompany() {
        const form = this.handleFormBasic("Criar Empresa")

        const inputName = document.createElement("input")
        const inputDescription = document.createElement("input")
        const inputHours = document.createElement("input")
        const select = document.createElement("select")
        const button = document.createElement("button")


        button.className = "button-default button-primary"
        inputName.className = "inputs"
        inputDescription.className = "inputs"
        inputHours.className = "inputs"
        select.className = "selects"
        select.id = "selectSectorForm"
        button.className = "button-default button-primary"
        button.id = "buttonCreateCompanyForm"

        inputName.type = "text"
        inputName.name = "name"
        inputName.id = "inputName"
        inputName.placeholder = "Nome da empresa"
        inputName.required = true

        inputDescription.type = "text"
        inputDescription.name = "description"
        inputDescription.id = "inputDescription"
        inputDescription.placeholder = "Descrção da empresa"
        inputDescription.required = true

        inputHours.type = "time"
        inputHours.name = "hours"
        inputHours.id = "inputHours"
        inputHours.value = "12:00"
        inputHours.required = true


        button.innerText = "Cadastrar Empresa"



        const arrSectorsAll = await ApiRequests.getAllSectores()

        const option = document.createElement("option")

        option.innerText = "Selecionar setor da empresa"
        option.selected = true
        option.disabled = true
        select.append(option)

        arrSectorsAll.forEach((sector) => {
            const { uuid, description } = sector
            const option = document.createElement("option")
            option.value = uuid
            option.innerText = description
            select.append(option)
        })

        form.append(inputName, inputDescription, inputHours, select, button)
        this.handleAppendForm(form)
    }


    static async handleFormCreateDepartament() {
        const form = this.handleFormBasic("Criar Departamento")

        const inputName = document.createElement("input")
        const inputDescription = document.createElement("input")
        const select = document.createElement("select")
        const optionDefault = document.createElement("option")
        const button = document.createElement("button")


        inputName.className = "inputs"
        inputName.type = "text"
        inputName.id = "inputName"
        inputName.name = "name"
        inputName.placeholder = "Nome do departamento"
        inputName.required = true

        inputDescription.className = "inputs"
        inputDescription.type = "text"
        inputDescription.id = "inputDescription"
        inputDescription.name = "description"
        inputDescription.placeholder = "Descrição do departamento"
        inputDescription.required = true

        select.className = "selects"
        select.id = "selectCompanieForm"

        optionDefault.innerText = "Selecione um compania"
        optionDefault.selected = true
        optionDefault.disabled = true
        select.append(optionDefault)


        button.className = "button-default button-primary"
        button.innerText = "Criar Departamento"
        button.id = "buttonCreateDepartamentForm"

        const arrCompanies = await ApiRequests.getAllCompanies()
        arrCompanies.forEach((companie) => {
            const { name, uuid } = companie
            const option = document.createElement("option")

            option.value = uuid
            option.innerText = name

            select.append(option)
        })

        form.append(inputName, inputDescription, select, button)
        this.handleAppendForm(form)
    }

    static async listCompanie() {
        const arrCompanies = await ApiRequests.getAllCompanies()

        const form = this.handleFormBasic("Selecione uma Empresa")
        const select = document.createElement("select")
        const buttonList = document.createElement("button")

        select.className = "selects"
        select.id = "selectListDepartamentForm"
        const optionDefault = document.createElement("option")
        optionDefault.innerText = "Selecionar"
        optionDefault.selected = true
        optionDefault.disabled = true
        buttonList.className = "button-default button-primary"
        buttonList.id = "buttonListDepartamentCompanieForm"
        buttonList.innerText = "Listar Departamentos"

        select.append(optionDefault)

        arrCompanies.forEach((companie) => {
            const { name, uuid } = companie

            const option = document.createElement("option")

            option.value = uuid
            option.innerText = name

            select.append(option)
        })

        form.append(select, buttonList)
        this.handleAppendForm(form)
    }

    static ediDepartament() {
        const form = this.handleFormBasic("Edidar descrição")
        const inputDescription = document.createElement("input")
        inputDescription.className = "inputs"
        inputDescription.type = "text"
        inputDescription.name = "description"
        inputDescription.placeholder = "Nova descrição"
        inputDescription.required = true
        inputDescription.id = "newDescriptionForm"

        const buttonEditFinish = document.createElement("button")
        buttonEditFinish.className = "button-default button-primary"
        buttonEditFinish.innerText = "Finalizar edição"
        buttonEditFinish.id = "buttonFinishEdit"

        form.append(inputDescription, buttonEditFinish)
        this.handleAppendForm(form)
    }

    static async handleFormViewPeople() {

        const form = this.handleFormBasic("Visualizar funcionários")

        const selectDepartaments = document.createElement("select")
        const buttonView = document.createElement("button")


        buttonView.className = "button-default button-primary"
        buttonView.id = "buttonViewPeopleForm"
        buttonView.innerText = "Visualizar"

        selectDepartaments.className = "selects"
        selectDepartaments.id = "selectDepartamentForm"


        const arrDepartaments = await ApiRequests.getAllDepartaments()
        const optionDefault = document.createElement("option")
        const optionOutOfWork = document.createElement("option")

        optionDefault.innerText = "selecionar Departamento"
        optionDefault.selected = true
        optionDefault.disabled = true
        optionOutOfWork.innerText = 'Fora de serviço'
        optionOutOfWork.value = 'out'

        selectDepartaments.append(optionDefault, optionOutOfWork)

        arrDepartaments.forEach((departament) => {
            const optionDepartament = document.createElement("option")

            const { uuid, name } = departament

            optionDepartament.value = uuid
            optionDepartament.innerText = name
            selectDepartaments.append(optionDepartament)

            selectDepartaments.append(optionDepartament)
        })

        form.append(selectDepartaments, buttonView)
        this.handleAppendForm(form)
    }

    static async handleFormDemissHire(isHire) {

        let title = ""
        if (isHire) {
            title = "Contratar Funcionário"
        } else {
            title = "Demitir Funcionário"
        }

        const form = this.handleFormBasic(title)

        const selectCompanies = document.createElement("select")
        const selectDepartaments = document.createElement("select")
        const selectPeople = document.createElement("select")
        const buttonDemissHire = document.createElement("button")
        buttonDemissHire.className = "button-default button-primary"
        buttonDemissHire.id = "buttonDemissHire"
        buttonDemissHire.backgroundColor = "red"

        if (isHire) {

            buttonDemissHire.innerText = "Contrarta"
        } else {
            buttonDemissHire.innerText = "Demitir"
        }

        selectCompanies.className = "selects"
        selectDepartaments.className = "selects"
        selectDepartaments.id = "selectDepartamentsForm"
        selectPeople.className = "selects"
        selectPeople.id = "selectPeopleForm"

        const optionDefaultCompanies = document.createElement("option")
        const optionDefaultDepartamentes = document.createElement("option")
        const optionDefaultPeople = document.createElement("option")


        optionDefaultCompanies.innerText = "Selecione a empresa"
        optionDefaultCompanies.selected = true
        optionDefaultCompanies.disabled = true
        selectCompanies.append(optionDefaultCompanies)

        optionDefaultDepartamentes.innerText = "Selecione o departamento"
        optionDefaultDepartamentes.selected = true
        optionDefaultDepartamentes.disabled = true
        selectDepartaments.append(optionDefaultDepartamentes)

        optionDefaultPeople.innerText = "Selecione o funcionário"
        optionDefaultPeople.selected = true
        optionDefaultPeople.disabled = true
        selectPeople.append(optionDefaultPeople)



        const arrCompanies = await ApiRequests.getAllCompanies()

        arrCompanies.forEach((companie) => {
            const { uuid, name } = companie
            const optionCompanies = document.createElement("option")
            optionCompanies.value = uuid
            optionCompanies.innerHTML = name
            selectCompanies.append(optionCompanies)
        })


        selectCompanies.addEventListener("change", async () => {
            const valueCp = selectCompanies.value

            selectDepartaments.innerHTML = ""
            optionDefaultDepartamentes.innerText = "Selecione o departamento"
            optionDefaultDepartamentes.selected = true
            optionDefaultDepartamentes.disabled = true
            selectDepartaments.append(optionDefaultDepartamentes)

            const arrDepartaments = await ApiRequests.getSectorsCompanie(valueCp)

            arrDepartaments.forEach((departament) => {
                const { uuid, name } = departament
                const optionDepartaments = document.createElement("option")
                optionDepartaments.value = uuid
                optionDepartaments.innerText = name
                selectDepartaments.append(optionDepartaments)
            })
        })


        selectDepartaments.addEventListener("change", async () => {
            const valueDp = selectDepartaments.value

            selectPeople.innerHTML = ""
            optionDefaultPeople.innerText = "Selecione o funcionário"
            optionDefaultPeople.selected = true
            optionDefaultPeople.disabled = true
            selectPeople.append(optionDefaultPeople)

            const arrPeople = await ApiRequests.getAllUser()
            arrPeople.forEach((people) => {

                const { uuid, username, department_uuid } = people
                if (isHire) {
                    if (!department_uuid) {
                        const optionPeople = document.createElement("option")
                        optionPeople.value = uuid
                        optionPeople.innerText = username
                        selectPeople.append(optionPeople)
                    }
                } else {
                    if (department_uuid == valueDp) {

                        const optionPeople = document.createElement("option")
                        optionPeople.value = uuid
                        optionPeople.innerText = username
                        selectPeople.append(optionPeople)
                    }
                }
            })
        })


        form.append(selectCompanies, selectDepartaments, selectPeople, buttonDemissHire)
        this.handleAppendForm(form)
    }



    static async handleFormEditPeople() {

        const form = this.handleFormBasic("Editar informção do funcinário")

        const selectCompanies = document.createElement("select")
        const selectDepartaments = document.createElement("select")
        const selectPeople = document.createElement("select")
        const selectWork = document.createElement("select")
        const selectLevel = document.createElement("select")

        const buttonEdit = document.createElement("button")
        buttonEdit.className = "button-default button-primary"
        buttonEdit.id = "buttonEdit"
        buttonEdit.innerText = "Editar"
        buttonEdit.backgroundColor = "red"

        selectCompanies.className = "selects"
        selectDepartaments.className = "selects"
        selectDepartaments.id = "selectDepartamentsForm"
        selectPeople.className = "selects"
        selectPeople.id = "selectPeopleForm"
        selectWork.className = "selects"
        selectWork.id = "selectWorkForm"
        selectLevel.className = "selects"
        selectLevel.id = "selectLevelForm"


        const optionDefaultCompanies = document.createElement("option")
        const optionDefaultDepartamentes = document.createElement("option")
        const optionDefaultPeople = document.createElement("option")


        optionDefaultCompanies.innerText = "Selecione a empresa"
        optionDefaultCompanies.selected = true
        optionDefaultCompanies.disabled = true
        selectCompanies.append(optionDefaultCompanies)

        optionDefaultDepartamentes.innerText = "Selecione o departamento"
        optionDefaultDepartamentes.selected = true
        optionDefaultDepartamentes.disabled = true
        selectDepartaments.append(optionDefaultDepartamentes)

        optionDefaultPeople.innerText = "Selecione o funcionário"
        optionDefaultPeople.selected = true
        optionDefaultPeople.disabled = true
        selectPeople.append(optionDefaultPeople)



        const arrCompanies = await ApiRequests.getAllCompanies()

        arrCompanies.forEach((companie) => {
            const { uuid, name } = companie
            const optionCompanies = document.createElement("option")
            optionCompanies.value = uuid
            optionCompanies.innerHTML = name
            selectCompanies.append(optionCompanies)
        })


        selectCompanies.addEventListener("change", async () => {
            const valueCp = selectCompanies.value

            selectDepartaments.innerHTML = ""
            optionDefaultDepartamentes.innerText = "Selecione o departamento"
            optionDefaultDepartamentes.selected = true
            optionDefaultDepartamentes.disabled = true
            selectDepartaments.append(optionDefaultDepartamentes)

            const arrDepartaments = await ApiRequests.getSectorsCompanie(valueCp)

            arrDepartaments.forEach((departament) => {
                const { uuid, name } = departament
                const optionDepartaments = document.createElement("option")
                optionDepartaments.value = uuid
                optionDepartaments.innerText = name
                selectDepartaments.append(optionDepartaments)
            })
        })


        selectDepartaments.addEventListener("change", async () => {
            const valueDp = selectDepartaments.value

            selectPeople.innerHTML = ""
            optionDefaultPeople.innerText = "Selecione o funcionário"
            optionDefaultPeople.selected = true
            optionDefaultPeople.disabled = true
            selectPeople.append(optionDefaultPeople)

            const arrPeople = await ApiRequests.getAllUser()
            arrPeople.forEach((people) => {
                const { uuid, username, department_uuid } = people

                if (department_uuid == valueDp) {
                    const optionPeople = document.createElement("option")
                    optionPeople.value = uuid
                    optionPeople.innerText = username
                    selectPeople.append(optionPeople)
                }
            })
        })


        selectPeople.addEventListener("change", async () => {
            const valuePe = selectPeople.value
            const arrPeople = await ApiRequests.getAllUser()

            const people = arrPeople.find(({ uuid }) => uuid == valuePe)

            const { professional_level, kind_of_work } = people


            const optionWorkDefault = document.createElement("option")
            optionWorkDefault.innerText = kind_of_work
            optionWorkDefault.value = kind_of_work
            optionWorkDefault.selected = true
            selectWork.append(optionWorkDefault)

            const optionLevelDefault = document.createElement("option")
            optionLevelDefault.innerText = professional_level
            optionLevelDefault.value = professional_level
            optionLevelDefault.selected = true
            selectLevel.append(optionLevelDefault)

            const arrLevel = ["estágio", "júnior", "pleno", "sênior"]
            const arrWork = ["home office", "presencial", "hibrido"]

            arrLevel.forEach((level) => {
                if (level != professional_level) {
                    const optionLevel = document.createElement("option")
                    optionLevel.innerText = level
                    optionLevel.value = level

                    selectLevel.append(optionLevel)
                }
            })

            arrWork.forEach((work) => {
                if (work != kind_of_work) {
                    const optionWork = document.createElement("option")
                    optionWork.innerText = work
                    optionWork.value = work

                    selectWork.append(optionWork)
                }
            })
        })

        form.append(selectCompanies, selectDepartaments, selectPeople, selectWork, selectLevel, buttonEdit)
        this.handleAppendForm(form)
    }


    static handleFormEditUser() {
        const form = this.handleFormBasic("Editar dados")

        const inputUsername = document.createElement("input")
        const inputEmail = document.createElement("input")
        const inputPassword = document.createElement("input")
        const buttonEditForm = document.createElement("button")

        inputUsername.type = "text"
        inputUsername.className = "inputs"
        inputUsername.id = "inputUsername"
        inputUsername.name = "username"
        inputUsername.placeholder = "Username"

        inputEmail.type = "email"
        inputEmail.className = "inputs"
        inputEmail.id = "inputEmail"
        inputEmail.name = "email"
        inputEmail.placeholder = "Email"

        inputPassword.type = "password"
        inputPassword.className = "inputs"
        inputPassword.id = "inputPassword"
        inputPassword.name = "password"
        inputPassword.placeholder = "Senha"

        buttonEditForm.className = "button-default button-primary"
        buttonEditForm.id = "buttonEditForm"
        buttonEditForm.innerText = "Editar"

        form.append(inputUsername, inputEmail, inputPassword, buttonEditForm)

        this.handleAppendForm(form)

    }


    static async handleFormDelUser() {
        const form = this.handleFormBasic("Deletar usuário")

        const selecDelUser = document.createElement("select")
        const optionDefault = document.createElement("option")
        const buttonDelUserForm = document.createElement("button")

        selecDelUser.className = "selects"
        selecDelUser.id = "selecDelUserForm"
        optionDefault.innerText = "Selecionar usuário"
        optionDefault.selected = true
        optionDefault.disabled = true

        selecDelUser.append(optionDefault)

        buttonDelUserForm.className = "button-default button-primary"
        buttonDelUserForm.id = "buttonDelUserForm"
        buttonDelUserForm.innerText = "Deletar Usuário"

        const arrFullUsers = await ApiRequests.getAllUser()

        arrFullUsers.forEach((user) => {
            console.log(user);
            const { uuid, username } = user
            const option = document.createElement("option")
            option.value = uuid
            option.innerText = username

            selecDelUser.append(option)
        })

        form.append(selecDelUser, buttonDelUserForm)
        this.handleAppendForm(form)
    }
}