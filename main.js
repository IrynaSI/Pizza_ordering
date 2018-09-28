if(window.addEventListener) window.addEventListener("load", init,false);
  else if(window.attachEvent) window.attachEvent("onload",init);
    
  function init(){
   getId("ok").addEventListener("click",closeOrder);
   getId("cancel").addEventListener("click",closeOrder);
   getId("city").addEventListener("click",selectCity);
   var ps=document.getElementsByName("PizzaRadio");
   for(var i=0;i<ps.length;i++){
   ps[i].addEventListener("click",pizzaSize);
   }

   var pf=document.getElementsByName("filling");
   for(var i=0;i<pf.length;i++){
   pf[i].addEventListener("click",pizzaFilling)
   }
   validation();
  // for(var i=0; i<document.forms.length;i++){
  //    var form=document.forms[i];
  //    form.onsubmit=validateForm;
  //       for(var j=0; j<form.elements.length;j++){
  //        var element=form.elements[j];
  //        element.onchange=validateInput;
  //      }
  //    }
}


    var pizza={
      basePrice:"",
      size:"",
      filling:"",
      priceFil:"",
      sum:0,
      topping:"",
      valid:"",
    }

function pizzaSize(e){
    pizza.size=e.target.id;  
    pizza.basePrice=parseInt(e.target.value);
    getId("prc").innerHTML=pizza.basePrice+pizza.sum;
}

function pizzaFilling(e){
      pizza.filling=e.target.value.split("+")[0];
      pizza.priceFil=parseInt(e.target.value.split("+")[1]);
      pizza.topping+=e.target.value.split("+")[2]+"<br/>";
          if(e.target.checked){
          pizza.sum=pizza.sum+pizza.priceFil; 
            for(var i=0;i<document.images.length;i++){
              if(document.images[i].getAttribute("src")==pizza.filling)//document.images- всі img на сторінці
                document.images[i].style.display="block"; 
            }
            
           }  
                else{
                if (pizza.sum<=0){return;}
          pizza.sum=pizza.sum-pizza.priceFil; 
               for(var i=0;i<document.images.length;i++){
              if(document.images[i].getAttribute("src")==pizza.filling)
                document.images[i].style.display="none";
                }
            } 
          getId("prc").innerHTML=pizza.sum+pizza.basePrice;         
}

function getId(id){
      return document.getElementById(id);
}

function validation(){
  for(var i=0; i<document.forms.length;i++){
    var form=document.forms[i];
    var formValidation=false;
    for(var j=0; j<form.elements.length;j++){
      var element=form.elements[j];
      if(element.type!="text"){continue;}
      var pattern=element.getAttribute("data-val");
      if(pattern){
        element.onchange=validateInput;
        formValidation=true;
      }
      if (formValidation){
        getId("submit").onclick=validateForm;
      }
    }
  }
}
function validateInput(){
  var inputPattern=this.dataset.val;
  var msg=this.dataset.valMsg;
  var myId=this.dataset.valMsgId;
  var value=this.value;

  var res=value.search(inputPattern);
  if(res==-1){

    document.getElementById(myId).innerHTML= msg;
    document.getElementById(myId).style.display="block";
    this.className="invalid";
  }

  else{
    document.getElementById(myId).innerHTML="";
    this.className="valid";
  }
}

function validateForm(){

 var invalid=false;
 for(var i=0; i<document.forms.length;i++){
     var form=document.forms[i];
        for(var j=0; j<form.elements.length;j++){
         var element=form.elements[j];
  if(element.type=="text"&&element.onchange!=null){
    element.onchange();
    if(element.className=="invalid")invalid=true;
  }
}
 }if(invalid){
  alert("please fill all customer`s fields correctly");
 }
 else{
  output();
 }       
}

function output(){
  if(pizza.size==""){
     alert("please select pizza size");
    getId("radioDiv").style.border="solid 1px red";
  }
  if(pizza.size!=""){
    getId("radioDiv").style.border="none";
  }
 if(pizza.topping==""){
  alert("please select pizza topping");
  getId("checkboxDiv").style.border="solid 1px red";
}
if(pizza.topping!=""){
  getId("checkboxDiv").style.border="none";
}
  if(pizza.size!=""&&pizza.topping!=""&&pizza.sum!=0&&pizza.basePrice!=""){
    getId("radioDiv").style.border="none";
    getId("checkboxDiv").style.border="none";
  getId("order").style.display="block";
   getId("ok").style.display="block";
    getId("cancel").style.display="block";

  var p=pizza.sum+pizza.basePrice;
  getId("orderContent").innerHTML="price:"+p+"<br/>"+"size: "+pizza.size+"<br/>" +"topping:"+pizza.topping;
 }
}

  function closeOrder(){
    getId("order").style.display="none";
     getId("ok").style.display="none";
     getId("cancel").style.display="none";
  }

function selectCity(){
  var cities=getId("city").options;
  for(var i=0;i<cities.length;i++){
    if(this.value==cities[i].value)
    {
      return this.value;
    }
  }
}