let register=()=>{
    return `
<div class="register">
    <form action="">
        <div>
            <h1>Register</h1>
        </div>
        <div>
            <input type="text" name="name" placeholder="Name">
            <span><i class="fa-solid fa-signature"></i></span>
        </div>
        <div>
            <input type="email" name="email" placeholder="Email">
            <span><i class="fa-solid fa-envelope"></i></span>
        </div>
        <div>
            <input type="password" name="password" placeholder="Password" pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[!@#$%&*])[A-Za-z\\d!@#$%&*]{8,}$">
            <span><i class="fa-solid fa-lock"></i></span>
        </div>
        <div>
            <input type="password" name="re-password" placeholder="Re-password">
            <span><i class="fa-solid fa-repeat"></i></span>
        </div>
        <div>
            <textarea name="address" placeholder="Address"></textarea >
            <span><i class="fa-solid fa-location-dot"></i></span>
        </div>
        <div>
            <input type="file" accept="image/*" name="profileImage">
        </div>
        <div>
            <button>Submit</button>
        </div>

    </form>
</div>

    `
}

export let handleRegisterBind=()=>{
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
    
        if(name=="profileImage"){
            value=files[0]
        
            const reader=new FileReader();
            reader.onload=function(){
                form.style.backgroundImage=`url(${reader.result})`
                form.style.backgroundSize="100% 100%"
            };
            reader.readAsDataURL(value)
            
            state.setState(name,value)

        }else{
            state.setState(name,value)
        }
    }
  

function checkPassword(e){
    let {name,value}=e.target
    if(name=="re-password"){
        state.password!=value?e.target.parentElement.style.borderBottom="3px solid red":e.target.parentElement.style.borderBottom="3px solid black"
    }else{
        return
    }
}




function handleSubmit(e){
    e.preventDefault()

    let {name,email,password,address,profileImage}=state
    if(!name||!email||!password||!address||!profileImage){
        alert("All Fileds are mandatory")
        return
    }

    // console.log(password,state);
    if(password!=state["re-password"]){
        alert("password and re-password should be same")
        return
    }
    
    let payload={name,email,password,address,profileImage}
    // console.log(payload);

    let formData=new FormData()
    for(let data in payload){
        formData.append(data,payload[data])
    };
    
    (async()=>{
        try {
            let res=await fetch("http://localhost:5000/api/auth/register",{
            method:"POST",
            body:formData
        })
        let data=await res.json()
        console.log(data);
        } catch (error) {
            alert("something went wrong")
        }
        
        
    })()
        
}

form.addEventListener("submit",handleSubmit)

inputs.forEach(input=>{
    input.addEventListener("change",handleChange)
})

inputs.forEach(input=>{
    input.addEventListener("input",checkPassword)
})

textarea.addEventListener("change",handleChange)



}

export default register