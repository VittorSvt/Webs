document.getElementById('imageForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const width = document.getElementById('width').value;
  const height = document.getElementById('height').value;
  const quantity = document.getElementById('quantity').value;
  const errorMessage = document.getElementById('error-message');
  const imageGrid = document.getElementById('imageGrid');
  
  imageGrid.innerHTML = '';
  errorMessage.textContent = '';

  
  if (width < 100 || height < 100) {
    errorMessage.textContent = 'Largura e altura devem ser no mínimo 100px.';
    return;
  }

  // api que gera as imagens
  for (let i = 0; i < quantity; i++) {
    const randomParam = Math.floor(Math.random() * 1000); // essa parte gera numeros aleatorio pra garantir q aws imagens vao ser diferentes pq estavam iguais antes
    const imageUrl = `https://picsum.photos/${width}/${height}.webp?random=${randomParam}`;

    const container = document.createElement('div');
    container.classList.add('image-container');
    
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = `Imagem aleatória de ${width}x${height} px`;
    container.appendChild(img);

  
    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('buttons-container');
    
  
    const downloadBtn = document.createElement('a');
    downloadBtn.href = `https://picsum.photos/1920/1080.webp?random=${randomParam}`;
    downloadBtn.download = `imagem_fullhd_${i}.webp`;
    downloadBtn.textContent = 'baixar';
    buttonsContainer.appendChild(downloadBtn);

    // Botão de copiar link
    const copyLinkBtn = document.createElement('button');
    copyLinkBtn.textContent = 'Copiar Link';
    copyLinkBtn.classList.add('copy-link');
    copyLinkBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(imageUrl);
      alert('Link copiado para a área de transferência!');
    });
    buttonsContainer.appendChild(copyLinkBtn);

    // Botão de compartilhar
    const shareBtn = document.createElement('button');
    shareBtn.textContent = 'Compartilhar';
    shareBtn.classList.add('share');
    shareBtn.addEventListener('click', () => {
      const shareData = {
        title: 'Imagem aleatória',
        text: 'Confira esta imagem aleatória!',
        url: imageUrl
      };
      navigator.share(shareData).catch((error) => console.log('Erro ao compartilhar', error));
    });
    buttonsContainer.appendChild(shareBtn);

    container.appendChild(buttonsContainer);
    imageGrid.appendChild(container);
  }
});
