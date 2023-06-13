
const PATH_agents = "preprocessed_agents.csv";
function read_agents(PATH_agents) {
    return new Promise(function (resolve, reject) {
        d3.csv(PATH_agents).then(function (data) {
            var dicc = data.map(function (d, index) {
                return {
                    id: index,
                    name: d.Name,
                    rol: d.Role,
                    descr: d.Biography,
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

var data_agents;

read_agents(PATH_agents).then(function (data) {
    data_agents = data;
    displayMatrix(data_agents);
}).catch(function (error) {
    console.error('Error al cargar los agentes: ' + error);
});


