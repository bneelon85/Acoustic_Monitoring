$(document).ready(function () {
  // SUBMIT FORM
  $('#info-form').submit(function (event) {
    // Prevent the form from submitting via the browser.
    event.preventDefault()
    ajaxPost()
  })

  function ajaxPost () {
    // PREPARE FORM DATA

    var formData = {
      companyName: $('#companyName').val(),
      wellName: $('#wellName').val(),
      location: $('#location').val(),
      ocsg: $('#ocsg').val(),
      kbMSL: $('#kbMSL').val(),
      kbTHF: $('#kbTHF').val(),
      perfMDmin: $('#perfMDmin').val(),
      perfMDmax: $('#perfMDmax').val(),
      perfTVDmin: $('#perfTVDmin').val(),
      perfTVDmax: $('#perfTVDmax').val(),
      bhp: $('#bhp').val(),
      acVelo: $('#acVelo').val()
    }
    console.log(formData)

    axios
      .post('/well_info', formData)
      .then(function (res) {
        console.log(res)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
})
