
// Mostrar/ocultar campo de URL personalizada
const customCheckbox = document.getElementById('custom');
const customUrlContainer = document.getElementById('customUrlContainer');

customCheckbox.addEventListener('change', function() {
    customUrlContainer.style.display = this.checked ? 'block' : 'none';
});

// Mostrar etiquetas
const tagsInput = document.getElementById('tags');
const tagsContainer = document.getElementById('tagsContainer');

tagsInput.addEventListener('input', function() {
    const tags = this.value.split(',').filter(tag => tag.trim() !== '');
    tagsContainer.innerHTML = '';
    
    tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.classList.add('tag');
        tagElement.textContent = tag.trim();
        tagsContainer.appendChild(tagElement);
    });
});

// Vista previa
const previewButton = document.getElementById('previewButton');
const previewContainer = document.getElementById('previewContainer');
const previewTitle = document.getElementById('previewTitle');
const previewSummary = document.getElementById('previewSummary');
const previewContent = document.getElementById('previewContent');
const previewTags = document.getElementById('previewTags');
const previewPlatforms = document.getElementById('previewPlatforms');

previewButton.addEventListener('click', function() {
    const title = document.getElementById('title').value;
    const summary = document.getElementById('summary').value;
    const content = document.getElementById('content').value;
    const tags = document.getElementById('tags').value.split(',').filter(tag => tag.trim() !== '');
    
    const platforms = Array.from(document.querySelectorAll('input[name="platforms"]:checked'))
        .map(checkbox => checkbox.value);
    
    previewTitle.textContent = title || 'Sin título';
    previewSummary.textContent = summary || 'Sin resumen';
    previewContent.textContent = content || 'Sin contenido';
    
    previewTags.innerHTML = '';
    tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.classList.add('tag');
        tagElement.textContent = tag.trim();
        previewTags.appendChild(tagElement);
    });
    
    previewPlatforms.innerHTML = platforms.length > 0 
        ? platforms.join(', ') 
        : 'Ninguna plataforma seleccionada';
    
    previewContainer.classList.add('active');
    previewContainer.scrollIntoView({ behavior: 'smooth' });
});

// Envío del formulario
const articleForm = document.getElementById('articleForm');
const successMessage = document.getElementById('successMessage');

articleForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Aquí iría la lógica para enviar el artículo a las plataformas seleccionadas
    // Por ahora, solo mostraremos un mensaje de éxito
    
    successMessage.style.display = 'block';
    successMessage.scrollIntoView({ behavior: 'smooth' });
    
    // Ocultar el mensaje después de 5 segundos
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 5000);
});
