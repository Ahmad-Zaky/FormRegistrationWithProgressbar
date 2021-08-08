// Code By Webdevtrick ( https://webdevtrick.com ) 
$(document).ready(function() {

    
    var sumbitBtn = document.getElementById('submit')
    sumbitBtn.disabled = true
    
    // Progress bar speed    
    var secondFraction = '0.3'
    $('#password-strength').css('transition', 'width '+secondFraction+'s ease');
    
    // Validate Upper Fields (Name, Username, Email)
    document.getElementsByName("name")[0].onkeyup = e => {checkRequiredField(e, 'name')}
    document.getElementsByName("username")[0].onkeyup = e => {checkRequiredField(e, 'username')}
    document.getElementsByName("email")[0].onkeyup = e => {checkRequiredField(e, 'email'); validateEmail(e)}

    function checkRequiredField(e, name) {
        
        // Input Styling
        $('input[name="'+name+'"]').addClass('invalid-input')
        $('input[name="'+name+'"]').removeClass('valid-input')
        
        // Validation Styling
        $('.'+name+'-validate').removeClass('text-success');
        $('.'+name+'-validate i').addClass('fa-times').removeClass('fa-check');            
        
        if (e.target.value) {
            $('input[name="'+name+'"]').removeClass('invalid-input')
            $('input[name="'+name+'"]').addClass('valid-input')
            
            // Validation Styling
            $('.'+name+'-validate').addClass('text-success');
            $('.'+name+'-validate i').removeClass('fa-times').addClass('fa-check');
        }

        validateAll()
    }

    function validateEmail(e) {
        
        let email = e.target.value

        const matched = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

        // Input Styling
        $('input[name="email"]').addClass('invalid-input')
        $('input[name="email"]').removeClass('valid-input')
        
        // Validation Styling
        $('.email-validate').removeClass('text-success');
        $('.email-validate i').addClass('fa-times').removeClass('fa-check');            
        
        if (matched) {
            $('input[name="email"]').removeClass('invalid-input')
            $('input[name="email"]').addClass('valid-input')
            
            // Validation Styling
            $('.email-validate').addClass('text-success');
            $('.email-validate i').removeClass('fa-times').addClass('fa-check');
        }

        validateAll()
    }

    // Validate Password
    $('#password').keyup(function() {

        var password = $('#password').val();
        checkStrength(password)
        validateAll()
    });
    
    // Validate Confirm Password
    $('#confirm-password').keyup(function() {
        
        notMatchedHandler()
        if ($('#password').val() && $('#password').val() === $('#confirm-password').val())
            matchedHandler()

        validateAll()
    });

    function matchedHandler() {
        $('.password-matched').addClass('text-success');
        $('.password-matched i').removeClass('fa-times').addClass('fa-check');
        
        if ($('#password').val()) {
            
            // Progress bar Complete
            $('#password-strength').removeClass('progress-bar-warning');
            $('#password-strength').addClass('progress-bar-success');
            $('#result').addClass('text-success').text('Strength');
            $('#password-strength').css('width', '100%');
        }

        $('#confirm-password').removeClass('invalid-input')
        $('#confirm-password').addClass('valid-input')
        
        $('#popover-cpassword').addClass('hide');
    }

    function notMatchedHandler() {
        $('#popover-cpassword').removeClass('hide');
        
        
        // Prevent if password is empty
        if ($('#password').val()) {

            // Progress bar Complete
            $('#password-strength').removeClass('progress-bar-success');
            $('#password-strength').addClass('progress-bar-warning');
            $('#result').addClass('text-success').text('Strength');
            $('#password-strength').css('width', '80%');
        }

        $('.password-matched').removeClass('text-success');
        $('.password-matched i').addClass('fa-times').removeClass('fa-check');  

        $('#confirm-password').addClass('invalid-input')
        $('#confirm-password').removeClass('valid-input')
    }

    function checkStrength(password) {
        var strength = 0;


        //If password contains both lower and uppercase characters, increase strength value.
        if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
            strength += 1;
            $('.low-upper-case').addClass('text-success');
            $('.low-upper-case i').removeClass('fa-times').addClass('fa-check');
            $('#popover-password-top').addClass('hide');


        } else {
            $('.low-upper-case').removeClass('text-success');
            $('.low-upper-case i').addClass('fa-times').removeClass('fa-check');
            $('#popover-password-top').removeClass('hide');
        }

        //If it has numbers and characters, increase strength value.
        if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) {
            strength += 1;
            $('.one-number').addClass('text-success');
            $('.one-number i').removeClass('fa-times').addClass('fa-check');
            $('#popover-password-top').addClass('hide');

        } else {
            $('.one-number').removeClass('text-success');
            $('.one-number i').addClass('fa-times').removeClass('fa-check');
            $('#popover-password-top').removeClass('hide');
        }

        //If it has one special character, increase strength value.
        if (password.match(/([!,%,&,@,#,$,^,*,?,_,~,-,/])/)) {
            strength += 1;
            $('.one-special-char').addClass('text-success');
            $('.one-special-char i').removeClass('fa-times').addClass('fa-check');
            $('#popover-password-top').addClass('hide');

        } else {
            $('.one-special-char').removeClass('text-success');
            $('.one-special-char i').addClass('fa-times').removeClass('fa-check');
            $('#popover-password-top').removeClass('hide');
        }

        if (password.length > 7) {
            strength += 1;
            $('.eight-character').addClass('text-success');
            $('.eight-character i').removeClass('fa-times').addClass('fa-check');
            $('#popover-password-top').addClass('hide');

        } else {
            $('.eight-character').removeClass('text-success');
            $('.eight-character i').addClass('fa-times').removeClass('fa-check');
            $('#popover-password-top').removeClass('hide');
        }

        // By Default Red Invalid Password Input
        $('#password').addClass('invalid-input')

        // If value is less than 2
        if (strength < 2) {
            $('#result').removeClass()
            $('#password-strength').addClass('progress-bar-danger');
            $('#result').addClass('text-danger').text('Very Week');
            $('#password-strength').css('width', '10%');
        } else if (strength == 2) {
            $('#result').addClass('good');
            $('#password-strength').removeClass('progress-bar-danger');
            $('#password-strength').addClass('progress-bar-warning');
            $('#result').addClass('text-warning').text('Week')
            $('#password-strength').css('width', '40%');
        } else if (strength == 4) {
            $('#result').removeClass()
            $('#result').addClass('strong');
            
            $('#password-strength').removeClass('progress-bar-warning');
            $('#password-strength').addClass('progress-bar-warning');
            
            $('#result').addClass('text-warning').text('Strength');
            $('#password-strength').css('width', '80%');
            
            $('#password').removeClass('invalid-input')
            $('#password').addClass('valid-input')

            // Handle Matched Password
            matchedHandler()
            if ($('#password').val() != $('#confirm-password').val())
                notMatchedHandler()

            return true
        }

        return false
    }

    function onSubmit() {
        document.getElementById('submit').closest('form').onsubmit = e => {
            if (!validateAll()) e.preventDefault()
        }
    }

    function validateAll() {
        sumbitBtn.disabled = true
        if (!document.getElementsByClassName("fa-times").length) sumbitBtn.disabled = false
    }

});
