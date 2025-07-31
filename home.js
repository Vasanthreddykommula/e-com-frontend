import addproduct from "./addproduct.js"

let home=()=>{

setTimeout(() => {
    let anchor=document.querySelector("#add")
    const handleClickAnchor=(e)=>{
        e.preventDefault()
        history.pushState({},"",`${e.target.pathname}`)
        root.innerHTML=addproduct()
        
        
    }

    anchor.addEventListener("click",handleClickAnchor)
 
});

    return `
        <h1>Home</h1>
        <a href="addproduct" id="add">Add Products</a>
    `
}


export default home

