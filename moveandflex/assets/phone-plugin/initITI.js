function initITI(defaultCountryCode, asset) {

    var iso639InIso3166 = {
        "hu": "hu",
        "ro": "ro",
        "pl": "pl",
        "it": "it",
        "lt": "lt",
        "lv": "lv",
        "et": "ee",
        "es": "es",
        "pt": "pt",
        "cs": "cz",
        "hr": "hr",
        "el": "gr",
        "sk": "sk",
        "sl": "si",
        "de": "at"
    };

    var europeanCountries = ["hu", "ro", "pl", "it", "lt", "lv", "ee", "es", "pt", "cz", "hr", "gr", "sk", "si", "at"];


    var countryList = null;

    try {
        countryList = countriesListForFormHelper;
    } catch (e) {
        countryList = europeanCountries;
    }

    var countryCode = iso639InIso3166[defaultCountryCode] || defaultCountryCode;

    if (!countryList.includes(countryCode)) {
        countryCode = countryList[0];
    }

    var inputs = document.querySelectorAll('input[name="phone-number"]');
    var phones = document.querySelectorAll('input[name="phone"]');

    for (var i = 0; i < inputs.length; i++) {
        setIti(i);
    }

    window.intlTelInputGlobals.loadUtils(asset + "/phone-plugin/utils.js");

    function setIti(i) {
        var iti = intlTelInput(inputs[i], {
            onlyCountries: countryList,
            nationalMode: true,
            initialCountry: countryCode,
            separateDialCode: true,
        });

        inputs[i].addEventListener('change', function () {
            var num = iti.getNumber();
            for (var j = 0; j < phones.length; j++) {
                phones[j].value = num;
            }
        });
    }
}