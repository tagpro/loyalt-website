// $(function() {

//     $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
//       preventSubmit: true,
//       submitError: function($form, event, errors) {
//         // additional error messages or events
//       },
//       submitSuccess: function($form, event) {
//         event.preventDefault(); // prevent default submit behaviour
//         // get values from FORM
//         var name = $("input#name").val();
//         var last_name = $("input#last_name").val();
//         var email = $("input#email").val();
//         var message = $("textarea#message").val();
//         var firstName = name; // For Success/Failure Message
//         // Check for white space in name for Success/Fail message
//         if (firstName.indexOf(' ') >= 0) {
//           firstName = name.split(' ').slice(0, -1).join(' ');
//         }
//         $this = $("#sendMessageButton");
//         $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
//         $.ajax({
//           url: "http://localhost:8000/core/customer/contact-us/",
//           type: "POST",
//           data: {
//             full_name: name,
//             business_name: business_name,
//             email: mail,
//             comment: message
//           },
//           cache: false,
//           success: function() {
//             // Success message
//             $('#success').html("<div class='alert alert-success'>");
//             $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
//               .append("</button>");
//             $('#success > .alert-success')
//               .append("<strong>Your message has been sent. </strong>");
//             $('#success > .alert-success')
//               .append('</div>');
//             //clear all fields
//             $('#contactForm').trigger("reset");
//           },
//           error: function() {
//             // Fail message
//             $('#success').html("<div class='alert alert-danger'>");
//             $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
//               .append("</button>");
//             $('#success > .alert-danger').append($("<strong>").text("Sorry " + name + ", it seems that my mail server is not responding. Please try again later!"));
//             $('#success > .alert-danger').append('</div>');
//             //clear all fields
//             $('#contactForm').trigger("reset");
//           },
//           timeout: 10000,
//           complete: function() {
//             setTimeout(function() {
//               $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
//             }, 1000);
//           }
//         });
//       },
//       filter: function() {
//         return $(this).is(":visible");
//       },
//     });
  
//     $("a[data-toggle=\"tab\"]").click(function(e) {
//       e.preventDefault();
//       $(this).tab("show");
//     });
//   });
  
//   /*When clicking on Full hide fail/success boxes */
//   $('#name').focus(function() {
//     $('#success').html('');
//   });


  $("#contactForm").submit(function(event) {
    $(this).find('input[type="submit"]').attr('disabled','disabled');
    /* stop form from submitting normally */
    event.preventDefault();
  
    var url = "https://api.ellipso.com.au/core/customer/contact-us/";
  
    /* Send the data using post with element id name and name2*/
    var posting = $.post(url, {
      // name: $('#name').val(),
      // name2: $('#name2').val(),
      full_name: $('#name').val(),
      business_name: $('#business_name').val(),
      email: $('#mail').val(),
      comment: $('#message').val(),
    });
  
    /* Alerts the results */
    posting.done(function(data) {
      // $('#success').text('success');
      $('#success').html("<div class='alert alert-success'>");
      $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
        .append("</button>");
      $('#success > .alert-success')
        .append("<strong>Your message has been sent. </strong>");
      $('#success > .alert-success')
        .append('</div>');
      //clear all fields
      $('#contactForm').trigger("reset");
      setTimeout(function(){$( "#sendMessageButton" ).removeAttr('disabled');},5000);

    });
    posting.fail(function() {
      $('#success').html("<div class='alert alert-danger'>");
      $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
        .append("</button>");
      $('#success > .alert-danger').append($("<strong> Sorry " + $('#name').val() + ", it seems that my mail server is not responding. Please try again later!  </strong>"));
      $('#success > .alert-danger').append('</div>');
      setTimeout(function(){$( "#sendMessageButton" ).removeAttr('disabled');},5000);

      //clear all fields
    });
  });