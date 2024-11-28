/*------------------------------------------------------------ */
// Cambiar el color de la barra de navegación al hacer scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
      nav.classList.add('bg-morado');
      nav.classList.remove('bg-transparent');
    } else {
      nav.classList.add('bg-transparent');
      nav.classList.remove('bg-morado');
    }
  });

// Datos para la gráfica de temperatura
const climateContext = document.getElementById('pueblaClimateChart').getContext('2d');
const pueblaClimateChart = new Chart(climateContext, {
    type: 'line', 
    data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: [
            {
                label: 'Temperatura Media 2024 (°C)',
                data: [16.5, 17.5, 20.3, 21.4, 24.4, 21.8, 20.0, 19.9, 19.6, 17.6, null, null],
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderWidth: 2
            },
            {
                label: 'Temperatura Media 2012 (°C)',
                data: [15.5, 16.7, 17.9, 19.7, 20.3, 19.9, 19.3, 19.5, 19.1, 18.4, 16.4, 16.2],
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderWidth: 2
            },
            {
                label: 'Temperatura Media 2000 (°C)',
                data: [14.3, 15.8, 17.7, 19.3, 19.6, 18.8, 18.6, 18.6, 18.5, 17.2, 16.7, 14.6],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: { color: '#FFF5D4', font: { size: 12  } }  // Tamaño de fuente consistente en la leyenda
            },
            title: {
                display: true,
                text: 'Temperatura Media en Puebla',
                color: '#FFF5D4',
                font: { size: 20, weight: 'bold' }
            }
        },
        scales: {
            x: {
                ticks: { color: '#FFF5D4', font: { size: 14 } }  // Tamaño de fuente para etiquetas del eje X
            },
            y: {
                ticks: { color: '#FFF5D4', font: { size: 14 } },  // Tamaño de fuente para etiquetas del eje Y
                title: {
                    display: true,
                    text: 'Temperatura (°C)',
                    color: '#FFF5D4',
                    font: { size: 16 }
                }
            }
        }
    }
});

// Datos para la gráfica de precipitación
const rainContext = document.getElementById('pueblaRainChart').getContext('2d');
const pueblaRainChart = new Chart(rainContext, {
    type: 'line',
    data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: [
            {
                label: 'Precipitación 2024 (mm)',
                data: [14.8, 15.9, 8.4, 18.2, 28.4, 258.0, 253.5, 179.2, 239.2, 127.7],
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderWidth: 2,
            },
            {
                label: 'Precipitación 2012 (mm)',
                data: [44.7, 57.5, 29.3, 42.1, 60.5, 231.1, 273.7, 333.3, 201.7, 63.2, 42.2, 11.2],
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderWidth: 2,
            },
            {
                label: 'Precipitación 2000 (mm)',
                data: [39.0, 54.6, 26.7, 135.7, 185.0, 419.8, 212.9, 364.7, 245.2, 139.3, 74.5, 85.7],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2,
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: { color: '#FFF5D4', font: { size: 16 } }  // Tamaño de fuente consistente en la leyenda
            },
            title: {
                display: true,
                text: 'Precipitación Mensual en Puebla',
                color: '#FFF5D4',
                font: { size: 20, weight: 'bold' }
            }
        },
        scales: {
            x: {
                ticks: { color: '#FFF5D4', font: { size: 14 } }  // Tamaño de fuente para etiquetas del eje X
            },
            y: {
                ticks: { color: '#FFF5D4', font: { size: 14 } },  // Tamaño de fuente para etiquetas del eje Y
                title: {
                    display: true,
                    text: 'Precipitación (mm)',
                    color: '#FFF5D4',
                    font: { size: 16 }
                }
            }
        }
    }
});


// Obtén los elementos de los botones y los canvas de las gráficas
const temperatureButton = document.getElementById('temperatureButton');
const rainButton = document.getElementById('rainButton');
const temperatureCanvas = document.getElementById('pueblaClimateChart');
const rainCanvas = document.getElementById('pueblaRainChart');
const temperatureText = document.getElementById('temperatureText');
const rainText = document.getElementById('rainText');

// Función para alternar entre los gráficos y mostrar el texto correspondiente
function toggleGraphs(graphToShow) {
    if (graphToShow === 'temperature') {
        temperatureCanvas.style.display = 'block';
        rainCanvas.style.display = 'none';
        temperatureText.style.display = 'block';  // Mostrar texto de temperatura
        rainText.style.display = 'none';  // Ocultar texto de precipitación
    } else if (graphToShow === 'rain') {
        temperatureCanvas.style.display = 'none';
        rainCanvas.style.display = 'block';
        temperatureText.style.display = 'none';  // Ocultar texto de temperatura
        rainText.style.display = 'block';  // Mostrar texto de precipitación
    }
}

// Botón de temperatura
temperatureButton.addEventListener('click', () => toggleGraphs('temperature'));

// Botón de precipitación
rainButton.addEventListener('click', () => toggleGraphs('rain'));
