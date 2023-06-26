
const PATH_agents = "datos_y_procesamiento/preprocessed_agents.csv";
function read_agents(PATH_agents) {
    return new Promise(function (resolve, reject) {
        d3.csv(PATH_agents).then(function (data) {
            var dicc = data.map(function (d, index) {
                return {
                    id: index,
                    name: d.Name,
                    rol: d.Role,
                    bio: d.Biography,
                    img: d.Image,
                    ability1: d.ability1,
                    ability1_desc: d.ability1_desc,
                    ability2: d.ability2,
                    ability2_desc: d.ability2_desc,
                    ability3: d.ability3,
                    ability3_desc: d.ability3_desc,
                    ulti: d.ulti,
                    ulti_desc: d.ulti_desc,
                }
            });

            resolve(dicc);
        }).catch(function (error) {
            reject(error);
        });
    });
}

const PATH_weapons = "datos_y_procesamiento/valorant-stats.csv";
function read_weapons(PATH_weapons) {
    return new Promise(function (resolve, reject) {
        d3.csv(PATH_weapons).then(function (data) {
            var dicc = data.map(function (d, index) {
                return {
                    id: index,
                    Name: d.name,
                    Weapon_Type: d.type,
                    Price: d.price,
                    Fire_Rate: d.fire_rate,
                    Wall_Penetration: d.penetration,
                    Magazine_Capacity: d.magazine,
                    BDMG_0: d.bdm0,
                    LDMG_0: d.ldm0,
                    HLDMG_0: d.hldm0,
                    BDMG_1: d.bdm1,
                    LDMG_1: d.ldm1,
                    HLDMG_1: d.hldm1,
                    BDMG_2: d.bdm2,
                    LDMG_2: d.ldm2,
                    HLDMG_2: d.hldm2,
                }
            });

            resolve(dicc);
        }).catch(function (error) {
            reject(error);
        });
    });
}

var data_agents;

read_agents(PATH_agents).then(function (data) {
    data_agents = data;
    displayMatrix(data_agents);
}).catch(function (error) {
    console.error('Error al cargar los agentes: ' + error);
});

var data_weapons;
read_weapons(PATH_weapons).then(function (data) {
    data_weapons = data;
    displayWeapons(data_weapons);
}
).catch(function (error) {
    console.error('Error al cargar las armas: ' + error);
}
);


