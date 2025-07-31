import home from "./home.js"

let login=()=>{
    return `
     <div class="login">
    <form action="" id="formlog">
        <div>
            <h1>Login</h1>
        </div>
        <div>
            <input type="email" name="email" placeholder="Email">
            <span><i class="fa-solid fa-envelope"></i></span>
        </div>
        <div>
            <input type="password" name="password" placeholder="Password">
            <span><i class="fa-solid fa-lock"></i></span>
        </div>
        
        <div>
            <button>Submit</button>
        </div>

    </form>
</div>

    `
}

export let handleLoginBind=()=>{

        let state={
    setState(name,value){
        this[name]=value
    }
}

const form=document.querySelector("form")
const inputs=document.querySelectorAll("input")


function handleChange(e){
    let {name,value}=e.target
    state.setState(name,value)
    }


function handleSubmit(e){
    e.preventDefault()
    let {email,password}=state
    let payload={email,password}
    console.log(payload);
    
    (async()=>{
        try {
            let res=await fetch("http://localhost:5000/api/auth/login",{
            method:"POST",
            body:JSON.stringify(payload),
            headers:{
                "Content-Type":"application/json"
            }
        })
        // console.log(res);
        let data=await res.json()
        // console.log(data);
        if(res.status==200){
            alert(`${data.message}`)
            history.pushState({},"","/home")
            root.innerHTML=home()
        }else{
            alert(`${data.message}`)
        }
        
        } catch (error) {
            alert("something went wrong")    
        }
    }

    )()


}

form.addEventListener("submit",handleSubmit)

inputs.forEach(input=>{
    input.addEventListener("change",handleChange)
})
}

export default login