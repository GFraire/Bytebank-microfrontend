## Nossas dores
- Downgrade do NextJS (Sem suporte para o App Router)
- Downgrade do React para versão 18 (Sem suporte para novos hooks)
- Module Federation compatível até a versão 13 do NextJS
- Só de usar o SSG atingiria a obrigatoriedade do SSR?


## Estrutura e Hierarquia de CSS

### Webpack
- Configurado para suportar CSS com os loaders `style-loader`, `css-loader` e `postcss-loader`.
- Utiliza o `ModuleFederationPlugin` para integração entre microfrontends.

### Tailwind CSS
- Configurado no diretório `design-system`.
- Arquivo `globals.css` centraliza os estilos globais e é compartilhado entre os microfrontends.
- Hierarquia de estilos:
  - Estilos globais definidos no `globals.css`.
  - Estilos específicos podem ser adicionados em cada microfrontend.

### Estrutura
- `design-system`: Contém o arquivo `globals.css` e configurações do Tailwind.
- `main-app`: Importa os estilos globais no arquivo `_app.tsx`.
- `home`: Também importa os estilos globais no arquivo `globals.css`.

Os estilos globais garantem consistência visual entre os microfrontends, enquanto o Webpack facilita o consumo e compartilhamento de módulos remotos.