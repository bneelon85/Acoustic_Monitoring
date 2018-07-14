$(document).ready(function () {
  // SUBMIT FORM
  $('#shot-form').submit(function (event) {
    // Prevent the form from submitting via the browser.
    event.preventDefault()
    ajaxPost()
  })

  function ajaxPost () {
    // PREPARE FORM DATA

    var formData = {
      dateTime: $('#dateTime').val(),
      acqPoint: $('#acqPoint').val(),
      acTrvl: $('#acTrvl').val(),
      surfPress: $('#surfPress').val(),
      fluidDensity: $('#fluidDensity').val(),
      comments: $('#comments').val(),
    }
    console.log(formData)

    axios
      .post('/shot_stats', formData)
      .then(function (res) {
        console.log(res)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
})
