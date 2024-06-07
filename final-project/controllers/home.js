async function getHome(request, response) {
    response.render('home', { title: 'Home' });
}

module.exports = {
    getHome
};
