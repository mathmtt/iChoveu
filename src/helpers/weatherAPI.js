// Remova os comentários a medida que for implementando as funções
const TOKEN = import.meta.env.VITE_TOKEN;
export const getWeatherByCity = async (cityURL) => {
  const resposta = await fetch(`http://api.weatherapi.com/v1/current.json?lang=pt&key=${TOKEN}&q=${cityURL}`);
  const data = await resposta.json();
  const obj = {
    temp: data.current.temp_c,
    icon: data.current.condition.icon,
    condition: data.current.condition.text,
  };
  console.log(obj);
  return obj;
};

export const searchCities = async (term) => {
  try {
    const resposta = await fetch(`http://api.weatherapi.com/v1/search.json?lang=pt&key=${TOKEN}&q=${term}`);
    const data = await resposta.json();
    if (data.length === 0) {
      throw new Error('Nenhuma cidade encontrada');
    }
    data.forEach((tempCity) => getWeatherByCity(tempCity.url));
    console.log(data);
    return data;
  } catch (error) {
    window.alert(error.message);
  }
};
