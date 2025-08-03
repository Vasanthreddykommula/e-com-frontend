import addproduct, { handleProductBind } from "./addproduct.js"

let home=()=>{

setTimeout(() => {
    let anchor=document.querySelector("#add")
    const handleClickAnchor=(e)=>{
        e.preventDefault()
        history.pushState({},"",`${e.target.pathname}`)
        root.innerHTML=addproduct();
        handleProductBind()
        
        
    }

    anchor.addEventListener("click",handleClickAnchor)
 
});

    try{
        let body=document.body
        let div=document.querySelector("#product")
        // let form = document.querySelector("form");
        let inputs = document.querySelector("input");
        // let prod = document.querySelector(".products");
        let allProducts = [];

        async function Getdata() {
            // let data=await fetch("https://fakestoreapi.com/products");
            let data=await fetch("http://localhost:5000/api/products/all");
            let jsonData= await data.json();
            allProducts = jsonData;
            console.log(allProducts);
            displayproducts(allProducts);
        }

        function displayproducts(products){
                    div.innerHTML='';
                    products.forEach((ele)=>{
                        div.innerHTML+=`
                        
                            <div class="container">
                            <img src="${ele.image}" alt="" class="img">
                            <div class="title">${ele.title}</div>
                            <div class="price">₹ ${ele.price}</div>
                            <div class="description">${ele.description}</div>
                            <div class="cat">${ele.categoery}</div>
                            <div class="btn"><button>Add to Cart</button></div>
                            </div>
                        
                        `

                    }); 
            }
        inputs.addEventListener("input", (e)=>{
            let val = e.target.value.toLowerCase();
            let filtered = allProducts.filter((item) =>
            item.title.toLowerCase().includes(val)
            );
            displayproducts(filtered);
        });
                
        Getdata()
    }catch (error){
            console.log(error)
        }


    return `
        <a href="addproduct" id="add">Add Products</a>
    `
}


export default home

