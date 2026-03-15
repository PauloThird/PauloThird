# 🎨 NFT Crafter

Uma aplicação web moderna e vibrante para criação de NFTs a partir de imagens, construída com React, TypeScript, TailwindCSS e Framer Motion.

![NFT Crafter](https://img.shields.io/badge/NFT-Crafter-8E2DE2?style=for-the-badge&logo=ethereum&logoColor=white)
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-4.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Características

### 🎯 Funcionalidades Principais
- **Upload de Imagens**: Drag & drop ou seleção manual de arquivos
- **Formulário Dinâmico**: Título e descrição com validação em tempo real
- **Animações Suaves**: Transições fluidas com Framer Motion
- **Loading Animado**: Indicador de progresso com etapas visuais
- **Preview 3D**: Visualização interativa do NFT criado
- **Responsivo**: Design totalmente adaptativo para desktop e mobile

### 🎨 Design Visual
- **Paleta Neon Vibrante**:
  - Roxo Neon: `#8E2DE2`
  - Azul Elétrico: `#4A00E0`
  - Verde Limão Neon: `#39FF14`
  - Rosa Neon: `#FF0080`
  - Fundo Preto Fosco: `#0f0f0f`
- **Gradientes Animados**
- **Efeitos de Glow e Blur**
- **Tipografia Moderna**: Space Grotesk e Poppins

### 🔧 Tecnologias
- **React 18** com TypeScript
- **TailwindCSS** para estilização
- **Framer Motion** para animações
- **React Hot Toast** para notificações
- **Supabase** (configuração mock)
- **IPFS** (simulação)

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js 16+ 
- npm ou yarn

### Passos
1. **Clone o repositório**
   ```bash
   git clone <repository-url>
   cd nft-crafter
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute o projeto**
   ```bash
   npm start
   ```

4. **Abra no navegador**
   ```
   http://localhost:3000
   ```

## 📱 Como Usar

1. **Selecione uma Imagem**
   - Arraste e solte uma imagem na área de upload
   - Ou clique para selecionar um arquivo
   - Formatos aceitos: PNG, JPG, GIF (até 10MB)

2. **Preencha os Detalhes**
   - Título do NFT (máximo 50 caracteres)
   - Descrição detalhada (máximo 500 caracteres)

3. **Crie o NFT**
   - Clique em "Criar NFT"
   - Acompanhe o progresso da criação
   - Visualize o resultado final

4. **Visualize e Compartilhe**
   - Veja a prévia 3D do seu NFT
   - Copie informações como ID e IPFS CID
   - Crie mais NFTs se desejar

## 🏗️ Estrutura do Projeto

```
src/
├── components/           # Componentes reutilizáveis
│   ├── Uploader.tsx     # Upload de imagens com drag & drop
│   ├── NFTForm.tsx      # Formulário de criação
│   ├── Loader.tsx       # Indicador de carregamento
│   └── NFTPreview.tsx   # Prévia do NFT criado
├── services/            # Serviços e APIs
│   └── supabase.ts      # Mock do Supabase e IPFS
├── types/               # Definições TypeScript
│   └── index.ts         # Interfaces principais
├── App.tsx              # Componente principal
└── index.css            # Estilos globais e TailwindCSS
```

## 🎭 Componentes

### Uploader
- Drag & drop de imagens
- Preview em tempo real
- Validação de tipo e tamanho
- Animações de hover e drop

### NFTForm
- Campos validados em tempo real
- Contador de caracteres
- Estados visuais de preenchimento
- Botão animado com loading

### Loader
- Progresso visual com etapas
- Spinner 3D animado
- Mensagens dinâmicas
- Efeitos de partículas

### NFTPreview
- Card 3D com flip animation
- Informações completas do NFT
- Botões de ação animados
- Copy-to-clipboard

## 🔮 Funcionalidades Futuras

### Backend Real
- [ ] Integração completa com Supabase
- [ ] Upload real para IPFS (Pinata/Web3.Storage)
- [ ] Mint real em blockchain (Ethereum/Polygon)

### Autenticação
- [ ] Login com wallet (MetaMask, WalletConnect)
- [ ] Perfil de usuário
- [ ] Histórico de NFTs

### Recursos Avançados
- [ ] Coleções de NFTs
- [ ] Marketplace integrado
- [ ] Raridade automática
- [ ] Metadata customizada

## 🛠️ Configuração de Produção

### Supabase
1. Crie um projeto no [Supabase](https://supabase.com)
2. Configure a tabela `nfts`:
   ```sql
   CREATE TABLE nfts (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     title TEXT NOT NULL,
     description TEXT NOT NULL,
     image_url TEXT NOT NULL,
     ipfs_cid TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```
3. Atualize as credenciais em `src/services/supabase.ts`

### IPFS
1. Crie conta no [Pinata](https://pinata.cloud) ou [Web3.Storage](https://web3.storage)
2. Configure as chaves de API
3. Implemente upload real em `uploadToIPFS()`

## 🎨 Customização

### Cores
Edite `tailwind.config.js` para alterar a paleta de cores:
```javascript
colors: {
  'neon-purple': '#8E2DE2',
  'neon-blue': '#4A00E0',
  // ... suas cores
}
```

### Animações
Adicione novas animações em `tailwind.config.js`:
```javascript
keyframes: {
  'custom-animation': {
    '0%': { /* estado inicial */ },
    '100%': { /* estado final */ }
  }
}
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🌟 Agradecimentos

- [React](https://reactjs.org/) - Biblioteca principal
- [Framer Motion](https://www.framer.com/motion/) - Animações fluidas
- [TailwindCSS](https://tailwindcss.com/) - Framework CSS
- [Supabase](https://supabase.com/) - Backend como serviço
- [Unsplash](https://unsplash.com/) - Imagens de exemplo

---

<div align="center">
  <p>Feito com ❤️ e muito ☕</p>
  <p>
    <a href="#top">Voltar ao topo</a>
  </p>
</div>
