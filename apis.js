function printName(){
    let form = document.getElementById("nameForm")
   let firstName = form.fname.value;
   console.log(form)
   console.log(firstName)
   let output = document.getElementById("textEntry")
   output.value = `Hello ${firstName}. Hope you're well.`
  }