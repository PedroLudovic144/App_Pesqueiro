const toggleFavorito = async () => {
  try {
    const dados = await AsyncStorage.getItem("favoritos");
    let favoritos = dados ? JSON.parse(dados) : [];

    if (favorito) {
      favoritos = favoritos.filter((f: any) => f.id !== pesqueiro.id);
    } else {
      favoritos.push(pesqueiro);
      Vibration.vibrate(50); // vibra 50ms quando favoritar
    }

    await AsyncStorage.setItem("favoritos", JSON.stringify(favoritos));
    setFavorito(!favorito);
  } catch (e) {
    console.error(e);
  }
};
