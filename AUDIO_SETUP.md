# 🔔 Sistema de Áudio

## Como Funciona

O sistema de áudio foi simplificado para funcionar automaticamente sem necessidade de diálogos de permissão.

### Comportamento

1. **Ao carregar a página**: O loader aparece e tenta tocar o sino automaticamente
2. **Primeira interação**: Se o navegador bloquear o áudio (política de autoplay), o som tocará na primeira interação do usuário com a página
3. **Visitas subsequentes**: O áudio funciona normalmente após a primeira interação

### Arquivos Principais

- **`/src/app/core/services/audio.service.ts`**: Serviço para tocar áudios
- **`/src/app/core/constants/audio-paths.ts`**: Caminhos centralizados dos arquivos de áudio
- **`/src/app/shared/ui/app-loader/app-loader.component.ts`**: Toca o sino ao iniciar

### Como Adicionar Novos Sons

1. Adicione o arquivo de áudio em `/public/audios/`
2. Adicione o caminho em `audio-paths.ts`:
   ```typescript
   export const AUDIO_PATHS = {
     BELLS: '/audios/bells-1-72261.mp3',
     NEW_SOUND: '/audios/new-sound.mp3', // Adicione aqui
   } as const;
   ```
3. Use em qualquer componente:
   ```typescript
   constructor(private audioService: AudioService) {}
   
   playSound() {
     this.audioService.playAudio(AUDIO_PATHS.NEW_SOUND);
   }
   ```

### Notas Técnicas

- O navegador pode bloquear áudio automático por política de segurança
- O áudio funciona melhor após uma interação do usuário (clique, toque, etc)
- Volume padrão: 70%
