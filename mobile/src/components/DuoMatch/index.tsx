import { View, Modal, ModalProps, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { THEME } from '../../theme';
import { MaterialIcons } from '@expo/vector-icons'
import { styles } from './styles';
import { CheckCircle } from 'phosphor-react-native';
import { Heading } from '../Heading';
import * as Clipboard from 'expo-clipboard'
import { useState } from 'react';

interface Props extends ModalProps {
  discord: string;
  onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {
  const [isCopying, setIsCopying] = useState(false);

  async function handleCopyToClipboard() {
    setIsCopying(true);
    await Clipboard.setStringAsync(discord);
    Alert.alert('Discord Copiado', 'Basta abrir seu discord e buscar o duo!');
    setIsCopying(false);
  }

  return (
    <Modal {...rest} transparent statusBarTranslucent animationType='fade'>
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <MaterialIcons
              name='close'
              size={20}
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity >
          <CheckCircle
            size={64}
            color={THEME.COLORS.SUCCESS}
            weight="bold"
          />
          <Heading
            title="Lets Play!"
            subtitle='Agora é só começar a jogar!'
            style={{ alignItems: 'center', marginTop: 24 }}
          />
          <Text style={styles.label}>
            Adicione no Discord
          </Text>
          <TouchableOpacity
            disabled={isCopying}
            style={styles.discordButton}
            onPress={handleCopyToClipboard} >
            <Text style={styles.discord}>
              {isCopying ? <ActivityIndicator/> : discord}
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );

}