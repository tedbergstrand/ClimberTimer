document.addEventListener("DOMContentLoaded", function() {
    const listElement = document.getElementById('exerciseList');
    if (listElement) {
        const categoryName = listElement.getAttribute('data-energy-system');
        loadExercises(categoryName);
    }
});

function loadExercises(categoryName) {
    fetch('exerciseDetails.json')
        .then(response => response.json())
        .then(data => {
            populateExerciseList(data, categoryName);
        })
        .catch(error => console.error('Error loading exercise details:', error));
}

function populateExerciseList(exercises, categoryName) {
    const listElement = document.getElementById('exerciseList');
    const filteredExercises = exercises.filter(exercise => exercise.energySystem === categoryName);

    filteredExercises.forEach(exercise => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        const description = document.createElement('p');

        link.href = `exercise.html?name=${encodeURIComponent(exercise.name)}`;
        link.textContent = exercise.name;
        description.textContent = exercise.objective; // Adding the exercise description

        listItem.appendChild(link);
        listItem.appendChild(description); // Append the description to the list item
        listElement.appendChild(listItem);
    });
}
