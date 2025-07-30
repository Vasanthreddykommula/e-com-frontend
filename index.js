import login, { handleLoginBind } from "./login.js"
import register, { handleRegisterBind } from "./register.js"

const root=document.getElementById("root")
const allAnchor=document.querySelectorAll("a")

const router={
    "/login":[login,handleLoginBind],
    "/register":[register,handleRegisterBind],
}

function handleClick(e){
    e.preventDefault()
    const path=e.target.pathname
    history.pushState(null,"",`${path}`)
    root.innerHTML=router[path][0]()
    if(router[path][1]){
        router[path][1]()
    }

}

allAnchor.forEach((anchor)=>{
    anchor.addEventListener("click",handleClick)
})

window.addEventListener("popstate",(e)=>{
    let path=location.pathname
    if(path=="/index.html"){
        root.innerHTML=" "
    }else{
        root.innerHTML=router[path][0]()
        if(router[path][1]){
            router[path][1]()
        }
    }
})


// let state={
//     setState(name,value){
//         this[name]=value
//     }
// }

// const form=document.querySelector("form")
// const inputs=document.querySelectorAll("input")
// const textarea=document.querySelector("textarea")


// function handleChange(e){
//     let {name,value,files}=e.target
    
//         if(name=="profileImage"){
//             value=files[0]
        
//             const reader=new FileReader();
//             reader.onload=function(){
//                 form.style.backgroundImage=`url(${reader.result})`
//                 form.style.backgroundSize="100% 100%"
//             };
//             reader.readAsDataURL(value)
            
//             state.setState(name,value)

//         }else{
//             state.setState(name,value)
//         }
//     }
  

// function checkPassword(e){
//     let {name,value}=e.target
//     if(name=="re-password"){
//         state.password!=value?e.target.parentElement.style.borderBottom="3px solid red":e.target.parentElement.style.borderBottom="3px solid black"
//     }else{
//         return
//     }
// }




// function handleSubmit(e){
//     e.preventDefault()

//     let {name,email,password,address,profileImage}=state
//     if(!name||!email||!password||!address||!profileImage){
//         alert("All Fileds are mandatory")
//         return
//     }

//     // console.log(password,state);
//     if(password!=state["re-password"]){
//         alert("password and re-password should be same")
//         return
//     }
    
//     let payload={name,email,password,address,profileImage}
//     // console.log(payload);

//     let formData=new FormData()
//     for(let data in payload){
//         formData.append(data,payload[data])
//     }
    
//     (async()=>{
//         try {
//             let res=await fetch("http://localhost:5000/api/auth/register",{
//             method:"POST",
//             body:formData
//         })
//         let data=await res.json()
//         console.log(data);
//         } catch (error) {
//             alert("something went wrong")
//         }
        
        
//     })()
        
// }

// form.addEventListener("submit",handleSubmit)

// inputs.forEach(input=>{
//     input.addEventListener("change",handleChange)
// })

// inputs.forEach(input=>{
//     input.addEventListener("input",checkPassword)
// })

// textarea.addEventListener("change",handleChange)

