import login from "./login.js"
import register from "./register.js"

const root=document.getElementById("root")
const allAnchor=document.querySelectorAll("a")

const router={
    "/login":login,
    "/register":register
}

function handleClick(e){
    e.preventDefault()
    const path=e.target.pathname
    history.pushState(null,"",`${path}`)
    root.innerHTML=router[path]()

    
}

allAnchor.forEach((anchor)=>{
    anchor.addEventListener("click",handleClick)
})

window.addEventListener("popstate",(e)=>{
    let path=location.pathname
    if(path=="/index.html"){
        root.innerHTML=" "
    }else{
        root.innerHTML=router[path]()
    }
})


let state={
    setState(name,value){
        this[name]=value
    }
}

const form=document.querySelector("form")
const inputs=document.querySelectorAll("input")
const textarea=document.querySelector("textarea")


function handleChange(e){
    let {name,value,files}=e.target
    if(name!="re-password"){
        if(name=="image"){
            // value=files[0]
            value=e.target.files[0]
            if(value instanceof Blob){
                const reader=new FileReader();
                reader.onload=function(){
                    form.style.backgroundImage=`url(${reader.result})`
                };
                reader.readAsDataURL(value)
            }else{
                console.log("No valid file selected");
            }
            state.setState(name,value)

        }else{
            state.setState(name,value)
        }
    }
    

}

function handleSubmit(e){
    e.preventDefault()
    console.log(state);
    
}

form.addEventListener("submit",handleSubmit)

inputs.forEach((input)=>{
    input.addEventListener("change",handleChange)
})

textarea.addEventListener("change",handleChange)

