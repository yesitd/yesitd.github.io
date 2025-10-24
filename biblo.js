// Base de datos de usuarios simulada
const users = [
    {
        id: 1,
        name: "Ana García López",
        email: "ana.garcia@empresa.com",
        role: "Gorriones(2020-2021-2022)",
        specialty: "Frontend React",
        status: "Activo",
        avatar: "/placeholder.svg?height=60&width=60",
        joinDate: "2023-01-15",
        department: "Tecnología",
        phone: "+34 612 345 678"
    },
    {
        id: 2,
        name: "Carlos Rodríguez",
        email: "carlos.rodriguez@empresa.com",
        role: "Benjamines(2015-2019)",
        specialty: "UX/UI Design",
        status: "Activo",
        avatar: "/placeholder.svg?height=60&width=60",
        joinDate: "2023-02-20",
        department: "Diseño",
        phone: "+34 623 456 789"
    },
    {
        id: 3,
        name: "María Fernández",
        email: "maria.fernandez@empresa.com",
        role: "Babis(2016-2017)",
        specialty: "Gestión de Proyectos",
        status: "Activo",
        avatar: "/placeholder.svg?height=60&width=60",
        joinDate: "2022-11-10",
        department: "Administración",
        phone: "+34 634 567 890"
    },
    {
        id: 4,
        name: "David Martín",
        email: "david.martin@empresa.com",
        role: "Gorriones(2020-2021-2022)",
        specialty: "Backend Node.js",
        status: "Inactivo",
        avatar: "/placeholder.svg?height=60&width=60",
        joinDate: "2023-03-05",
        department: "Tecnología",
        phone: "+34 645 678 901"
    },
    {
        id: 5,
        name: "Laura Sánchez",
        email: "laura.sanchez@empresa.com",
        role: "Pibes(2014-2015)",
        specialty: "Análisis de Datos",
        status: "Activo",
        avatar: "/placeholder.svg?height=60&width=60",
        joinDate: "2023-01-30",
        department: "Análisis",
        phone: "+34 656 789 012"
    },
    {
        id: 6,
        name: "Javier López",
        email: "javier.lopez@empresa.com",
        role: "Sub-15(2010-2011)",
        specialty: "Sistemas y Redes",
        status: "Activo",
        avatar: "/placeholder.svg?height=60&width=60",
        joinDate: "2022-09-15",
        department: "IT",
        phone: "+34 667 890 123"
    },
    {
        id: 7,
        name: "Carmen Ruiz",
        email: "carmen.ruiz@empresa.com",
        role: "Diseñador",
        specialty: "Diseño Gráfico",
        status: "Suspendido",
        avatar: "/placeholder.svg?height=60&width=60",
        joinDate: "2023-04-01",
        department: "Diseño",
        phone: "+34 678 901 234"
    },
    {
        id: 8,
        name: "Roberto Jiménez",
        email: "roberto.jimenez@empresa.com",
        role: "gorriones(2020-2021-2022)",
        specialty: "Full Stack",
        status: "Activo",
        avatar: "/placeholder.svg?height=60&width=60",
        joinDate: "2023-02-10",
        department: "Tecnología",
        phone: "+34 689 012 345"
    },
    {
        id: 9,
        name: "Isabel Torres",
        email: "isabel.torres@empresa.com",
        role: "Pibes(2014-2015)",
        specialty: "Business Intelligence",
        status: "Activo",
        avatar: "/placeholder.svg?height=60&width=60",
        joinDate: "2022-12-05",
        department: "Análisis",
        phone: "+34 690 123 456"
    },
    {
        id: 10,
        name: "Miguel Herrera",
        email: "miguel.herrera@empresa.com",
        role: "babis(2016-2017)",
        specialty: "Recursos Humanos",
        status: "Activo",
        avatar: "/placeholder.svg?height=60&width=60",
        joinDate: "2022-08-20",
        department: "RRHH",
        phone: "+34 601 234 567"
    },
    {
        id: 11,
        name: "Pilar Moreno",
        email: "pilar.moreno@empresa.com",
        role: "pibes(2014-2015)",
        specialty: "Branding",
        status: "Inactivo",
        avatar: "/placeholder.svg?height=60&width=60",
        joinDate: "2023-03-15",
        department: "Marketing",
        phone: "+34 612 345 678"
    },
    {
        id: 12,
        name: "Antonio Vega",
        email: "antonio.vega@empresa.com",
        role: "Sub-17(2008-2009)",
        specialty: "Seguridad IT",
        status: "Activo",
        avatar: "/placeholder.svg?height=60&width=60",
        joinDate: "2022-10-30",
        department: "Seguridad",
        phone: "+34 623 456 789"
    }
];

let filteredUsers = [...users];

// Elementos del DOM
const searchInput = document.getElementById('searchInput');
const roleFilter = document.getElementById('roleFilter');
const statusFilter = document.getElementById('statusFilter');
const userGrid = document.getElementById('userGrid');
const resultsTitle = document.getElementById('resultsTitle');
const resultsCount = document.getElementById('resultsCount');
const noResults = document.getElementById('noResults');
const userModal = document.getElementById('userModal');
const modalContent = document.getElementById('modalContent');

// Event listeners
searchInput.addEventListener('input', filterUsers);
roleFilter.addEventListener('change', filterUsers);
statusFilter.addEventListener('change', filterUsers);

// Cerrar modal
document.querySelector('.close-btn').addEventListener('click', closeModal);
userModal.addEventListener('click', (e) => {
    if (e.target === userModal) closeModal();
});

// Función para filtrar usuarios
function filterUsers() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedRole = roleFilter.value;
    const selectedStatus = statusFilter.value;

    filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm) ||
                            user.email.toLowerCase().includes(searchTerm) ||
                            user.specialty.toLowerCase().includes(searchTerm);
        
        const matchesRole = !selectedRole || user.role === selectedRole;
        const matchesStatus = !selectedStatus || user.status === selectedStatus;

        return matchesSearch && matchesRole && matchesStatus;
    });

    renderUsers();
    updateResultsInfo();
}

// Función para renderizar usuarios
function renderUsers() {
    if (filteredUsers.length === 0) {
        userGrid.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }

    userGrid.style.display = 'grid';
    noResults.style.display = 'none';

    userGrid.innerHTML = filteredUsers.map(user => `
        <div class="user-card" onclick="showUserModal(${user.id})">
            <div class="user-header">
                <img src="${user.avatar}" alt="${user.name}" class="user-avatar">
                <div class="user-info">
                    <h3>${user.name}</h3>
                    <div class="user-role">${user.role}</div>
                </div>
            </div>
            <div class="user-details">
                <div class="user-email">
                    📧 ${user.email}
                </div>
                <div class="user-specialty">
                    🎯 ${user.specialty}
                </div>
            </div>
            <div class="user-footer">
                <span class="user-status status-${user.status.toLowerCase()}">
                    ${user.status}
                </span>
                <button class="view-profile-btn" onclick="event.stopPropagation(); showUserModal(${user.id})">
                    Ver Perfil
                </button>
            </div>
        </div>
    `).join('');
}

// Función para actualizar información de resultados
function updateResultsInfo() {
    const count = filteredUsers.length;
    resultsCount.textContent = `${count} usuario${count !== 1 ? 's' : ''} encontrado${count !== 1 ? 's' : ''}`;
    
    if (searchInput.value || roleFilter.value || statusFilter.value) {
        resultsTitle.textContent = 'Resultados de búsqueda';
    } else {
        resultsTitle.textContent = 'Todos los usuarios';
    }
}

// Función para mostrar modal de usuario
function showUserModal(userId) {
    const user = users.find(u => u.id === userId);
    if (!user) return;

    modalContent.innerHTML = `
        <div class="modal-user-header">
            <img src="${user.avatar}" alt="${user.name}" class="modal-avatar">
            <div class="modal-user-info">
                <h2>${user.name}</h2>
                <div class="modal-user-role">${user.role}</div>
            </div>
        </div>
        <div class="modal-details">
            <div class="detail-item">
                <span class="detail-label">Email:</span>
                <span class="detail-value">${user.email}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Especialidad:</span>
                <span class="detail-value">${user.specialty}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Estado:</span>
                <span class="detail-value">
                    <span class="user-status status-${user.status.toLowerCase()}">${user.status}</span>
                </span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Departamento:</span>
                <span class="detail-value">${user.department}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Teléfono:</span>
                <span class="detail-value">${user.phone}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Fecha de ingreso:</span>
                <span class="detail-value">${new Date(user.joinDate).toLocaleDateString('es-ES')}</span>
            </div>
        </div>
    `;

    userModal.style.display = 'flex';
}

// Función para cerrar modal
function closeModal() {
    userModal.style.display = 'none';
}

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    renderUsers();
    updateResultsInfo();
});

// Manejar tecla Escape para cerrar modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && userModal.style.display === 'flex') {
        closeModal();
    }
});