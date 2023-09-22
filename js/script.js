let name=document.getElementById("proName")
let catagroy=document.getElementById("proCata")
let price=document.getElementById("proprice")
let description=document.getElementById("proDes")
let img=document.getElementById("proimg")
let showpro = document.getElementById("showpro")
let noDis=document.getElementById("no")
let yesDis=document.getElementById("yes")
let proDis = document.getElementById("proDis")
let labelpro=document.getElementById("showLabel")
let search=document.getElementById("search")
let submit = document.getElementById("submit")
let update = document.getElementById("update")
let index;
let proArr=[]
let protuctObj;

yesDis.addEventListener("click", function(){
    proDis.style.display="block"
    labelpro.style.display="block"
})

noDis.addEventListener("click", function(){
    proDis.style.display="none"
    labelpro.style.display="none"
})

if(JSON.parse(localStorage.getItem("proData"))!=null){
    proArr=JSON.parse(localStorage.getItem("proData"))
    showData(proArr)
    
}else{
    proArr=[]
}

function submitData(){
     let newPrice
    if(yesDis.value){
        newPrice=Number(price.value)-Number(price.value)*Number(proDis.value/100)
        protuctObj={
            name:name.value,
            catagroy:catagroy.value,
            price:price.value,
            newPrice:newPrice,
            dicount:proDis.value+"%",
            img:"images/"+img.files[0].name,
            description:description.value
        }
        
    }else if(noDis.value){
        protuctObj={
            name:name.value,
            catagroy:catagroy.value,
            price:price.value,
            img:"images/"+img.files[0].name,
            description:description.value
        }
       
    }
    proArr.push(protuctObj)
    showData(proArr)
    localStorage.setItem("proData",JSON.stringify( proArr))
    
    clearData()
}

function clearData(){
    name.value=""
    catagroy.value=""
    price.value=""
    description.value=""
    proDis.value=""
    img.value=""
}

function showData(proArr){
    let proList=``
    for(let i=0;i<proArr.length;i++){
        if(proArr[i].dicount=="%"){
        proList+=`
        <div class="col-12 col-lg-3  my-4 d-flex flex-column align-items-center border border-3 border-secondary rounded-3 gap-3 py-3">
        <h4>${proArr[i].name}</h4>
        <div class=" imgHover"  style="background-image: url(${proArr[i].img});
        background-position: center center;width: 250px; height:250px ;background-repeat: no-repeat;
        background-size: contain;">
        </div>
        <div>
        <p>${proArr[i].description}</p>
            <h6>Price: ${proArr[i].price}</h6>
            <p>The Catagroy : ${proArr[i].catagroy}</p>
        </div>
        <div>
        <button class=" border border-0" onclick="updatePro(${i})"><a class="btn btn-success" href="#formid">Update</a></button>
        <button class="btn btn-danger" onclick="deletePro(${i})">Delete</button>
        </div>
    </div>`
    }
    else{
        proList+=`<div class="col-12 col-lg-3 d-flex flex-column align-items-center border border-3 border-secondary rounded-3 gap-3 py-3">
        <h4>${proArr[i].name}</h4>
        <div class="position-relative imgHover"  style="background-image: url(${proArr[i].img});
        background-position: center center;width: 250px; height:250px ;background-repeat: no-repeat;
        background-size: contain;">
        <p class="text-white bg-danger position-absolute  m-0 end-0 bottom-0">Discount : ${proArr[i].dicount}</p>
        </div>
        <div>
        <p>${proArr[i].description}</p>
            <h6>Price :${proArr[i].newPrice}EGP  <span><sup><del>${proArr[i].price}EGP</del></sup></span></h6>
            <p>The Catagroy : ${proArr[i].catagroy}</p>
        </div>
        <div>
        <button class=" border border-0" onclick="updatePro(${i})"><a class="btn btn-success" href="#formid">Update</a></button>
        <button class="btn btn-danger" onclick="deletePro(${i})">Delete</button>
        </div>
    </div>`
    }}
    showpro.innerHTML=proList
  
}

function deletePro(n){
proArr.splice(n,1)
showData(proArr)
localStorage.setItem("proData",JSON.stringify( proArr))
}

function updatePro(n){
    index=n
    if(proArr[n].dicount=="%"){
        name.value=proArr[n].name
        catagroy.value=proArr[n].catagroy
        price.value=proArr[n].price
        description.value=proArr[n].description
        proDis.style.display="none"
        labelpro.style.display="none"
        noDis.setAttribute("checked","")
    }else{
        yesDis.setAttribute("checked",""),
        proDis.style.display="block"
        labelpro.style.display="block"
        name.value=proArr[n].name
        catagroy.value=proArr[n].catagroy
        price.value=proArr[n].price
        description.value=proArr[n].description
        proDis.value=proArr[n].dicount.replace("%","")
    }
    submit.style.display='none'
    update.style.display='block'
    showpro.innerHTML=""
}

function updateData(){
    let newPrice;
    let newObj;
        newPrice=Number(price.value)-Number(price.value)*Number(proDis.value/100)
        newObj={
            name:name.value,
            catagroy:catagroy.value,
            price:price.value,
            newPrice:newPrice,
            dicount:proDis.value+"%",
            description:description.value,
            img:"images/"+img.files[0].name
        }
    proArr[index]=newObj
    showData(proArr)
    clearData()
    submit.style.display='block'
    update.style.display='none'
    proDis.style.display="none"
    labelpro.style.display="none"
    localStorage.setItem("proData",JSON.stringify(proArr))
}

function searchData(n) {
    let newSearchArr=[]
    proArr.find(function(e){
        if(e.name.toLowerCase().includes(n.toLowerCase())==true){
            newSearchArr.push(e)
        }
    })
    showData(newSearchArr)
}