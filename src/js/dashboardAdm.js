import { Modals } from "./modals.js"
import { ApiRequests } from "./api.js";


const btnMobile = document.getElementById('btn-mobile');

function toggleMenu(event) {
  if (event.type === 'touchstart') event.preventDefault();
  const nav = document.getElementById('nav');
  nav.classList.toggle('active');
  const active = nav.classList.contains('active');
  event.currentTarget.setAttribute('aria-expanded', active);
  if (active) {
    event.currentTarget.setAttribute('aria-label', 'Fechar Menu');
  } else {
    event.currentTarget.setAttribute('aria-label', 'Abrir Menu');
  }
}

btnMobile.addEventListener('click', toggleMenu);
btnMobile.addEventListener('touchstart', toggleMenu);

class AccessControl {

    static isAdmin = localStorage.getItem("@kenzieEmpresas:is_admin")

    static handleLogout () {
        const buttonLogout = document.getElementById("logoutBtn")
        buttonLogout.addEventListener("click", () => {
            window.location.replace("../../../../index.html")
            localStorage.removeItem("@kenzieEmpresas:token")
            localStorage.removeItem("@kenzieEmpresas:uuid")
            localStorage.removeItem("@kenzieEmpresas:is_admin")
        })
    }

    static handleIsAdmin () {
        if (!this.isAdmin) {
            window.location.replace("../../../../index.html")
        }
    }
}

AccessControl.handleLogout()
AccessControl.handleIsAdmin()


class Companies {

    static arrCompanies = []

    static async Workers(){
        const list = document.querySelector('.out-of-work')

    }

    static async handleListCompanies (arrCompanies) {
        const list = document.querySelector(".companies__list")
        list.innerHTML = ""

        if (!arrCompanies) {
            arrCompanies = await ApiRequests.getAllCompanies()
            this.arrCompanies = arrCompanies
        }

        arrCompanies.forEach( async (companie) => {
            const { uuid } = companie 
            const departament = await ApiRequests.getSectorsCompanie(uuid)
            const people = await ApiRequests.getAllUser()
            
            const peopleFilterDepartament = []
            departament.forEach((dp) => {
                const { uuid } = dp

                people.forEach((people) => {
                    const { department_uuid } = people

                    if (department_uuid == uuid) {

                        peopleFilterDepartament.push(people)
                    }
                })    
            })
             
            const card = this.handlCardCompanies(companie, departament, peopleFilterDepartament)
            list.append(card)
            
        })
    }

    static handlCardCompanies (companie, departament, people) {
        const { name, opening_hours , description :descriptionCompanie, sectors: {description : descriptionSectors} } = companie

       
        const card = document.createElement("li")
        const divCardInfo = document.createElement("div")
        const pNameCompanie = document.createElement("p") 
        const pSectorCompanie = document.createElement("p")
        const pDescriptionCompanie = document.createElement("p")
        const pOpenHours = document.createElement("p")
        const spanNameCompanie = document.createElement("span")
        const spanSectorCompanie = document.createElement("span")
        const spanDescriptionCompanie = document.createElement("span")
        const spanOpenHoursCompanie = document.createElement("span")
        
        card.className = "companies__card"
        divCardInfo. className = "card__info"
        spanNameCompanie.innerText = "Empresa: "
        spanSectorCompanie.innerText = "Setor: "
        spanDescriptionCompanie.innerText = "Descrição: "
        spanOpenHoursCompanie.innerText = "Horário de abertura: "


        pNameCompanie.append(spanNameCompanie)
        pSectorCompanie.append(spanSectorCompanie)
        pDescriptionCompanie.append(spanDescriptionCompanie)
        pOpenHours.append(spanOpenHoursCompanie)


        pNameCompanie.insertAdjacentText("beforeend", name)
        pDescriptionCompanie.insertAdjacentText("beforeend", descriptionCompanie)
        pSectorCompanie.insertAdjacentText("beforeend", descriptionSectors)
        pOpenHours.insertAdjacentText("beforeend", opening_hours)
        
        divCardInfo.append(pNameCompanie, pDescriptionCompanie, pOpenHours)
        card.append(divCardInfo)

        if (departament.length) {
            const divDepartament = document.createElement("div")
            divDepartament.className = "card__departament"
            const titleDepartament = document.createElement("h3")
            const listDepartament = document.createElement("ul")
            listDepartament.className = "card__list-slide"

            departament.forEach((dp) => {

                const { name , description } = dp

                const cardSlideDepartament = document.createElement("li")
                const pNameDepartament = document.createElement("p")
                const pDescriptionDepartament = document.createElement("p")
                const spanNameDepartament = document.createElement("span") 
                const spanDescriptionDepartament = document.createElement("span") 
                
                cardSlideDepartament .className = "list-slide__card"
                titleDepartament.innerText = "Departamentos: "
                spanNameDepartament.innerText = "Departamento: "
                spanDescriptionDepartament.innerText = "Descrição: "

                pNameDepartament.append(spanNameDepartament)
                pDescriptionDepartament.append(spanDescriptionDepartament)

                pNameDepartament.insertAdjacentText("beforeend", name)
                pDescriptionDepartament.insertAdjacentText("beforeend", description)

                cardSlideDepartament.append(pNameDepartament, pDescriptionDepartament)
                listDepartament.append(cardSlideDepartament)
            })

            divDepartament.append(titleDepartament, listDepartament)
            card.append(divDepartament)
        }
        if (people.length) {
            const divPeople = document.createElement("div")
            const titlePeople = document.createElement("h3")
            const listPeople= document.createElement("ul")

            people.forEach((pp) => {
                const { username, professional_level} = pp

                const cardSlidePeople = document.createElement("li")
                const pNamePeople = document.createElement("p")
                const pLevelPeople = document.createElement("p")
                const spanNamePeople = document.createElement("span") 
                const spanLevelPeople = document.createElement("span") 
    
                divPeople.className = "card__People"
                listPeople.className = "card__list-slide"
                cardSlidePeople.className = "list-slide__card"
                titlePeople.innerText = "Colaboradores"
                spanNamePeople.innerText = "Nome: "
                spanLevelPeople.innerText = "Nível: "

                pNamePeople.append(spanNamePeople)
                pLevelPeople.append(spanLevelPeople)

                pNamePeople.insertAdjacentText("beforeend", username)
                pLevelPeople.insertAdjacentText("beforeend", professional_level)

                cardSlidePeople.append(pNamePeople, pLevelPeople)

                listPeople.append(cardSlidePeople)
                
            })
            divPeople.append(titlePeople, listPeople)
            card.append(divPeople)
        }
        return card
    }

    static handleSelect () {
       const select = document.getElementById("selectListSector")
        this.handleSelectList()

        select.addEventListener("change", async () => {
            const value = select.value
 

            if (value != "all") {
                const arrSearch = await ApiRequests.getCompaniesSector(value)

                this.handleListCompanies(arrSearch)
            } else {
                this.handleListCompanies()
            }
        })
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



    static searchCompanie () {
        const inputSearch = document.getElementById("inputSearch")
        inputSearch.addEventListener("keyup", () => {
            const value = inputSearch.value.trim().toLowerCase()
            if (value != "") {
                const arrSearch = this.arrCompanies.filter(({name}) => name.toLowerCase().includes(value))
                this.handleListCompanies(arrSearch)
            } else {
                this.handleListCompanies()
            }
        })
    }


    static createCompany () {
        const buttonCreateCompany = document.getElementById("buttonCreateCompany")
        buttonCreateCompany.addEventListener("click", () => {
            Modals.handleFormCreateCompany()

           setTimeout(() => {
                const buttonCreateCompanyForm = document.getElementById("buttonCreateCompanyForm")

                buttonCreateCompanyForm.addEventListener("click", async () => {
                    const name = document.getElementById("inputName").value
                    const description = document.getElementById("inputDescription").value
                    const opening_hours = document.getElementById("inputHours").value
                    const sector_uuid = document.getElementById("selectSectorForm").value

                    const companie = {
                        name: name,
                        description: description,
                        opening_hours: opening_hours,
                        sector_uuid: sector_uuid
                    } 

                    const response = await ApiRequests.createCompany(companie) 

                    if (!response.error) {
                        Modals.handleRemoveModal()
                        this.handleListCompanies()
                        Companies.handleSelect()
                    }        
                })
           }, 500)
        })
    }
}

Companies.handleListCompanies()
Companies.handleSelect()
Companies.searchCompanie()
Companies.createCompany()

class Departamentes {

    static contentContainer = document.querySelector(".companies__container")

    static handleClenContent () {
        this.contentContainer.innerHTML = ""
    }

    static createDepartament () {
        const buttonCreate = document.getElementById("create-dep")
        buttonCreate.addEventListener("click", () => {
            Modals.handleFormCreateDepartament()

            setTimeout (() => {
                const buttonCreateForm = document.getElementById("buttonCreateDepartamentForm")
                buttonCreateForm.addEventListener("click", async () => {
                    
                    const name = document.getElementById("inputName").value
                    const description = document.getElementById("inputDescription").value
                    const company_uuid = document.getElementById("selectCompanieForm").value

                    if (name && description != "") {
                        const companie = {
                            name: name,
                            description: description,
                            company_uuid: company_uuid
                        }
                        ApiRequests.createDepartament(companie)
                    }
                })
            }, 500)
        })
    }


    static listDepartament () {
        const buttonListDepartamentes = document.getElementById("listar-dep")
        buttonListDepartamentes.addEventListener("click", () => {
            Modals.listCompanie()

            setTimeout (() => {
                const buttonListForm = document.getElementById("buttonListDepartamentCompanieForm")
                buttonListForm.addEventListener("click", async () => {
                    const select = document.getElementById("selectListDepartamentForm")
                    const value = select.value

                    const arrDepartaments = await ApiRequests.getSectorsCompanie(value)

                    const list = document.createElement("ul")
                    list.className = "card__list-slide1"
                    
                    this.handleClenContent()
                    this.contentContainer.append(list)

                    arrDepartaments.forEach((departament) => {
                        const card = this.handleCardListDepartaments(departament)
                        list.append(card)
                    })
                })
            },500)
        })
    }


    static handleCardListDepartaments (departament) {

        const { name, description } = departament


        const card = document.createElement("li")
        const pName = document.createElement("p")
        const pDescription = document.createElement("p")
        const spanName = document.createElement("span")
        const spanDescription = document.createElement("span")

        card.className = "list-slide__card"
        spanName.innerText = "Nome: "
        spanDescription.innerText = "Descrição: "

        pName.append(spanName)
        pDescription.append(spanDescription)

        pName.insertAdjacentText("beforeend", name)
        pDescription.insertAdjacentText("beforeend", description)

        card.append(pName, pDescription)

        return card        
    }

    static editDepartament () {
        const buttonEditDel = document.getElementById("editar-dep")
        buttonEditDel.addEventListener("click", () => {
            Modals.handleFormDepartamentSpec(true) 

            setTimeout(() => {
                const buttonEdit = document.getElementById("buttonEditForm") 
                const buttonDel = document.getElementById("buttonDelForm")
                buttonEdit.addEventListener("click", () => {
                    const departament = document.getElementById("selectDepartamentForm").value
                    
                    Modals.ediDepartament ()
                    
                    setTimeout(() => {
                        const buttonEditFinish = document.getElementById("buttonFinishEdit")
                        buttonEditFinish.addEventListener("click", () => {
                            const description = document.getElementById("newDescriptionForm").value.trim() 

                            if (description != "") {
                                const newDescription = {
                                    description: description
                                }
                                
                                ApiRequests.editDepartament(departament, newDescription)
                            }
                        })
                    },500)
                })
                
                buttonDel.addEventListener("click", () => {
                    const departament = document.getElementById("selectDepartamentForm").value
                    ApiRequests.delDepartament(departament)
                })
            },500)
        })
    }

    static handleListPeopleDepartament () {
        const buttonView = document.getElementById("exibir-fun")
        buttonView.addEventListener("click", () => {
            Modals.handleFormViewPeople()

            setTimeout(() => {
                const buttonViewPeopleForm = document.getElementById("buttonViewPeopleForm")   
                buttonViewPeopleForm.addEventListener("click", async () => {
                    const departament = document.getElementById("selectDepartamentForm").value
                    if(departament == 'out'){
                        const arrPeople = await ApiRequests.outOfWork()
                        this.handleListPeopleDepartamentCard(arrPeople)
                    }else{

                    const arrDepartaments = await ApiRequests.getAllUser()
                    const arrPeople = arrDepartaments.filter(({department_uuid}) => department_uuid == departament)
                    
                    this.handleListPeopleDepartamentCard(arrPeople) 
                }
                })
            },500)
        })
    }

    static handleListPeopleDepartamentCard (arrPeople) {
       
        
        const ul = document.createElement("ul")
        ul.className = "card__list-slide-user"
        arrPeople.forEach((people) => {

            let { username, professional_level, kind_of_work} = people
            

            if (!kind_of_work ) {
                kind_of_work = "Não especificado"
            }
    

            ul.insertAdjacentHTML("beforeend", `
            <li class="list-slide__card">
                <p><span>Nome:</span> ${username}</p>
                <p><span>Nível:</span> ${professional_level}</p>
                <p><span>Modalidade:</span> ${kind_of_work}</p>       
            </li>
        "`)
        this.handleClenContent()
        this.contentContainer.append(ul)
        })
    }

    static handleDimiss () {
        const buttonDismiss = document.getElementById("demitir-fun")
        buttonDismiss.addEventListener("click", () => {
            Modals.handleFormDemissHire()

            setTimeout(() => {
                const buttonDemissForm = document.getElementById("buttonDemissHire")
                buttonDemissForm.addEventListener("click", () => {
                    const idPeople = document.getElementById("selectPeopleForm").value
                    ApiRequests.demissPeople(idPeople)
                })
            }, 500);
            
        })
    }

    static handleHire () {
        const buttonHire = document.getElementById("contratar-fun")
        buttonHire.addEventListener("click", () => {
            Modals.handleFormDemissHire(true)

            setTimeout(() => {
                const buttonHireForm = document.getElementById("buttonDemissHire")
                buttonHireForm.addEventListener("click", () => {
                    const department_uuid = document.getElementById("selectDepartamentsForm").value
                    const user_uuid = document.getElementById("selectPeopleForm").value

                    const people = {
                        user_uuid: user_uuid,
                        department_uuid: department_uuid
                    }
                    ApiRequests.hirePeople(people)
                })
            },500)
        })
    }

    static handleEditPeople () {
        const buttonEditPeople = document.getElementById("editar-fun")
        buttonEditPeople.addEventListener("click", () => {
            Modals.handleFormEditPeople() 

            setTimeout(() => {
                const buttonEditForm = document.getElementById("buttonEdit")  
                buttonEditForm.addEventListener("click", () => {
                    const idPeople = document.getElementById("selectPeopleForm").value
                    const professional_level = document.getElementById("selectLevelForm").value  
                    const kind_of_work = document.getElementById("selectWorkForm").value
                    const body = {
                        professional_level: professional_level,
                        kind_of_work: kind_of_work
                    }

                    ApiRequests.editPeopleAdm (idPeople, body)
                })
            },500)

        })
    }

    static handleDelUser () {
        const buttonDelUser = document.getElementById("del-fun")
        buttonDelUser.addEventListener("click", () => {
            Modals.handleFormDelUser () 

            setTimeout(() => {
                const buttonDelUserForm = document.getElementById("buttonDelUserForm")
                buttonDelUserForm.addEventListener("click", () => {
                    const idUser = document.getElementById("selecDelUserForm").value
                    ApiRequests.delUser (idUser)
                })
            }, 500);
        })
    }
}

Departamentes.createDepartament()
Departamentes.listDepartament()
Departamentes.editDepartament()
Departamentes.handleListPeopleDepartament()
Departamentes.handleDimiss()
Departamentes.handleHire()
Departamentes.handleEditPeople()
Departamentes.handleDelUser()