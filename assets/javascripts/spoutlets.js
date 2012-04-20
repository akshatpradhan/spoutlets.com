// Things too trivial for a full blown view
$('.login').click(function(e) {
    console.log('login');
    document.forms["login-form"].submit();
});
$('.register').click(function(e) {
    document.forms["register-form"].submit();
});