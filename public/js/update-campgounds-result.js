// this function uses jQuery. Ensure that jQuery is included in the relevant HTML files(s)

// when the user inputs text or selects options to sort by, the div with the list of campgrounds is updated.
document.getElementById('searchQuery').addEventListener('keyup', updateCampgroundsList);
document.getElementById('sortBy').addEventListener('change', updateCampgroundsList);
document.getElementById('sortOrder').addEventListener('change', updateCampgroundsList);

function updateCampgroundsList() {
    const searchQuery = document.getElementById('searchQuery').value;
    const sortBy = document.getElementById('sortBy').value;
    const sortOrder = document.getElementById('sortOrder').value;

    $('#campgrounds-container').load(`/campgrounds?q=${searchQuery}&sortBy=${sortBy}&sortOrder=${sortOrder}` + ' #campgrounds-container>*');
}