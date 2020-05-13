    $(document).ready(function(){
    $( ".btn.btn-success " ).click(function(){
       $(".text").append("<div class='row'>" +
        "<div class='col-lg-6 text-left'><input class='form-control' placeholder=Username aria-label=Username aria-describedby=basic-addon1></div>" +
        "<div class='col-lg-6 text-right'>"+"<select class='browser-default custom-select'><option value=1>Datatypes</option></select>"+"</div>"+"</div>");
   });
  }); 
