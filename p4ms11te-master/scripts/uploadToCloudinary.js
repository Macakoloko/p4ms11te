// Carregar as variáveis de ambiente
require('dotenv').config({ path: '.env.local' });

const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;

// Verificar se as credenciais foram carregadas
console.log('Cloud name:', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
console.log('API key definida:', !!process.env.CLOUDINARY_API_KEY);
console.log('API secret definido:', !!process.env.CLOUDINARY_API_SECRET);

// Configuração do Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Função para fazer upload das imagens
async function uploadToCloudinary(filepath, folder) {
  try {
    // Verifica se o arquivo existe
    if (!fs.existsSync(filepath)) {
      console.error(`Arquivo não encontrado: ${filepath}`);
      return null;
    }

    console.log(`Fazendo upload de: ${filepath} para a pasta ${folder}`);
    
    // Faz o upload para o Cloudinary
    const result = await cloudinary.uploader.upload(filepath, {
      folder: folder,
      resource_type: 'auto',
    });

    console.log(`Upload concluído: ${result.secure_url}`);
    return result;
  } catch (error) {
    console.error(`Erro ao fazer upload de ${filepath}:`, error);
    return null;
  }
}

// Função para processar uma pasta inteira
async function processFolder(folderPath, cloudinaryFolder) {
  try {
    // Verifica se a pasta existe
    if (!fs.existsSync(folderPath)) {
      console.error(`Pasta não encontrada: ${folderPath}`);
      return [];
    }

    // Lê os arquivos da pasta
    const files = fs.readdirSync(folderPath);
    const results = [];

    // Faz o upload de cada arquivo
    for (const file of files) {
      const filepath = path.join(folderPath, file);
      
      // Verifica se é um arquivo (não uma pasta)
      const stat = fs.statSync(filepath);
      if (stat.isFile()) {
        const extension = path.extname(file).toLowerCase();
        // Verifica se é uma imagem
        if (['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp'].includes(extension)) {
          const result = await uploadToCloudinary(filepath, cloudinaryFolder);
          if (result) {
            results.push({ 
              filename: file, 
              url: result.secure_url,
              publicId: result.public_id
            });
          }
        }
      }
    }

    return results;
  } catch (error) {
    console.error(`Erro ao processar a pasta ${folderPath}:`, error);
    return [];
  }
}

// Função principal
async function main() {
  // Processa a pasta principal de imagens
  console.log("Iniciando upload das fotos...");
  const photosResults = await processFolder('public', 'pmbeauty/photos');
  
  // Salva os resultados em um arquivo JSON
  fs.writeFileSync('public/photos-cloudinary.json', JSON.stringify(photosResults, null, 2));
  console.log(`Feito upload de ${photosResults.length} fotos. Resultados salvos em photos-cloudinary.json`);

  // Processa a pasta de logos
  console.log("\nIniciando upload das logos...");
  const logosResults = await processFolder('public/LOGO P&M', 'pmbeauty/logos');
  
  // Salva os resultados em um arquivo JSON
  fs.writeFileSync('public/logos-cloudinary.json', JSON.stringify(logosResults, null, 2));
  console.log(`Feito upload de ${logosResults.length} logos. Resultados salvos em logos-cloudinary.json`);
}

// Executa a função principal
main().catch(console.error); 