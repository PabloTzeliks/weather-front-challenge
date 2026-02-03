const inputCidade = document.getElementById('inputCidade');
const btnBuscar = document.getElementById('btnBuscar');
const labelLocalizacao = document.getElementById('localizacaoTexto');
const sectionDestaque = document.getElementById('destaqueHoje');
const sectionSemanal = document.getElementById('previsaoSemanal');

// Funções Auxiliáres

function getIconeClima(code) {
    if (code === 0) return '☀️'; // Céu limpo
    if (code >= 1 && code <= 3) return '⛅'; // Parcialmente nublado
    if (code >= 45 && code <= 48) return '🌫️'; // Nevoeiro
    if (code >= 51 && code <= 67) return '🌧️'; // Chuva
    if (code >= 71 && code <= 77) return '❄️'; // Neve
    if (code >= 80 && code <= 82) return '🌦️'; // Chuva forte
    if (code >= 95) return '⛈️'; // Tempestade
    return '❓';
}

function getClasseClima(code) {
    // Sol / Limpo
    if (code === 0) return 'fundo-sol';
    
    // Nublado / Nevoeiro
    if (code >= 1 && code <= 48) return 'fundo-nublado';
    
    // Chuva / Chuvisco / Tempestade
    if ((code >= 51 && code <= 67) || (code >= 80 && code <= 99)) return 'fundo-chuva';
    
    // Neve
    if (code >= 71 && code <= 77) return 'fundo-neve';

    return 'fundo-sol'; // Padrão
}

function formatarData(dataString) {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', { weekday: 'long' });
}

// Busca de Dados

async function buscarDadosPorCoordenadas(lat, lon, nomeCidade = "Sua Localização") {
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;

        const resposta = await fetch(url);
        const dados = await resposta.json();

        atualizarInterface(dados, nomeCidade);

    } catch (erro) {
        console.error("Erro ao buscar clima:", erro);
        alert("Erro ao obter dados meteorológicos.");
    }
}

async function buscarCoordenadasCidade(cidade) {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${cidade}&count=1&language=pt&format=json`;
    
    const resposta = await fetch(url);
    const dados = await resposta.json();

    if (!dados.results || dados.results.length === 0) {
        throw new Error("Cidade não encontrada");
    }

    return {
        lat: dados.results[0].latitude,
        lon: dados.results[0].longitude,
        nome: dados.results[0].name,
        pais: dados.results[0].country
    };
}

// Visual

function atualizarInterface(dados, nomeCidade) {
    labelLocalizacao.textContent = `Localização: ${nomeCidade}`;

    // Diária
    const atual = dados.current;
    const iconeHoje = getIconeClima(atual.weather_code);
    const classeFundo = getClasseClima(atual.weather_code);

    const dias = dados.daily.time;
    
    sectionDestaque.className = `destaque ${classeFundo}`; 
    
    sectionDestaque.innerHTML = `
        <h2>${nomeCidade} ${iconeHoje}</h2>
        <div class="temp-grande">${Math.round(atual.temperature_2m)}°C</div>
        <div class="info-extra">
            <span>💧 ${atual.relative_humidity_2m}% Umidade</span>
            <span>💨 ${atual.wind_speed_10m} km/h Vento</span>
        </div>
        <p style="margin-top: 10px; font-size: 1.2rem;">${formatarData(dias[0])}</p>
    `;

    // Semanal
    sectionSemanal.innerHTML = '';

    const codigos = dados.daily.weather_code;
    const max = dados.daily.temperature_2m_max;
    const min = dados.daily.temperature_2m_min;

    for (let i = 1; i < dias.length; i++) {
        const diaSemana = formatarData(dias[i]);
        const icone = getIconeClima(codigos[i]);

        const card = document.createElement('div');
        card.className = 'card-dia';
        card.innerHTML = `
            <h4>${diaSemana}</h4>
            <div class="icone-clima">${icone}</div>
            <p>Max: <strong>${Math.round(max[i])}°C</strong></p>
            <p>Min: <span style="color: #666">${Math.round(min[i])}°C</span></p>
        `;

        sectionSemanal.appendChild(card);
    }
}

// Iniciailização

function carregarLocalizacaoInicial() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (posicao) => {
                buscarDadosPorCoordenadas(posicao.coords.latitude, posicao.coords.longitude, "Localização Atual");
            },
            (erro) => {
                console.warn("Geolocalização negada ou erro:", erro);
                buscarDadosPorCoordenadas(-23.55, -46.63, "São Paulo (Padrão)"); 
            }
        );
    } else {
        alert("Seu navegador não suporta geolocalização.");
    }
}

btnBuscar.addEventListener('click', async () => {
    const cidade = inputCidade.value;
    if (!cidade) return;

    try {
        const dadosGeo = await buscarCoordenadasCidade(cidade);
        await buscarDadosPorCoordenadas(dadosGeo.lat, dadosGeo.lon, `${dadosGeo.nome}, ${dadosGeo.pais}`);
    } catch (erro) {
        alert(erro.message);
    }
});

// Inicia o app
carregarLocalizacaoInicial();