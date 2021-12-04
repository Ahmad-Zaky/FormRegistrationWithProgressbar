$(document).ready(function() {

    // Themes Color
    $('.gradient').on('click', e => {themesColorHandler(e)})
    function themesColorHandler(e) {
        
        const className = e.target.parentNode.className
        
        const themes = getThemes()
        const brightThemes = getBrightThemes()
        const darkThemes = getDarkThemes()
        const redInvalidColorThemes = getRedInvalidColorThemes()

        // Normal Coloring
        handleNormalThemeColoring(themes, className)
        
        // Disabled Hover Coloring
        handleHoverThemeColoring(themes, className)
        
        // Disabled Coloring
        handleDisabledThemeColoring(themes, className)
        
        // Adjusting Font Colors
        handleFontThemeColoring(className, brightThemes, darkThemes)
        
        // Adjust Input Border Color if invalid input
        handleInvalidInputThemeColoring(themes, className, redInvalidColorThemes)
        
        // Adjust Progress bar color
        handleProgressbarThemeColoring(themes, className)
    }
    
    function handleNormalThemeColoring(themes, className) {
        document.documentElement.style.setProperty('--start-color', themes[className].start)
        document.documentElement.style.setProperty('--end-color', themes[className].end)
    }
    
    function handleHoverThemeColoring(themes, className) {
        document.documentElement.style.setProperty('--start-color-fadded', themes[className].start)
        document.documentElement.style.setProperty('--end-color-fadded', themes[className].end)
    }
    
    function handleDisabledThemeColoring(themes, className) {
        document.documentElement.style.setProperty('--color-disabled', themes[className].start)
    }
    
    function handleFontThemeColoring(className, brightThemes, darkThemes) {
        if (brightThemes.indexOf(className) != -1) {
            document.documentElement.style.setProperty('--color-font', '#000')
        } 
        
        if (darkThemes.indexOf(className) != -1) {
            document.documentElement.style.setProperty('--color-font', '#fff')
        }
    }
    
    function handleInvalidInputThemeColoring(themes, className, redInvalidColorThemes) {
        const invalidTheme = (redInvalidColorThemes.indexOf(className) != -1) ? 'red' : themes[className].start
        document.documentElement.style.setProperty('--invlid-input-color', invalidTheme)
    }
    
    function handleProgressbarThemeColoring(themes, className) {
        document.documentElement.style.setProperty('--progress-color', themes[className].start)
    }

    function getThemes() {

        return  {
            "gradient--1": {
                'start': "#6DE195",
                 'end': "#C4E759"
            },
            "gradient--2": {
                'start': "#41C7AF",
                 'end': "#54E38E"
            },
            "gradient--3": {
                'start': "#99E5A2",
                 'end': "#D4FC78"
            },
            "gradient--4": {
                'start': "#ABC7FF",
                 'end': "#C1E3FF"
            },
            "gradient--5": {
                'start': "#6CACFF",
                 'end': "#8DEBFF"
            },
            "gradient--6": {
                'start': "#5583EE",
                 'end': "#41D8DD"
            },
            "gradient--7": {
                'start': "#A16BFE",
                 'end': "#DEB0DF"
            },
            "gradient--8": {
                'start': "#D279EE",
                 'end': "#F8C390"
            },
            "gradient--9": {
                'start': "#F78FAD",
                 'end': "#FDEB82"
            },
            "gradient--10": {
                'start': "#BC3D2F",
                 'end': "#A16BFE"
            },
            "gradient--11": {
                'start': "#A43AB2",
                 'end': "#E13680"
            },
            "gradient--12": {
                'start': "#9D2E7D",
                 'end': "#E16E93"
            },
            "gradient--13": {
                'start': "#f11212",
                'end': "#e68271"
            },
            "gradient--14": {
                'start': "#F5CCF6",
                 'end': "#F1EEF9"
            },
            "gradient--15": {
                'start': "#F0EFF0",
                 'end': "#FAF8F9"
            },
            "gradient--16": {
                'start': "#121317",
                 'end': "#323B42"
            }
        }
    }

    function getBrightThemes() {
        return [
            "gradient--1",
            "gradient--2",
            "gradient--3",
            "gradient--4",
            "gradient--5",
            "gradient--6",
            "gradient--7",
            "gradient--8",
            "gradient--9",
            "gradient--10",
            "gradient--14",
            "gradient--15"
        ]
    }

    function getDarkThemes() {
        return  [
            "gradient--10",
            "gradient--11",
            "gradient--12",
            "gradient--16"
        ]
    }
    
    function getRedInvalidColorThemes() {
        return [
            "gradient--1",
            "gradient--2",
            "gradient--3"
        ]
    }

    // By Defualt Disable Submit (Create Account) Button 
    var sumbitBtn = document.getElementById('submit')
    sumbitBtn.disabled = true
    
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

    // Validate Email Input
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
            // $('#password-strength').removeClass('progress-bar-warning');
            // $('#password-strength').addClass('progress-bar-success');
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
            // $('#password-strength').removeClass('progress-bar-success');
            // $('#password-strength').addClass('progress-bar-warning');
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
            // $('#password-strength').addClass('progress-bar-danger');
            $('#result').addClass('text-danger').text('Very Week');
            $('#password-strength').css('width', '10%');
        } else if (strength == 2) {
            $('#result').addClass('good');
            // $('#password-strength').removeClass('progress-bar-danger');
            // $('#password-strength').addClass('progress-bar-warning');
            $('#result').addClass('text-warning').text('Week')
            $('#password-strength').css('width', '40%');
        } else if (strength == 4) {
            $('#result').removeClass()
            $('#result').addClass('strong');
            
            // $('#password-strength').removeClass('progress-bar-warning');
            // $('#password-strength').addClass('progress-bar-warning');
            
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


    // Check if all Inputs Validation are filled
    function validateAll() {
        sumbitBtn.disabled = true
        if (!document.getElementsByClassName("fa-times").length) sumbitBtn.disabled = false
    }

    // Configure Progress bar speed    
    var secondFraction = '0.3'
    $('#password-strength').css('transition', 'width '+secondFraction+'s ease');

});
