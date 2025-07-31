#!/bin/bash

# Inicia cada MFE em uma janela de terminal separada
# Este script é uma alternativa ao comando pnpm dev:all

# Design System
osascript -e 'tell app "Terminal" to do script "cd \"'$PWD'/design-system\" && pnpm dev"'

# Espera um pouco para garantir que o design-system inicie primeiro
sleep 3

# Dashboard
osascript -e 'tell app "Terminal" to do script "cd \"'$PWD'/dashboard\" && pnpm dev"'

# Sidebar
osascript -e 'tell app "Terminal" to do script "cd \"'$PWD'/sidebar\" && pnpm dev"'

# Transactions
osascript -e 'tell app "Terminal" to do script "cd \"'$PWD'/transactions\" && pnpm dev"'

# Add Transaction
osascript -e 'tell app "Terminal" to do script "cd \"'$PWD'/add-transaction\" && pnpm dev"'

# Profile
osascript -e 'tell app "Terminal" to do script "cd \"'$PWD'/profile\" && pnpm dev"'

# Espera um pouco para garantir que os MFEs iniciem antes do main-app
sleep 5

# Main App
osascript -e 'tell app "Terminal" to do script "cd \"'$PWD'/main-app\" && pnpm dev"'

echo "Todos os MFEs foram iniciados em janelas de terminal separadas."