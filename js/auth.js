function login() {
    if(firebase.auth().currentUser) {
        firebase.auth().singOut()
    }
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then( () => {
            swal
                .fire({
                    icon: "success",
                    title: "Login realizado com sucesso",
                })
                .then ( () => {
                    setTimeout ( () => {
                        window.location.replace( 'index.html')
                    }, 1000)
                })
        })
        .catch((error) => {
            const erroCode = error.code
            switch(erroCode) {
                case "auth/wrong-password":
                    swal.fire({
                        icon: "error",
                        title: "Senha inválida",
                    })       
                    break
                case "auth/invalid-email":
                    swal.fire({
                        icon: "error",
                        title: "E-mail inválido",
                    })       
                    break
                case "auth/user-not-found":
                    swal.fire({
                        icon: "warning",
                        title: "Usuário não encontrado",
                        text: "Deseja criar seu usuário?",
                        showCancelButton: true,
                        cancelButtonText: "Não",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Sim",
                        confirmButtonColor: "#3085d6",
                    })
                    .then( (result) => {
                        if(result.value)
                        signUp(email, password)
                    })       
                    break
                default :
                    swal.fire({
                        icon: "error",
                        title: "Senha inválida",
                    })       

            }
            
        })
}

function signUp(email, password) {
    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then( () => {
            swal
                .fire ({
                    icon: "success",
                    text: "Usuário criado com sucesso",
                })
                .then( () => {
                    setTimeout( () => {
                        window.location.replace("index.html")
                    }, 1000)
                })
        })
        .catch( (error) => {
            const errorCode = error.code
            switch (errorCode) {
                case "auth/weak-password":
                    swal.fire ({
                        icon: "error",
                        title: "Senha muito fraca",
                    })
                    break
                default: 
                    swal.fire ({
                        icon: "error",
                        title: error.message,
                    })   
            }
        })
}

function logOut() {
    firebase.auth().signOut()
}

function resetPass() {

    const email = document.getElementById("email-reset").value
    const actionCodeSettings = {
        url: `https://todo-list-1775d.web.app/`}

    firebase
        .auth()
        .sendPasswordResetEmail(email, actionCodeSettings )
        .then(function() {
            swal.fire({
                icon:"success",
                text:"Email enviado com sucesso"
            })
    })
    .catch(function(error) {
        const errorCode = error.code
        switch(errorCode) {
            case"auth/invalid-email":
                swal.fire ({
                    icon: "error",
                    title: "Preencha o campo corretamente",
                })
                break

            case "auth/user-not-found":
                swal.fire({
                    icon: "warning",
                    title: "Usuário não encontrado"
                })
                break
            default:
                swal.fire ({
                    icon:"error",
                    title: error.message,
                })
            }
        })
}