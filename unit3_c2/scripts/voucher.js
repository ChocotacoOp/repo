

main()
var userdata=JSON.parse(localStorage.getItem("user"))
async function main()
{
  var res=getdata()
  var data= await res
  console.log(data)
  append(data)
 
  var balance=userdata.wallet
  document.querySelector("#wallet_balance").innerText=balance

}

async function getdata()
{
    try
    {
        const url=`https://masai-vouchers-api.herokuapp.com/api/vouchers`
        var res= await fetch(url)
        var data=await res.json()
       
        return data[0].vouchers
    }
    catch(error)
    {
        console.log(error)
    }
}

function append(data)
{
   var container=document.querySelector("#voucher_list")
   
   data.forEach(function(el)
   {
       var div=document.createElement("div")
       div.setAttribute("class","voucher")
       
       var image=document.createElement("img")
       image.src=el.image

       var name=document.createElement("p")
       name.innerText=el.name

       var price=document.createElement("p")
       price.innerText=el.price

       var btn=document.createElement("button")
       btn.innerText="BUY"
       btn.setAttribute("class","buy_voucher")
       btn.addEventListener("click",function()
       {
           addvoucher(el)
       })

       div.append(image,name,price,btn)
       container.append(div)

   })
}

function addvoucher(el)
{
    var balance=userdata.wallet
    if(balance<el.price)
    {
        alert("Sorry! insufficient balance")
    }
    else
    {
       alert("Hurray! purchase successful")
       balance=balance-el.price
       userdata.wallet=balance
       document.querySelector("#wallet_balance").innerText=balance
       localStorage.setItem("user",JSON.stringify(userdata))


       var purchase_array=JSON.parse(localStorage.getItem("purchase"))|| []
       purchase_array.push(el)
       localStorage.setItem("purchase",JSON.stringify(purchase_array))
    }
}