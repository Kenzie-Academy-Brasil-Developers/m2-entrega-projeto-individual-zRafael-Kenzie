export class ApiRequests {

    static urlBase = "http://localhost:6278"
    static token = localStorage.getItem('@projetinho:token')


    static token = localStorage.getItem("@kenzieEmpresas:token")
    static urlBase = "http://localhost:6278"
    static headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.token}`
    }
    static async getAllCompanies() {
        const response = await fetch(`${this.urlBase}/companies`, {
            method: "GET",
            headers: this.headers
        })
            .then(resp => resp.json())
            .catch(err => console.log(err))

        return response
    }

    static async login(body) {
        console.log(JSON.stringify(body));
        const response = await fetch(`${this.urlBase}/auth/login`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(body)
        })
            .then(resp => resp.json())
            .then(resp => {
                Response.responseLogin(resp)
            })
            .catch(err => console.log(err))

        return response
    }

    static async register(body) {
        console.log(JSON.stringify(body));
        const response = await fetch(`${this.urlBase}/auth/register/user`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(body)
        })
            .then(resp => resp.json())
            .then(resp => {
                Response.responseRegister(resp)
            })
            .catch(err => console.log(err))

        return response
    }

    static async outOfWork() {
        const response = await fetch(`${this.urlBase}/admin/out_of_work`, {
            method: "GET",
            headers: this.headers
        })
            .then(resp => resp.json())
            .catch(err => console.log(err))

        return response
    }

    static async getAllSectores() {
        const response = await fetch(`${this.urlBase}/sectors`, {
            method: "GET",
            headers: this.headers
        })
            .then(resp => resp.json())
            .catch(err => console.log(err))

        return response
    }

    static async getCompaniesSector(idSector) {
        const response = await fetch(`${this.urlBase}/companies/${idSector}`, {
            method: "GET",
            headers: this.headers
        })
            .then(resp => resp.json())
            .catch(err => console.log(err))

        return response
    }

    static async getEnterprise() {
        const data = await fetch(`${this.urlBase}/users/departaments`,
            {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${this.token}`
                },

            })
            .then(res => res.json())
            .then(res => console.log(res))
        return data
    }

    static async getDepartament() {

        const data = await fetch(`${this.urlBase}/users/departments/coworkers`,
            {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${this.token}`
                },

            })
            .then(res => res.json())
            .catch(err => console.log(err))

        return data
    }

    static async getSectorsCompanie(idCompanie) {
        const response = fetch(`${this.urlBase}/departments/${idCompanie}`, {
            method: "GET",
            headers: this.headers
        })
            .then(resp => resp.json())
            .catch(err => console.log(err))


        return response
    }

    static async getAllUser() {
        const response = fetch(`${this.urlBase}/users`, {
            method: "GET",
            headers: this.headers
        })
            .then(resp => resp.json())
            .catch(err => console.log(err))

        return response
    }

    static async createCompany(body) {
        const response = await fetch(`${this.urlBase}/companies`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(body)
        })
            .then(resp => resp.json())
            .then(resp => {

                if (resp.uuid) {
                    Toast.create("Empresa criada com sucesso!", "#12684E")
                } else {
                    const { error } = resp
                    Toast.create(error, "#6E140C")
                }

                return resp
            })
            .catch(err => console.log(err))

        return response
    }


    static async createDepartament(body) {
        const response = await fetch(`${this.urlBase}/departments`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(body)
        })
            .then(resp => resp.json())
            .then(resp => {
                if (resp.uuid) {
                    Toast.create("Departamento criado com sucesso!", "#12684E")
                } else {
                    Toast.create(resp.error, "#6E140C")
                }

                return resp
            })
            .catch(err => console.log(err))

        return response
    }

    static async getAllDepartaments() {
        const response = await fetch(`${this.urlBase}/departments`, {
            method: "GET",
            headers: this.headers
        })
            .then(resp => resp.json())
            .catch(err => console.log(err))

        return response
    }


    static async editDepartament(idDepartament, newDescription) {
        const response = await fetch(`${this.urlBase}/departments/${idDepartament}`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify(newDescription)
        })
            .then(resp => resp.json())
            .then(resp => {

                if (resp.uuid) {
                    Toast.create("Departamento editado com sucesso!", "#12684E")
                } else {
                    Toast.create(resp.error, "#6E140C")
                }

                return resp
            })
            .catch(err => console.log(err))

        console.log(response);
        return response
    }

    static async delDepartament(idDepartament) {
        const response = await fetch(`${this.urlBase}/departments/${idDepartament}`, {
            method: "DELETE",
            headers: this.headers
        })

        return response
    }

    static async demissPeople(idPeople) {
        const response = await fetch(`${this.urlBase}/departments/dismiss/${idPeople}`, {
            method: "PATCH",
            headers: this.headers
        })
            .then(resp => resp.json())
            .then(resp => {
                Response.demitir(resp)
            })
            .catch(err => console.log(err))

        return response
    }

    static async hirePeople(body) {
        const response = await fetch(`${this.urlBase}/departments/hire`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify(body)
        })
            .then(resp => resp.json())
            .then(resp => {
                Response.contratar(resp)
            })
            .catch(err => console.log(err))


        return response
    }

    static async editPeopleAdm(idPeople, body) {
        console.log(idPeople);
        console.log(body);
        const response = await fetch(`${this.urlBase}/admin/update_user/${idPeople}`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify(body)
        })
            .then(resp => resp.json())
            .then(resp => {
                Response.updateUser(resp)
            })
            .catch(err => console.log(err))

        return response
    }

    static async getUserPeopleDepartament() {
        const response = await fetch(`${this.urlBase}/users/departments/coworkers`, {
            method: "GET",
            headers: this.headers
        })
            .then(resp => resp.json())
            .catch(err => console.log(err))

        return response
    }

    static async getUserDepartaments() {
        const response = await fetch(`${this.urlBase}/users/departments`, {
            method: "GET",
            headers: this.headers
        })
            .then(resp => resp.json())
            .catch(err => console.log(err))

        return response
    }

    static async userUpdate(body) {
        const response = await fetch(`${this.urlBase}/users`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify(body)
        })
            .then(resp => resp.json())
            .then(resp => {
                Response.responseUpdate(resp)
            })
            .catch(err => console.log(err))

        return response
    }

    static async delUser(idUser) {
        const response = await fetch(`${this.urlBase}/admin/delete_user/${idUser}`, {
            method: "DELETE",
            headers: this.headers
        })
            .then(resp => {
                Response.responseDelete(resp)
            })
            .catch(err => console.log(err))


        return response
    }
}


class Response {

    static responseLogin(resp) {
        if (resp.token) {
            const { token, uuid, is_admin } = resp
            localStorage.setItem("@kenzieEmpresas:token", token)
            localStorage.setItem("@kenzieEmpresas:uuid", uuid)
            localStorage.setItem("@kenzieEmpresas:is_admin", is_admin)
            Toast.create("Login realizado com sucesso!", "green")

            setTimeout(() => {
                if (is_admin) {
                    window.location.replace("./src/pages/dashboardAdmin.html")
                } else {
                    window.location.replace("./src/pages/dashboardUser.html")
                }
            }, 2000)

        } else {
            const { error } = resp
            let msg = ""
            if (error == "password invalid!") {
                msg = "Senha inválida!"
            } else if (error == "email invalid!") {
                msg = "Email inválido!"
            } else {
                msg = error
            }
            Toast.create(msg, "red")
        }

        return resp
    }

    static responseRegister(resp) {
        if (resp.uuid) {
            Toast.create("Cadastro realizado com sucesso!", "green")
            Modals.handleFormLogin()
        } else {
            const { error } = resp
            let msg = ""

            if (error == "email alread exists!") {
                msg = "Email já cadastrado, por favor, tente outro!"
            } else {
                msg = error
            }

            Toast.create(msg, "red")
        }

        return resp
    }

    static responseDelete(resp) {
        if (resp.error) {
            Toast.create(resp.error, "green")
        } else {
            Toast.create("Usuário deletar com sucesso!", "red")
        }

        return resp
    }

    static responseUpdate(resp) {
        if (resp.uuid) {
            Toast.create("Dados atualizados com sucesso!", "green")
        } else {
            Toast.create(resp.error, "red")
        }

        return resp
    }

    static updateUser(resp) {
        if (resp.uuid) {
            Toast.create("Funcionário atualizado com sucesso!", "green")
        } else {
            Toast.create(resp.error, "red")
        }

        return resp
    }

    static contratar(resp) {

        if (resp.uuid) {
            Toast.create("Funcionário contratado com sucesso!", "green")
        } else {
            Toast.create(resp.error, "red")
        }

        return resp
    }

    static demitir(resp) {

        if (resp.uuid) {
            Toast.create("Funcionário demetido com sucesso!", "green")
        } else {
            Toast.create(resp.error, "red")
        }

        return resp
    }
}

class Toast {

    static create(text, color) {
        Toastify({
            text: text,
            duration: 2000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: color,

            },
        }).showToast();
    }

}

