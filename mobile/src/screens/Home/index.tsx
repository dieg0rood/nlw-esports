import { Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import logoImg from '../../assets/logo-nlw-esports.png';
import { Heading } from '../../components/Heading';
import { styles } from './styles';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { useEffect, useState } from 'react';
import { Background } from '../../components/Background';
import { useNavigation } from '@react-navigation/native';

export function Home() {

  const navigation = useNavigation();

  function handleNavigation({id, title, bannerUrl}: GameCardProps){
    navigation.navigate('games',{id, title, bannerUrl});
  }

  const [games, setGames] = useState<GameCardProps[]>([]);

  useEffect(() => {
    fetch('http://192.168.25.45:3333/games')
      .then(response => response.json())
      .then(data => setGames(data))
  }, []);
  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo} />
        <Heading title="Encontre seu duo!" subtitle="Selecione o game que deseja jogar..." />
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={games}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (<GameCard onPress={() => handleNavigation(item)} data={item} />)}
          contentContainerStyle={styles.contentList}
        />

      </SafeAreaView>
    </Background>

  );
}