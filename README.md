# 🌤️ Previsão do Tempo

Uma aplicação web simples e elegante para consulta de previsão do tempo, desenvolvida como desafio de Front-End. O site oferece informações meteorológicas em tempo real, utilizando geolocalização automática e busca manual por cidades.

## 📋 Sobre o Projeto

Este projeto é uma aplicação de previsão do tempo que permite aos usuários visualizarem as condições climáticas atuais e a previsão para os próximos dias. A interface é intuitiva e responsiva, proporcionando uma experiência agradável em diferentes dispositivos.

## ✨ Funcionalidades

- **🌍 Geolocalização Automática**: Ao carregar a página, o site detecta automaticamente sua localização e exibe a previsão do tempo local
- **🔍 Busca por Cidade**: Campo de busca que permite consultar a previsão do tempo de qualquer cidade do mundo
- **🌡️ Informações Detalhadas**: Exibe temperatura atual, umidade, velocidade do vento e código de condição climática
- **📅 Previsão Semanal**: Visualização da previsão para os próximos dias com temperaturas máximas e mínimas
- **🎨 Interface Dinâmica**: Background gradiente que se adapta às condições climáticas (sol, nublado, chuva, neve)
- **📱 Design Responsivo**: Layout adaptável para diferentes tamanhos de tela

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica da página
- **CSS3**: Estilização com variáveis CSS, gradientes dinâmicos e animações
- **JavaScript (Vanilla)**: Lógica de negócio, consumo de API e manipulação do DOM
- **API Open Meteo**: Fornecimento dos dados meteorológicos

## 🌐 API Open Meteo

Este projeto consome a [Open Meteo API](https://open-meteo.com/), uma API gratuita e de código aberto para dados meteorológicos. A API fornece:

- Dados meteorológicos atuais (temperatura, umidade, velocidade do vento)
- Previsão diária com temperaturas máximas e mínimas
- Códigos de condição climática para ícones descritivos
- Serviço de geocodificação para busca de cidades

**Endpoints utilizados:**
- `https://api.open-meteo.com/v1/forecast` - Dados de previsão do tempo
- `https://geocoding-api.open-meteo.com/v1/search` - Busca de coordenadas por nome de cidade

## 🚀 Como Usar

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/PabloTzeliks/weather-front-challenge.git
   ```

2. **Abra o arquivo**:
   - Simplesmente abra o arquivo `index.html` em seu navegador preferido
   - Não há necessidade de instalação de dependências ou servidor local

3. **Permita a geolocalização** (opcional):
   - Ao abrir a página, permita o acesso à sua localização para ver o clima local automaticamente
   - Se negar, o site carregará São Paulo como localização padrão

4. **Busque por cidades**:
   - Digite o nome de qualquer cidade no campo de busca
   - Clique no ícone de lupa ou pressione Enter
   - Visualize a previsão do tempo atualizada

## 📂 Estrutura do Projeto

```
weather-front-challenge/
│
├── index.html          # Estrutura HTML da aplicação
├── style.css           # Estilos e animações
├── script.js           # Lógica JavaScript e consumo da API
└── README.md           # Documentação do projeto
```

## 🎨 Características Visuais

### Temas Dinâmicos

A interface adapta seu gradiente de fundo de acordo com as condições climáticas:

- **☀️ Céu Limpo**: Gradiente laranja para azul
- **⛅ Nublado**: Gradiente cinza suave
- **🌧️ Chuva**: Gradiente azul escuro
- **❄️ Neve**: Gradiente azul claro

### Ícones Climáticos

O sistema utiliza emojis para representar diferentes condições meteorológicas:
- ☀️ Céu limpo
- ⛅ Parcialmente nublado
- 🌫️ Nevoeiro
- 🌧️ Chuva
- ❄️ Neve
- 🌦️ Chuva forte
- ⛈️ Tempestade

## 🔧 Detalhes Técnicos

### Funções Principais

- `carregarLocalizacaoInicial()`: Obtém a geolocalização do usuário ou carrega uma localização padrão
- `buscarCoordenadasCidade(cidade)`: Converte nome de cidade em coordenadas geográficas
- `buscarDadosPorCoordenadas(lat, lon, nomeCidade)`: Busca dados meteorológicos usando coordenadas
- `atualizarInterface(dados, nomeCidade)`: Atualiza a interface com os dados recebidos da API
- `getIconeClima(code)`: Retorna o emoji correspondente ao código climático
- `getClasseClima(code)`: Retorna a classe CSS para o gradiente apropriado

### Tratamento de Erros

- Mensagens de erro amigáveis para cidades não encontradas
- Fallback para localização padrão caso geolocalização seja negada
- Tratamento de erros de conexão com a API

## 👤 Autor

**Pablo Tzeliks**

Desenvolvedor apaixonado por tecnologia e criação de soluções web intuitivas. Este projeto demonstra habilidades em Front-End, consumo de APIs e design responsivo.

- GitHub: [@PabloTzeliks](https://github.com/PabloTzeliks)
- Repositório do Projeto: [weather-front-challenge](https://github.com/PabloTzeliks/weather-front-challenge)

---

⭐ Se você gostou deste projeto, considere dar uma estrela no repositório!
