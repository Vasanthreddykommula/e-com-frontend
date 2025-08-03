import home from "./home.js"

let addproduct=()=>{
    return`
    <div class="register">
    <form action="">
        <div>
            <h1>Add Product</h1>
        </div>
        <div>
            <input type="text" name="title" placeholder="Title">
            
        </div>
        <div>
            <input type="number" name="price" placeholder="Price">
            
        </div>
        <div>
            <select name="categoery">
                <option value="" selected disabled>Select Categoery</option>
                <option value="mens">Mens Wear</option>
                <option value="womens">Womens Wear</option>
                <option value="kids">Kids Wear</option>
                <option value="electronics">Electronics</option>
            </select>
        </div>
        <div>
            <textarea name="description" placeholder="Description"></textarea >
            
        </div>
        <div class="removeborder">
            <input type="file" accept="image/*" name="image">
        </div>


        </form>
    </div>

    `
}

export let handleProductBind=()=>{

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
            form.style.transform="rotateY(180deg)"
            form.style.backgroundSize="100% 100%"
                
            setTimeout(()=>{
            form.style.backgroundImage=`url(${reader.result})`
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
    
    (async()=>{
        try {
            let res=await fetch("http://localhost:5000/api/products/add",{
            method:"POST",
            body:formData
        })
        let data=await res.json()
        console.log(res);
        console.log(data);
        if(res.status===201){
            alert(`${data.message}`)
            history.pushState({},"","home")
            ShadowRoot.innerHTML= home()
            
        }else{
            alert("something went wrong")            
        }
        }catch (error) {
            console.log(error);
            
            alert("something went wrong")
        }
        
        
    })()
        
}

form.addEventListener("submit",handleSubmit)

inputs.forEach(input=>{
    input.addEventListener("change",handleChange)
})

textarea.addEventListener("change",handleChange)

select.addEventListener("change",handleChange)

}


export default addproduct

