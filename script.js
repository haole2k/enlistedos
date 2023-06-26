var rankToImage = {
    'Private': 'private',
    'Private First Class': 'private_first_class',
    'Lance Corporal': 'lance_corporal',
    'Corporal': 'corporal',
    'Sergeant': 'sergeant',
    'Staff Sergeant': 'staff_sergeant',
    'Gunnery Sergeant': 'gunnery_sergeant',
    'Master Sergeant': 'master_sergeant',
    'First Sergeant': 'first_sergeant',
    'Master Gunnery Sergeant': 'master_gunnery_sergeant',
    'Sergeant Major': 'sergeant_major',
    'Sergeant Major of the Marine Corps': 'sergeant_major_marine_corps'
};

var members = [];

function displayMembers() {
    var memberList = document.getElementById('memberList');
    memberList.innerHTML = '';

    members.forEach(function(member, index) {
        var div = document.createElement('div');
        div.className = 'member';
        var img = document.createElement('img');
        img.src = `insignias/${rankToImage[member.rank]}.webp`;
        div.appendChild(img);
        div.innerHTML += `
            <div class="member-info">
                <div class="member-name">${member.name}</div>
                <div class="member-details">
                    <div class="member-join-date">Data de Membro: ${member.joinDate}</div>
                    <div class="member-steam-profile">Perfil Steam: <a href="${member.steamProfile}" target="_blank">${member.steamProfile}</a></div>
                </div>
            </div>
            <button class="edit" data-index="${index}">Editar Membro</button>
            <button class="delete" data-index="${index}">Excluir</button>`;

        memberList.appendChild(div);
    });
}

document.getElementById('memberForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var name = document.getElementById('name').value;
    var joinDate = document.getElementById('joinDate').value;
    var steamProfile = document.getElementById('steamProfile').value;
    var rank = document.getElementById('rank').value;

    if (!name || !joinDate || !steamProfile || !rank) {
        alert("Preencha todos os campos");
        return;
    }

    members.push({
        name: `[SaD] ${name}`,
        joinDate: joinDate,
        steamProfile: steamProfile,
        rank: rank
    });

    localStorage.setItem('members', JSON.stringify(members));
    displayMembers();
    e.target.reset();
});

document.getElementById('memberList').addEventListener('click', function(e) {
    if (e.target.classList.contains('delete')) {
        var index = e.target.getAttribute('data-index');
        members.splice(index, 1);
        localStorage.setItem('members', JSON.stringify(members));
        displayMembers();
    }

    if (e.target.classList.contains('edit')) {
        var index = e.target.getAttribute('data-index');
        var member = members[index];
        var newName = prompt("Informe o novo nome:", member.name);
        var newJoinDate = prompt("Informe a nova data de membro:", member.joinDate);
        var newSteamProfile = prompt("Informe o novo perfil Steam:", member.steamProfile);
        
        if (newName && newJoinDate && newSteamProfile) {
            member.name = newName;
            member.joinDate = newJoinDate;
            member.steamProfile = newSteamProfile;
            localStorage.setItem('members', JSON.stringify(members));
            displayMembers();
        } else {
            alert("Campos inválidos. As informações do membro não foram alteradas.");
        }
    }
});

// Carregar membros do armazenamento local ao iniciar a página
members = JSON.parse(localStorage.getItem('members')) || [];
displayMembers();
