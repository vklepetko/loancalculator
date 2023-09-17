
function link_both_ways(a, b) {
    a.on('input', function () { b.val(a.val()) });
    b.on('input', function () { a.val(b.val()) });
}

function link_single_way(a, b) {
    a.on('input', function () { b.val(a.val()) });
}

function link_function(a, f) {
    a.on('input', function () { f() });
}

function get_principal(i, x, N) {
    if (i == 0) {
        return (x * N);
    }
    else {
        return x / i * (-1 + Math.pow((1 + i), N)) / Math.pow((1 + i), N);
    }
}

function get_annuity(i, P, N) {
    if (i == 0) {
        return Math.round(P / N);
    }
    else {
        return i * P * Math.pow((1 + i), N) / (-1 + Math.pow((1 + i), N));
    }
}

function get_term(i, x, P) {
    if (i == 0) {
        return P / x;
    }
    else {
        return Math.log(x / (x - i * P)) / Math.log(1 + i);
    }
}

function get_interest_rate(x, P, N) {
    var i = 1.0;
    var rat_tol = 0.00000001;
    function f(i, x, P, N) {
        return i * P / x + 1 / Math.pow((i + 1), N) - 1;
    }
    function f_(i, x, P, N) {
        return P / x - N / Math.pow((i + 1), (N + 1));
    }
    function f_rat(i, x, P, N) {
        return f(i, x, P, N) / f_(i, x, P, N);
    }
    for (let j = 1; j < 1000; j++) {
        var rat = f_rat(i, x, P, N);
        i = i - rat;
        if (rat <= rat_tol) {
            break;
        }
    }
    return i;
}

function get_interest(x, N, P) {
    return (x * N) - P;
}



$(document).ready(function () {

    var principal_annuity_field = $("#principal > form > div > input[id*='annuity'][type='number']");
    var principal_annuity_range = $("#principal > form > div > input[id*='annuity'][type='range']");
    var principal_instalment_field = $("#principal > form > div > input[id*='instalment'][type='number']");
    var principal_instalment_range = $("#principal > form > div > input[id*='instalment'][type='range']");
    var principal_interest_rate_field = $("#principal > form > div > input[id*='interest_rate'][type='number']");
    var principal_interest_rate_range = $("#principal > form > div > input[id*='interest_rate'][type='range']");
    var principal_calculated_field = $("#principal > div > *[id*='calculated_principal']");

    var principal_calculated_field_small = $("#principal > div > div > *[id*='calculated_principal']");
    var principal_interest_calculated_field = $("#principal > div >  div >*[id*='calculated_interest']");
    var principal_ratio_calculated_field = $("#principal > div > div >*[id*='calculated_ratio']");
    var principal_total_calculated_field = $("#principal > div > div >*[id*='calculated_total']");


    var principal_calculated_field_value;
    var principal_interest_calculated_field_value;
    var principal_ratio_calculated_field_value;


    principal_inputs = [
        principal_annuity_field,
        principal_annuity_range,
        principal_instalment_field,
        principal_instalment_range,
        principal_interest_rate_field,
        principal_interest_rate_range
    ];


    function update_principal() {
        principal_calculated_field_value = Math.floor(get_principal(
            principal_interest_rate_field.val() / 12 / 100,
            principal_annuity_field.val(),
            principal_instalment_field.val()
        ))
        principal_calculated_field.html(
            principal_calculated_field_value.toLocaleString()
        )
        principal_calculated_field_small.html(
            principal_calculated_field_value.toLocaleString()
        )
    }

    function update_interest() {
        principal_interest_calculated_field_value = Math.round(get_interest(
            principal_annuity_field.val(),
            principal_instalment_field.val(),
            principal_calculated_field_value
        ))
        principal_interest_calculated_field.html(
            principal_interest_calculated_field_value.toLocaleString()
        )
    }

    function update_others() {

        principal_ratio_calculated_field.html(
            Math.round(100 * principal_interest_calculated_field_value / principal_calculated_field_value) + ' %'
        )
        principal_total_calculated_field.html(
            (principal_calculated_field_value + principal_interest_calculated_field_value).toLocaleString()
        )
    }

    link_both_ways(principal_annuity_field, principal_annuity_range);
    link_both_ways(principal_instalment_field, principal_instalment_range);
    link_both_ways(principal_interest_rate_field, principal_interest_rate_range);


    for (i in principal_inputs) {
        link_function(principal_inputs[i], update_principal);
        link_function(principal_inputs[i], update_interest);
        link_function(principal_inputs[i], update_others);
    };

    update_principal();
    update_interest();
    update_others();

    principal_annuity_range.val(principal_annuity_field.val())
    principal_instalment_range.val(principal_instalment_field.val())
    principal_interest_rate_range.val(principal_interest_rate_field.val())

});



$(document).ready(function () {
    var annuity_principal_field = $("#annuity > form > div > input[id*='principal'][type='number']");
    var annuity_principal_range = $("#annuity > form > div > input[id*='principal'][type='range']");
    var annuity_instalment_field = $("#annuity > form > div > input[id*='instalment'][type='number']");
    var annuity_instalment_range = $("#annuity > form > div > input[id*='instalment'][type='range']");
    var annuity_interest_rate_field = $("#annuity> form > div > input[id*='interest_rate'][type='number']");
    var annuity_interest_rate_range = $("#annuity > form > div > input[id*='interest_rate'][type='range']");

    var annuity_calculated_field = $("#annuity > div > *[id*='calculated_annuity']");
    var annuity_calculated_field_small = $("#annuity > div > div > *[id*='calculated_principal']");
    var annuity_interest_calculated_field = $("#annuity > div >  div >*[id*='calculated_interest']");
    var annuity_ratio_calculated_field = $("#annuity > div > div >*[id*='calculated_ratio']");
    var annuity_total_calculated_field = $("#annuity > div > div >*[id*='calculated_total']");

    var annuity_calculated_field_value;
    var annuity_interest_calculated_field_value;
    var pannuity_ratio_calculated_field_value;
    var annuity_calculated_field_value;

    annuity_inputs = [
        annuity_principal_field,
        annuity_principal_range,
        annuity_instalment_field,
        annuity_instalment_range,
        annuity_interest_rate_field,
        annuity_interest_rate_range
    ];

    function update_annuity() {
        annuity_calculated_field_value = Math.ceil(get_annuity(
            annuity_interest_rate_field.val() / 12 / 100,
            annuity_principal_field.val(),
            annuity_instalment_field.val()
        ))
        annuity_calculated_field.html(
            annuity_calculated_field_value.toLocaleString()
        )
    }



    function update_others() {
        annuity_calculated_field_small.html((annuity_principal_field.val()).toLocaleString());
        annuity_total_calculated_field.html((annuity_calculated_field_value * annuity_instalment_field.val()).toLocaleString());
        interest = Math.round(get_interest(
            annuity_calculated_field_value,
            annuity_instalment_field.val(),
            annuity_principal_field.val()
        ));
        annuity_interest_calculated_field.html(interest.toLocaleString());
        annuity_ratio_calculated_field.html(Math.round(100 * interest / annuity_principal_field.val()).toLocaleString() + ' %');

    }

    link_both_ways(annuity_principal_field, annuity_principal_range);
    link_both_ways(annuity_instalment_field, annuity_instalment_range);
    link_both_ways(annuity_interest_rate_field, annuity_interest_rate_range);


    for (i in annuity_inputs) {
        link_function(annuity_inputs[i], update_annuity);
        link_function(annuity_inputs[i], update_others);
    };

    update_annuity();
    update_others();

    annuity_principal_range.val(annuity_principal_field.val())
    annuity_instalment_range.val(annuity_instalment_field.val())
    annuity_interest_rate_range.val(annuity_interest_rate_field.val())

});

$(document).ready(function () {
    var term_principal_field = $("#term > form > div > input[id*='principal'][type='number']");
    var term_principal_range = $("#term > form > div > input[id*='principal'][type='range']");
    var term_annuity_field = $("#term > form > div > input[id*='annuity'][type='number']");
    var term_annuity_range = $("#term > form > div > input[id*='annuity'][type='range']");
    var term_interest_rate_field = $("#term > form > div > input[id*='interest_rate'][type='number']");
    var term_interest_rate_range = $("#term > form > div > input[id*='interest_rate'][type='range']");

    var term_calculated_field = $("#term  > div > *[id*='calculated_term']");
    var term_calculated_field_small = $("#term > div > div > *[id*='calculated_principal']");
    var term_interest_calculated_field = $("#term > div >  div >*[id*='calculated_interest']");
    var term_ratio_calculated_field = $("#term > div > div >*[id*='calculated_ratio']");
    var term_total_calculated_field = $("#term > div > div >*[id*='calculated_total']");

    var term_calculated_field_value;

    term_inputs = [
        term_principal_field,
        term_principal_range,
        term_annuity_field,
        term_annuity_range,
        term_interest_rate_field,
        term_interest_rate_range
    ];

    function update_term() {
        term_calculated_field_value = Math.ceil(get_term(
            term_interest_rate_field.val() / 12.0 / 100.0,
            term_annuity_field.val(),
            term_principal_field.val()
        ));

        term_calculated_field.html(
            term_calculated_field_value.toFixed(2).toLocaleString()
        );
    }

    function update_others() {
        term_calculated_field_small.html(term_principal_field.val().toLocaleString());
        term_total_calculated_field.html((term_calculated_field_value * term_annuity_field.val()).toLocaleString());
        interest = Math.round(get_interest(
            term_annuity_field.val(),
            term_calculated_field_value,
            term_principal_field.val()
        ));
        term_interest_calculated_field.html(interest.toLocaleString());
        term_ratio_calculated_field.html(Math.round(100 * interest / term_principal_field.val()).toLocaleString() + ' %');

    }

    link_both_ways(term_principal_field, term_principal_range);
    link_both_ways(term_annuity_field, term_annuity_range);
    link_both_ways(term_interest_rate_field, term_interest_rate_range);


    for (i in term_inputs) {
        link_function(term_inputs[i], update_term);
        link_function(term_inputs[i], update_others);
    };

    update_term();
    update_others();

    term_principal_range.val(term_principal_field.val())
    term_annuity_range.val(term_annuity_field.val())
    term_interest_rate_range.val(term_interest_rate_field.val())

});

$(document).ready(function () {

    var interest_rate_annuity_field = $("#interest_rate > form > div > input[id*='annuity'][type='number']");
    var interest_rate_annuity_range = $("#interest_rate  > form > div > input[id*='annuity'][type='range']");
    var interest_rate_instalment_field = $("#interest_rate  > form > div > input[id*='instalment'][type='number']");
    var interest_rate_instalment_range = $("#interest_rate  > form > div > input[id*='instalment'][type='range']");
    var interest_rate_principal_field = $("#interest_rate  > form > div > input[id*='principal'][type='number']");
    var interest_rate_principal_range = $("#interest_rate  > form > div > input[id*='principal'][type='range']");

    var interest_rate_calculated_field = $("#interest_rate  > div > *[id*='calculated_interest_rate']");
    var interest_rate_calculated_field_small = $("#interest_rate > div > div > *[id*='calculated_principal']");
    var interest_rate_interest_calculated_field = $("#interest_rate > div >  div >*[id*='calculated_interest']");
    var interest_rate_ratio_calculated_field = $("#interest_rate > div > div >*[id*='calculated_ratio']");
    var interest_rate_total_calculated_field = $("#interest_rate > div > div >*[id*='calculated_total']");

    var interest_rate_calculated_field_value;

    interest_rate_inputs = [
        interest_rate_annuity_field,
        interest_rate_annuity_range,
        interest_rate_instalment_field,
        interest_rate_instalment_range,
        interest_rate_principal_field,
        interest_rate_principal_range
    ];

    function update_interest_rate() {
        interest_rate_calculated_field_value = get_interest_rate(
            interest_rate_annuity_field.val(),
            interest_rate_principal_field.val(),
            interest_rate_instalment_field.val()
        ) * 12 * 100;
        interest_rate_calculated_field.html(
            (interest_rate_calculated_field_value.toFixed(2).toLocaleString() + ' %'))
    }

    function update_others() {
        interest_rate_calculated_field_small.html((interest_rate_principal_field.val()).toLocaleString());
        interest_rate_total_calculated_field.html((interest_rate_instalment_field.val() * interest_rate_annuity_field.val()).toLocaleString());
        interest = Math.round(get_interest(
            interest_rate_annuity_field.val(),
            interest_rate_instalment_field.val(),
            interest_rate_principal_field.val()
        ));
        interest_rate_interest_calculated_field.html(interest.toLocaleString());
        interest_rate_ratio_calculated_field.html(Math.round(100 * interest / interest_rate_principal_field.val()).toLocaleString() + ' %');

    }

    link_both_ways(interest_rate_annuity_field, interest_rate_annuity_range);
    link_both_ways(interest_rate_instalment_field, interest_rate_instalment_range);
    link_both_ways(interest_rate_principal_field, interest_rate_principal_range);


    for (i in interest_rate_inputs) {
        link_function(interest_rate_inputs[i], update_interest_rate);
        link_function(interest_rate_inputs[i], update_others);
    };

    update_interest_rate();
    update_others();

    interest_rate_principal_range.val(interest_rate_principal_field.val())
    interest_rate_instalment_range.val(interest_rate_instalment_field.val())
    interest_rate_annuity_range.val(interest_rate_annuity_field.val())

});

