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

