
// ====================
// ====================
// Definición de categorías válidas (debe coincidir con los selects en HTML)
// ====================
const CATEGORIAS = [
    "Gorriones(2020-2021-2022)",
    "Benjamines(2015-2019)",
    "Babis(2016-2017)",
    "Pibes(2014-2015)",
    "Sub-15(2010-2011)",
    "Sub-17(2008-2009)"
];

// ====================
// Datos de ejemplo de usuarios
// ====================
let users = [
    {
        id: 1,
        name: "Carlos Rodríguez",
        email: "carlos.rodriguez@club.com",
        role: "jugador",
        team: "Gorriones(2020-2021-2022)",
        status: "active",
        lastAccess: "2024-01-15",
        phone: "+34 666 123 456",
        avatar: "/placeholder.svg?height=40&width=40"
    },
    {
        id: 2,
        name: "María González",
        email: "maria.gonzalez@club.com",
        role: "jugador",
        team: "Benjamines(2015-2019)",
        status: "active",
        lastAccess: "2024-01-14",
        phone: "+34 666 789 012",
        avatar: "/placeholder.svg?height=40&width=40"
    },
    {
        id: 3,
        name: "Luis Martínez",
        email: "luis.martinez@club.com",
        role: "jugador",
        team: "Babis(2016-2017)",
        status: "inactive",
        lastAccess: "2024-01-10",
        phone: "+34 666 345 678",
        avatar: "/placeholder.svg?height=40&width=40"
    },
    {
        id: 4,
        name: "Ana Fernández",
        email: "ana.fernandez@club.com",
        role: "jugador",
        team: "Pibes(2014-2015)",
        status: "active",
        lastAccess: "2024-01-15",
        phone: "+34 666 901 234",
        avatar: "/placeholder.svg?height=40&width=40"
    },
    {
        id: 5,
        name: "Diego López",
        email: "diego.lopez@club.com",
        role: "jugador",
        team: "Sub-15(2010-2011)",
        status: "pending",
        lastAccess: "2024-01-12",
        phone: "+34 666 567 890",
        avatar: "/placeholder.svg?height=40&width=40"
    },
    {
        id: 6,
        name: "Carmen Ruiz",
        email: "carmen.ruiz@club.com",
        role: "jugador",
        team: "Sub-17(2008-2009)",
        status: "active",
        lastAccess: "2024-01-15",
        phone: "+34 666 234 567",
        avatar: "/placeholder.svg?height=40&width=40"
    }
];


// ====================
// Variables globales y configuración
// ====================
let filteredUsers = [...users];
let currentPage = 1;
const usersPerPage = 10;
let editingUserId = null;

// ====================
// Inicialización
// ====================
document.addEventListener('DOMContentLoaded', function() {
    renderUsers();
    setupEventListeners();
    updateStats();
});

function setupEventListeners() {
    document.getElementById('searchInput').addEventListener('input', filterUsers);
    document.getElementById('roleFilter').addEventListener('change', filterUsers);
    document.getElementById('statusFilter').addEventListener('change', filterUsers);
    document.getElementById('userForm').addEventListener('submit', handleFormSubmit);
}

// ====================
// Filtrado y renderizado de usuarios
// ====================
function filterUsers() {
    const searchTerm = (document.getElementById('searchInput')?.value || '').toLowerCase();
    const roleFilter = document.getElementById('roleFilter')?.value || '';
    const statusFilter = document.getElementById('statusFilter')?.value || '';

    filteredUsers = users.filter(user => {
        // Solo mostrar usuarios de categorías válidas
        if (!CATEGORIAS.includes(user.team)) return false;
        const matchesSearch = user.name.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm) ||
            user.team.toLowerCase().includes(searchTerm);
        // Si hay filtro de categoría, solo jugadores y que coincida el team
        const matchesRole = !roleFilter || (user.role === 'jugador' && user.team === roleFilter);
        const matchesStatus = !statusFilter || user.status === statusFilter;
        return matchesSearch && matchesRole && matchesStatus;
    });

    currentPage = 1;
    renderUsers();
}

function renderUsers() {
    const tbody = document.getElementById('usersTableBody');
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    const pageUsers = filteredUsers.slice(startIndex, endIndex);

        tbody.innerHTML = pageUsers.map(user => {
            let catClass = '';
            switch(user.team) {
                case 'Gorriones(2020-2021-2022)': catClass = 'cat-gorriones'; break;
                case 'Benjamines(2015-2019)': catClass = 'cat-benjamines'; break;
                case 'Babis(2016-2017)': catClass = 'cat-babis'; break;
                case 'Pibes(2014-2015)': catClass = 'cat-pibes'; break;
                case 'Sub-15(2010-2011)': catClass = 'cat-sub-15'; break;
                case 'Sub-17(2008-2009)': catClass = 'cat-sub-17'; break;
            }
            return `
            <tr>
                <td>
                    <div class="user-info">
                        <img src="${user.avatar}" alt="${user.name}" class="user-avatar">
                        <div>
                            <div class="user-name">${user.name}</div>
                            <div class="user-email">${user.email}</div>
                        </div>
                    </div>
                </td>
                <td>
                    <span class="role-badge role-jugador ${catClass}">
                        ${user.role === 'jugador' ? user.team : (user.role.charAt(0).toUpperCase() + user.role.slice(1))}
                    </span>
                </td>
                <td>${user.team}</td>
                <td>
                    <span class="status-badge status-${user.status}">
                        ${getStatusText(user.status)}
                    </span>
                </td>
                <td>${formatDate(user.lastAccess)}</td>
                <td>
                    <div class="actions">
                        <button class="btn btn-sm btn-view" onclick="viewUser(${user.id})" title="Ver detalles">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-sm btn-edit" onclick="editUser(${user.id})" title="Editar">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-delete" onclick="deleteUser(${user.id})" title="Eliminar">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
            `;
        }).join('');

    renderPagination();
    updateStats();
}

function renderPagination() {
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const pagination = document.getElementById('pagination');

    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }

    let paginationHTML = '';

    // Botón anterior
    if (currentPage > 1) {
        paginationHTML += `<button onclick="changePage(${currentPage - 1})"><i class="fas fa-chevron-left"></i></button>`;
    }

    // Números de página
    for (let i = 1; i <= totalPages; i++) {
        if (i === currentPage) {
            paginationHTML += `<button class="active">${i}</button>`;
        } else {
            paginationHTML += `<button onclick="changePage(${i})">${i}</button>`;
        }
    }

    // Botón siguiente
    if (currentPage < totalPages) {
        paginationHTML += `<button onclick="changePage(${currentPage + 1})"><i class="fas fa-chevron-right"></i></button>`;
    }

    pagination.innerHTML = paginationHTML;
}

function changePage(page) {
    currentPage = page;
    renderUsers();
}

// ====================
// Utilidades de usuario
// ====================
function getStatusText(status) {
    const statusMap = {
        'active': 'Activo',
        'inactive': 'Inactivo',
        'pending': 'Pendiente'
    };
    return statusMap[status] || status;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
}

// ====================
// Estadísticas (Contadores)
// ====================
function updateStats() {
    // Contadores solo para jugadores de categorías válidas y por categoría si hay filtro
    const roleFilter = document.getElementById('roleFilter')?.value || '';
    let jugadoresFiltrados = users.filter(u => u.role === 'jugador' && CATEGORIAS.includes(u.team));
    if (roleFilter) {
        jugadoresFiltrados = jugadoresFiltrados.filter(u => u.team === roleFilter);
    }
    const totalUsers = jugadoresFiltrados.length;
    const inactivePlayers = jugadoresFiltrados.filter(u => u.status === 'inactive').length;
    const pendingUsers = jugadoresFiltrados.filter(u => u.status === 'pending').length;
    const activeUsers = jugadoresFiltrados.filter(u => u.status === 'active').length;

    const totalUsersEl = document.getElementById('totalUsers');
    if (totalUsersEl) totalUsersEl.textContent = totalUsers;
    const inactivePlayersEl = document.getElementById('inactivePlayers');
    if (inactivePlayersEl) inactivePlayersEl.textContent = inactivePlayers;
    const pendingUsersEl = document.getElementById('pendingUsers');
    if (pendingUsersEl) pendingUsersEl.textContent = pendingUsers;
    const activeUsersEl = document.getElementById('activeUsers');
    if (activeUsersEl) activeUsersEl.textContent = activeUsers;
}

// ====================
// Modales y formularios de usuario
// ====================
function openModal(mode, userId = null) {
    const modal = document.getElementById('userModal');
    const modalTitle = document.getElementById('modalTitle');
    const form = document.getElementById('userForm');

    editingUserId = userId;

    if (mode === 'add') {
        modalTitle.textContent = 'Agregar Usuario';
        form.reset();
        document.getElementById('submitText').textContent = 'Guardar Usuario';
    } else if (mode === 'edit' && userId) {
        modalTitle.textContent = 'Editar Usuario';
        const user = users.find(u => u.id === userId);
        if (user) {
            document.getElementById('userName').value = user.name;
            document.getElementById('userEmail').value = user.email;
            document.getElementById('userRole').value = user.role;
            document.getElementById('userTeam').value = user.team;
            document.getElementById('userPhone').value = user.phone;
            document.getElementById('userStatus').value = user.status;
        }
        document.getElementById('submitText').textContent = 'Actualizar Usuario';
    }

    modal.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('userModal');
    modal.classList.remove('active');
    editingUserId = null;
}

function handleFormSubmit(e) {
    e.preventDefault();
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const submitText = document.getElementById('submitText');
    const submitLoading = document.getElementById('submitLoading');

    // Mostrar loading
    submitText.style.display = 'none';
    submitLoading.style.display = 'inline-block';
    submitBtn.disabled = true;

    // El select userRole es la categoría, el rol siempre es 'jugador'
    const categoria = document.getElementById('userRole').value;
    const formData = {
        name: document.getElementById('userName').value,
        email: document.getElementById('userEmail').value,
        role: 'jugador',
        team: categoria,
        phone: document.getElementById('userPhone').value,
        status: document.getElementById('userStatus').value,
        avatar: `/placeholder.svg?height=40&width=40&query=${categoria}`
    };

    // Simular llamada API
    setTimeout(() => {
        if (editingUserId) {
            // Actualizar usuario existente
            const userIndex = users.findIndex(u => u.id === editingUserId);
            if (userIndex !== -1) {
                users[userIndex] = { ...users[userIndex], ...formData };
                showNotification('Usuario actualizado correctamente', 'success');
            }
        } else {
            // Agregar nuevo usuario
            const newUser = {
                id: Math.max(...users.map(u => u.id)) + 1,
                ...formData,
                lastAccess: new Date().toISOString().split('T')[0]
            };
            users.push(newUser);
            showNotification('Usuario agregado correctamente', 'success');
        }

        // Reset loading state
        submitText.style.display = 'inline';
        submitLoading.style.display = 'none';
        submitBtn.disabled = false;

        // Actualizar UI
        filterUsers();
        updateStats();
        closeModal();
    }, 1500);
}

// ====================
// Panel de información de usuario
// ====================
function viewUser(userId) {
    const user = users.find(u => u.id === userId);
    if (!user) return;
    const modal = document.getElementById('viewUserModal');
    const body = document.getElementById('viewUserBody');
    let catClass = '';
    switch(user.team) {
    case 'Gorriones(2020-2021-2022)': catClass = 'cat-gorriones'; break;
    case 'Benjamines(2015-2019)': catClass = 'cat-benjamines'; break;
    case 'Babis(2016-2017)': catClass = 'cat-babis'; break;
    case 'Pibes(2014-2015)': catClass = 'cat-pibes'; break;
    case 'Sub-15(2010-2011)': catClass = 'cat-sub-15'; break;
    case 'Sub-17(2008-2009)': catClass = 'cat-sub-17'; break;
    }
    body.innerHTML = `
        <div style="display:flex; align-items:center; gap:24px; margin-bottom:18px;">
            <img src="${user.avatar}" alt="${user.name}" style="width:70px; height:70px; border-radius:50%; object-fit:cover; border:3px solid #2a3950;">
            <div>
                <div style="font-size:1.3rem; font-weight:700; color:#fff;">${user.name}</div>
                <div style="color:#fff; font-size:1rem; opacity:0.85;">${user.email}</div>
            </div>
        </div>
        <div style="margin-bottom:10px;"><b>Categoría:</b> <span class="role-badge role-jugador ${catClass}">${user.role === 'jugador' ? user.team : (user.role.charAt(0).toUpperCase() + user.role.slice(1))}</span></div>
        <div style="margin-bottom:10px;"><b>Equipo:</b> ${user.team}</div>
        <div style="margin-bottom:10px;"><b>Teléfono:</b> ${user.phone || '-'}</div>
        <div style="margin-bottom:10px;"><b>Estado:</b> <span class="status-badge status-${user.status}">${getStatusText(user.status)}</span></div>
        <div style="margin-bottom:10px;"><b>Último acceso:</b> ${formatDate(user.lastAccess)}</div>
    `;
    modal.classList.add('active');
}

function closeViewUser() {
    document.getElementById('viewUserModal').classList.remove('active');
}

function editUser(userId) {
    openModal('edit', userId);
}

function deleteUser(userId) {
    const user = users.find(u => u.id === userId);
    if (user && confirm(`¿Estás seguro de que quieres eliminar a ${user.name}?`)) {
        users = users.filter(u => u.id !== userId);
        filterUsers();
        updateStats();
        showNotification('Usuario eliminado correctamente', 'success');
    }
}

// ====================
// Exportar y refrescar datos
// ====================
function exportUsers() {
    // Encabezados claros y separador punto y coma
    const headers = [
        'Nombre',
        'Email',
        'Rol',
        'Equipo',
        'Estado',
        'Último Acceso',
        'Teléfono',
        'Avatar'
    ];
    const separator = ';';
    const rows = filteredUsers.map(user => [
        user.name,
        user.email,
        user.role,
        user.team,
        getStatusText(user.status),
        formatDate(user.lastAccess),
        user.phone || '',
        user.avatar || ''
    ].map(field => String(field).replace(/;/g, ',')) // Evita romper el CSV
    .join(separator));

    const csvContent = 'data:text/csv;charset=utf-8,'
        + headers.join(separator) + '\n'
        + rows.join('\n');

    // Nombre de archivo con fecha
    const fecha = new Date().toISOString().slice(0,10);
    const filename = `usuarios_futbol_${fecha}.csv`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showNotification('Datos exportados correctamente', 'success');
}

function refreshData() {
    showNotification('Actualizando datos...', 'warning');
    // Simular refresco de API
    setTimeout(() => {
        filterUsers();
        updateStats();
        showNotification('Datos actualizados correctamente', 'success');
    }, 1000);
}

// ====================
// Notificaciones y utilidades UI
// ====================
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// ====================
// Eventos globales UI
// ====================
// Cerrar modal al hacer click fuera
document.getElementById('userModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Atajos de teclado
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
    if (e.ctrlKey && e.key === 'n') {
        e.preventDefault();
        openModal('add');
    }
});
 