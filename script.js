const inputCidade = document.getElementById('inputCidade');
const btnBuscar = document.getElementById('btnBuscar');
const areaResultado = document.getElementById('areaResultado');

async function buscarDadosClima(cidade) {

    const urlGeocoding = `https://geocoding-api.open-meteo.com/v1/search?name=${cidade}&count=1&language=pt&format=json`;

    const respostaGeo = await fetch(urlGeocoding);
    const dadosGeo = await respostaGeo.json();

    if (!dadosGeo.results || dadosGeo.results.length === 0) {

        throw new Error("Cidade não Encontrada!");
    }

    const latitude = dadosGeo.results[0].latitude;
    const longitude = dadosGeo.results[0].longitude;
    const nome = dadosGeo.results[0].name;
    
    const urlClima = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

    const respostaClima = await fetch(urlClima);
    const dadosClima = await respostaClima.json();

    return {
        cidade: nome,
        temperatura: dadosClima.current_weather.temperature,
        velocidadeVento: dadosClima.current_weather.windspeed
    };
}

btnBuscar.addEventListener('click', async () => {

    const cidadeDigitada = inputCidade.value;

    if (cidadeDigitada === "") {
        alert('Por favor digite uma Cidade!');
        return;
    }

    areaResultado.innerHTML = "<strong>Buscando informações climáticas<strong>";

    try {
        
        const dados = await buscarDadosClima(cidadeDigitada);

        areaResultado.innerHTML = `
            <h3>Tempo em ${dados.cidade}</h3>
            <p class="dadosTemp">${dados.temperatura}°C</p>
            <p class="dadosTemp">Vento: ${dados.velocidadeVento} km/h</p>
        `;

    } catch (erro) {
        
        console.error(erro);
        areaResultado.innerHTML = `<p class="erroTemp">Erro: ${erro.message}</p>`;
    }
})