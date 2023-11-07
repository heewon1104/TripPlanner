function constructor(props){
    super(props);
    this.state = {
      temp: 0,
      temp_max: 0,
      temp_min: 0,
      humidity: 0,
      desc: '',
      icon: '',
      loading: true,
    };
}

function weather(){
    const cityName = 'Incheon';
    const apiKey = process.env.ad14089cb0bfefe6bd1b977b00f4f4b0;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    //위에서 만든 상태 변수에 값을 전달
    axios
      .get(url)
      .then((responseData) => {
        console.log(responseData);
        const data = responseData.data;
        this.setState({
          temp: data.main.temp,
          temp_max: data.main.temp_max,
          temp_min: data.main.temp_min,
          humidity: data.main.humidity,
          desc: data.weather[0].description,
          icon: data.weather[0].icon,
          loading: false,
        });
      })
      .catch((error) => console.log(error));
  }