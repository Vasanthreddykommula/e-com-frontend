let addproduct=()=>{
    return`
    <h1>add form</h1>
    `
}

    let state={
    setState(name,value){
        this[name]=value
    }
}

const form=document.querySelector("form")
const inputs=document.querySelectorAll("input")
const textarea=document.querySelector("textarea")
const select=document.querySelector("select")
const h1=document.querySelector("h1")


function handleChange(e){
    let {name,value,files}=e.target
    
        if(name!="image"){
            state.setState(name,value)
        }else{
             value=files[0]
        
            const reader=new FileReader();
            reader.onload=function(){
                form.style.transform="rotatey(180deg)"
                
                setTimeout(()=>{
                                    form.style.backgroundImage=`url(${reader.result})`
                form.style.backgroundSize="100% 100%"
                inputs.forEach((inp)=>{
                    inp.parentElement.style.display="none"
                })
                textarea.parentElement.style.display="none"
                select.parentElement.style.display="none"
                h1.parentElement.style.display="none"
                form.style.justifyContent="end"
                form.innerHTML=`
                <div>
                    <button style="transform:rotatey(180deg)">Submit</button>
                </div>
                `

                },800)
            };
            reader.readAsDataURL(value)
            

            state.setState(name,value)
        }
    }
  

function handleSubmit(e){
    e.preventDefault()

    let {title,price,description,image,categoery}=state
    
    // console.log(password,state);
    
    let payload={title,price,description,image,categoery}
    console.log(payload);

    let formData=new FormData()
    for(let data in payload){
        formData.append(data,payload[data])
    };
    
    // (async()=>{
    //     try {
    //         let res=await fetch("http://localhost:5000/api/auth/register",{
    //         method:"POST",
    //         body:formData
    //     })
    //     let data=await res.json()
    //     console.log(data);
    //     } catch (error) {
    //         alert("something went wrong")
    //     }
        
        
    // })()
        
}

form.addEventListener("submit",handleSubmit)

inputs.forEach(input=>{
    input.addEventListener("change",handleChange)
})

textarea.addEventListener("change",handleChange)

select.addEventListener("change",handleChange)




export default addproduct

