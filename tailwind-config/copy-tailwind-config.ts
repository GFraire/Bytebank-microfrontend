import fs from 'fs'
import path from 'path'

const sourcePath = path.resolve(__dirname, 'tailwind.config.js')

const destinations = [
  path.resolve(__dirname, '..', 'add-transaction', 'tailwind.config.js'),
  path.resolve(__dirname, '..', 'dashboard', 'tailwind.config.js'),
  path.resolve(__dirname, '..', 'profile', 'tailwind.config.js'),
  path.resolve(__dirname, '..', 'main-app', 'tailwind.config.js'),
]

destinations.forEach((dest) => {
  fs.copyFile(sourcePath, dest, (err) => {
    if (err) {
      console.error(`❌ Erro ao copiar para ${dest}:`, err)
    } else {
      console.log(`✅ Copiado para ${dest}`)
    }
  })
})
