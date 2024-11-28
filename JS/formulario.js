let currentQuestion = 1;
const totalQuestions = 20; // Cambiar al número total de preguntas

// Función para obtener el valor seleccionado en cada pregunta
function getSelectedValue(question) {
    const radios = document.getElementsByName(question);
    for (const radio of radios) {
        if (radio.checked) {
            return parseInt(radio.value);
        }
    }
    return null; // Si no se selecciona ninguna opción
}

// Función para mostrar una pregunta
function showQuestion(questionId) {
    const question = document.getElementById(questionId);
    question.classList.remove('hidden');
}

// Función para ocultar una pregunta
function hideQuestion(questionId) {
    const question = document.getElementById(questionId);
    question.classList.add('hidden');
}

// Función para calcular la huella de carbono
function calculateCarbonFootprint() {
    let totalCarbon = 0;

    totalCarbon += getSelectedValue('electricity') || 0;
    totalCarbon += getSelectedValue('gas') || 0;
    totalCarbon += getSelectedValue('car') || 0;
    totalCarbon += getSelectedValue('flights') || 0;
    totalCarbon += getSelectedValue('redMeat') || 0;
    totalCarbon += getSelectedValue('publicTransport') || 0;
    totalCarbon += getSelectedValue('foodWaste') || 0;
    totalCarbon += getSelectedValue('clothing') || 0;
    totalCarbon += getSelectedValue('electronics') || 0;
    totalCarbon += getSelectedValue('waterUsage') || 0;
    totalCarbon += getSelectedValue('thermalInsulation') || 0;
    totalCarbon += getSelectedValue('organicFood') || 0;
    totalCarbon += getSelectedValue('efficientDevices') || 0;
    totalCarbon += getSelectedValue('waterConservation') || 0;
    totalCarbon += getSelectedValue('ecoCleaning') || 0;
    totalCarbon += getSelectedValue('secondHand') || 0;

    document.getElementById('carbonResult').textContent = totalCarbon + ' kg CO₂';
}

// Función para manejar el clic del botón "Siguiente"
document.getElementById('nextButton').addEventListener('click', () => {
    const currentQuestionName = document.querySelector(`#question${currentQuestion} input`).name;

    // Validar si se seleccionó una respuesta
    if (getSelectedValue(currentQuestionName) === null) {
        alert('Por favor, selecciona una respuesta antes de continuar.');
        return; // Detener la ejecución si no se seleccionó una respuesta
    }

    if (currentQuestion <= totalQuestions) {
        hideQuestion('question' + currentQuestion);
        currentQuestion++;
        if (currentQuestion <= totalQuestions) {
            showQuestion('question' + currentQuestion);
            document.getElementById('backButton').classList.remove('hidden'); // Mostrar el botón de regresar
        } else {
            calculateCarbonFootprint();
            document.getElementById('resultSection').classList.remove('hidden');
            document.getElementById('nextButton').classList.add('hidden');
            document.getElementById('backButton').classList.add('hidden');
            document.getElementById('resetButton').classList.remove('hidden'); // Mostrar el botón para reiniciar
        }
    }
});

// Función para manejar el clic del botón "Regresar"
document.getElementById('backButton').addEventListener('click', () => {
    if (currentQuestion > 1) {
        hideQuestion('question' + currentQuestion);
        currentQuestion--;
        showQuestion('question' + currentQuestion);
        // Si estamos en la primera pregunta, ocultamos el botón "Regresar"
        if (currentQuestion === 1) {
            document.getElementById('backButton').classList.add('hidden');
        }
    }
});

// Función para reiniciar la página
document.getElementById('resetButton').addEventListener('click', () => {
    window.location.href = 'medidor_impacto.html'; // Cambia '/' por la URL de tu página principal si es diferente
});

// Mostrar la primera pregunta
showQuestion('question1');
document.getElementById('backButton').classList.add('hidden'); // Ocultar el botón de "Regresar" al inicio
document.getElementById('resetButton').classList.add('hidden'); // Ocultar el botón de "Volver al inicio"
