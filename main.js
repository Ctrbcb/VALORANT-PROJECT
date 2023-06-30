let WIDTH = 1900;
let HEIGHT = 2000;

const body = d3.select('#agents-vis')

const SVG2 = d3.select('#weapons-vis').append('svg')
const SVG1 = d3.select('#agents-vis').append('svg')
    .attr('width', WIDTH).attr('height', HEIGHT);


let g_matriz = SVG1.append('g').attr('id', 'matriz')
    .attr('width', WIDTH).attr('height', HEIGHT)
    .attr('transform', 'translate(400, 0)');

let g_stats = SVG1.append('g').attr('id', 'info-agent');

g_stats.append('rect').attr('width', 400).attr('height', 800).attr('fill', '#09253e')
// Hacemos que el rectangulo de las stats inicialmente no se vea
g_stats.attr('opacity', 0);


let scrollLimit = 2000; // límite de scroll para el recuadro de las stats de los agentes.
let selected_a = "KAY/O";


function displayMatrix(data_agents) {


    console.log(data_agents);

    //ESCALAS PARA POSICIONAR LOS RECUADROS
    const scale_x = d3.scaleBand().domain([0, 1, 2, 3]).range([10, WIDTH - 400]);
    const scale_y = d3.scaleBand().domain([0, 1, 2, 3, 4]).range([10, HEIGHT - 50]);

    //MINIMOSY MAXIMOS DE CADA ATRIBUTO PARA EL SPIDERCHART
    // const min = d3.min()



    // // CREAMOS UN G GENERAL PARA MOSTRAR LAS CARACTERISTICAS DE LOS AGENTES
    // const G = SVG1.append('g').attr('id', 'info-agent')
    //     .attr('transform', 'translate(0, 1000)');

    //SE HACE DATAJOIN CON UN RECTANGULO POR AGENTE
    g_matriz.selectAll("g").data(data_agents).join("g")
        .attr('id', d => d.id)
        .append("rect").attr("x", 0).attr("y", 0)
        .attr("width", 200).attr("height", 280)
        .attr("transform", (d, i) => {
            // console.log(`${i}_${scale_x(i % 4)}, ${scale_y(Math.floor(i / 4))}:${d.name}`);
            return `translate(${scale_x(i % 4)}, ${scale_y(Math.floor(i / 4))})`
        })
        .attr('fill', '#03192e')
        .attr('stroke', '#09253e').attr('stroke-width', 5)

    //A CADA G DE PERSONAJE SE LE AGREGA UNA IMAGEN Y SU NOMBRE
    g_matriz.selectAll("g").data(data_agents).join("g")
        // .append('text').text(d => d.name)
        .append('svg:image').attr("x", -20).attr("y", 25)
        .attr('xlink:href', d => d.img)
        .attr('width', 240).attr('height', 300)
        .attr("transform", (d, i) => {
            return `translate(${scale_x(i % 4)}, ${scale_y(Math.floor(i / 4))})`
        })

    g_matriz.selectAll("g").data(data_agents).join("g")
        .append('text').text(d => d.name)
        .attr("x", 75).attr("y", 16)
        .attr('fill', '#156AB7').attr('font-size', 15).attr('font-family', 'sans-serif').attr('font-weight', 'bold')
        .attr("transform", (d, i) => {
            return `translate(${scale_x(i % 4)}, ${scale_y(Math.floor(i / 4))})`
        })



    g_matriz.selectAll('g').on('click', (event, d) => {
        show_info_agent(d);
        selected_a = d.name
        let map = d3.select('#spider_map').property('value');
        let rank = d3.select('#spider_rank').property('value');
        displaySpiderChart(selected_a, map, rank);

    });

}

function show_info_agent(info) {


    console.log(info);

    //destacamos el agente seleccionado, mientras opaca los demas
    g_matriz.selectAll("g")
        .attr("opacity", 1);

    g_matriz.selectAll("g").filter(infoinfo => infoinfo != info)
        .attr("opacity", 0.3);

    // g_stats.attr('opacity', 0);

    // hacemos que el rectangulo de las stats se vea con una transición
    g_stats.transition().duration(2000).attr('opacity', 1);

    g_matriz.selectAll('g').select('rect').transition().duration(800)
        .attr('height', 280).attr('width', 200).attr('stroke-width', 5);

    // hacemos que el recuadro del agente seleccionado se vea mas grande para agregar su biografia en la zona agrandada
    let agent_id = CSS.escape(info.id.toString());
    let g = g_matriz.select(`#${agent_id}`);

    g.select('rect').transition().duration(2000)
        .attr('height', 330).attr('width', 365).attr('stroke-width', 5);

    // // mostramos la biografia del agente seleccionado en el mismo recuadro
    // g.select('text').remove();
    // g.append('text').text(info.bio).attr('x', 210).attr('y', 30).raise()
    // .attr('class', 'desc-bio')
    // .attr('fill', '#156AB7').attr('font-size', 15).attr('font-family', 'sans-serif')
    // .attr('font-weight', 'bold');

    console.log(info);


    // mostramos la biografia del agente seleccionado en el mismo recuadro

    g.select('text').remove();
    g.append('text').text(info.rol).attr('x', 210).attr('y', 280).transition().duration(2000)
        .attr('transform', 'rotate(-60, 210, 240)').attr('fill', '#156AB7')
        .attr('font-size', 60).attr('font-family', 'sans-serif');



    // mostramos las habilidades y ultimate del agente seleccionado en el recuadro de las stats
    g_stats.selectAll('text').remove();

    g_stats.append('text').text('STATS AND ABILITIES').attr('x', 100).attr('y', 22)
        .attr('class', 'desc-habilities')
        .attr('fill', '#156AB7').attr('font-size', 20).attr('font-family', 'sans-serif')
        .attr('font-weight', 'bold');


    // mostramos la ultimate del agente con un estilo mas llamativo
    g_stats.append('text').text('Ultimate:' + info.ulti).attr('x', 100).attr('y', 330 + 200)
        .attr('fill', '#156AB7').attr('font-size', 17).attr('font-family', 'sans-serif');


    // hacemos los textos de la descripcion sean de 3 lineas    

    let ulti_desc = info.ulti_desc;
    let ulti_desc1 = ulti_desc.substring(0, 50);
    let ulti_desc2 = ulti_desc.substring(50, 100);
    let ulti_desc3 = ulti_desc.substring(100, 150);
    let ulti_desc4 = ulti_desc.substring(150, 200);

    g_stats.append('text').text(ulti_desc1).attr('x', 10).attr('y', 345 + 200)
    g_stats.append('text').text(ulti_desc2).attr('x', 10).attr('y', 360 + 200)
    g_stats.append('text').text(ulti_desc3).attr('x', 10).attr('y', 375 + 200)
    g_stats.append('text').text(ulti_desc4).attr('x', 10).attr('y', 390 + 200)

    g_stats.append('text').text(info.ability1).attr('x', 10).attr('y', 410 + 200)
        .attr('fill', '#156AB7').attr('font-size', 15).attr('font-family', 'sans-serif')

    // hacemos los textos de la descripcion sean de 3 lineas 

    let ability1_desc = info.ability1_desc;
    let ability_desc1 = ability1_desc.substring(0, 50);
    let ability_desc2 = ability1_desc.substring(50, 100);
    let ability_desc3 = ability1_desc.substring(100, 150);

    g_stats.append('text').text(ability_desc1).attr('x', 10).attr('y', 425 + 200).attr('class', 'desc-habilities')
    g_stats.append('text').text(ability_desc2).attr('x', 10).attr('y', 440 + 200)
    g_stats.append('text').text(ability_desc3).attr('x', 10).attr('y', 455 + 200)

    g_stats.append('text').text(info.ability2).attr('x', 20).attr('y', 475 + 200)
        .attr('fill', '#156AB7').attr('font-size', 15).attr('font-family', 'sans-serif')

    let ability2_desc = info.ability2_desc;
    let ability2_desc1 = ability2_desc.substring(0, 50);
    let ability2_desc2 = ability2_desc.substring(50, 100);
    let ability2_desc3 = ability2_desc.substring(100, 150);

    g_stats.append('text').text(ability2_desc1).attr('x', 10).attr('y', 490 + 200)
    g_stats.append('text').text(ability2_desc2).attr('x', 10).attr('y', 505 + 200)
    g_stats.append('text').text(ability2_desc3).attr('x', 10).attr('y', 525 + 200)

    g_stats.append('text').text(info.ability3).attr('x', 10).attr('y', 545 + 200)
        .attr('fill', '#156AB7').attr('font-size', 13).attr('font-family', 'sans-serif')

    let ability3_desc = info.ability3_desc;
    let ability3_desc1 = ability3_desc.substring(0, 50);
    let ability3_desc2 = ability3_desc.substring(50, 100);
    let ability3_desc3 = ability3_desc.substring(100, 150);

    g_stats.append('text').text(ability3_desc1).attr('x', 10).attr('y', 560 + 200)
    g_stats.append('text').text(ability3_desc2).attr('x', 10).attr('y', 575 + 200)
    g_stats.append('text').text(ability3_desc3).attr('x', 10).attr('y', 590 + 200)

}

window.onscroll = function () {
    let scrollPosition = window.scrollY;
    if (scrollPosition > 300) {
        let new_y = Math.min(scrollPosition, scrollLimit);

        d3.select("#info-agent")
            .attr('transform', `translate(0, ${new_y - 300})`)
    }
    else {
        d3.select("#info-agent").transition().duration(100)
            .attr('transform', `translate(0, ${0})`)
    }
}


function displayWeapons(info_weapons) {

}


function displaySpiderChart(selected_agent, map, rank) {

    let width = 360;
    let height = 360;

    let map_dropDown = d3.select("#spider_map");
    map_dropDown.transition().duration(200).attr("style", "opacity:1");

    let rank_dropDown = d3.select("#spider_rank");
    rank_dropDown.transition().duration(200).attr("style", "opacity:1");

    let g = d3.select('#info-agent').selectAll('g').data([1])
        .join('g').attr('width', width + 20).attr('height', height + 20).attr('transform', 'translate(10, 35)')
        .attr('class', 'spider_chart');
    g.selectAll('rect').data([1]).enter().append('rect').attr('x', 0).attr('y', 0)
        .attr('width', width + 20).attr('height', height + 20)
        .attr('fill', '#03192e').attr("stroke", "#04182b").attr("stroke-width", 5);
    console.log(rank);


    // console.log(data_stats);
    let data = data_stats.filter(d => { return d.map == map && d.game_rank.includes(rank) });

    const kd_extent = d3.extent(data, d => d.kd);
    // const kda_extent = d3.extent(data, d => d.kda);
    const winr_extent = d3.extent(data, d => d.winr);
    const pickr_extent = d3.extent(data, d => d.pickr);
    // const matches_extent = d3.extent(data, d => d.matches);
    const avg_extent = d3.extent(data, d => d.avg);
    // const fb_extent = d3.extent(data, d => d.fb);


    // console.log(selected_agent);
    // console.log(map);
    // console.log(rank);
    // console.log(data);

    let ticks = [10, 30, 50, 70, 90, 100];
    let radialScale = d3.scaleLinear() //SCALA PARA CIRCULOS
        .domain([0, 100])
        .range([0, height / 2]);

    g.selectAll("circle")
        .data(ticks)
        .join('circle')
        .attr("cx", width / 2 + 10)
        .attr("cy", height / 2 + 10)
        .attr("fill", "none")
        .attr("stroke", "gray")
        .attr("r", d => radialScale(d));

    g.selectAll("text")
        .data(ticks)
        .join("text")
        .attr("x", width / 2 + 15)
        .attr("y", d => height / 2 - radialScale(d) + 7)
        .attr("fill", "white")
        .attr("opacity", 0.7)
        .attr("font-size", 10)
        .text(d => d.toString());



    const agent_d = data.filter(d => d.name == selected_agent);
    console.log(agent_d);
    let agent;

    if (agent_d.length > 1) {
        agent = agent_d[0];
        // let kd_mean = agent_d.reduce((acumulador, elemento) => {
        //     return acumulador + parseInt(elemento.kd);
        // });
        let kd_mean = agent_d.map(objeto => objeto.kd).reduce((acumulador, valor) => acumulador + valor, 0);
        kd_mean = kd_mean / agent_d.length;

        let winr_mean = agent_d.map(objeto => objeto.winr).reduce((acumulador, valor) => acumulador + valor, 0);
        winr_mean = winr_mean / agent_d.length;

        let pickr_mean = agent_d.map(objeto => objeto.pickr).reduce((acumulador, valor) => acumulador + valor, 0);
        pickr_mean = pickr_mean / agent_d.length;

        let avg_mean = agent_d.map(objeto => objeto.avg).reduce((acumulador, valor) => acumulador + valor, 0);
        avg_mean = avg_mean / agent_d.length;

        agent.kd = kd_mean;
        agent.winr = winr_mean;
        agent.pickr = pickr_mean;
        agent.avg = avg_mean;
        console.log(agent);

    }

    else { agent = agent_d[0]; }


    const kdScale = d3.scaleLinear().domain([0, kd_extent[1]]).range([0, 100]);
    const winrScale = d3.scaleLinear().domain([0, winr_extent[1]]).range([0, 100]);
    const pickrScale = d3.scaleLinear().domain([0, pickr_extent[1]]).range([0, 100]);
    const avgScale = d3.scaleLinear().domain([0, avg_extent[1]]).range([0, 100]);
    // const fbScale = d3.scaleLinear().domain(fb_extent).range([0, 100]);


    let features = [{ "name": "KD", "angle": 45 },
    // { "name": "KDA", "angle": 100 },
    { "name": "Win%", "angle": 135 },
    { "name": "Pick%", "angle": 225 },
    { "name": "Average Score", "angle": 315 },
        // { "name": "First Blood", "angle": 350 },
        // { "name": "Matches", "angle": 360 }
    ];
    let angles = [45, 135, 225, 315];

    g.selectAll("line")
        .data(features)
        .join("line")
        .attr("x1", width / 2 + 10)
        .attr("y1", height / 2 + 10)
        .attr("x2", d => (height / 2) + (Math.cos(d.angle * (Math.PI / 180)) * radialScale(100)) + 10)
        .attr("y2", d => (height / 2) - (Math.sin(d.angle * (Math.PI / 180)) * radialScale(100)) + 10)
        // .attr("stroke", "white")
        .attr("stroke-width", 5)
        .attr("class", "axisline");

    g.selectAll(".axislabel")
        .data(features)
        .join("text")
        .attr("x", d => (height / 2) + (Math.cos(d.angle * (Math.PI / 180)) * radialScale(100)) + 15)
        .attr("y", d => (height / 2) - (Math.sin(d.angle * (Math.PI / 180)) * radialScale(100)) + 15)
        .attr("fill", "white")
        .text(d => d.name);

    // let line = d3.line().x((d, i) => (height / 2) + (Math.cos(angles[i] * (Math.PI / 180)) * radialScale(d)) + 10)
    //     .y((d, i) => (height / 2) - (Math.sin(angles[i] * (Math.PI / 180)) * radialScale(d)) + 10);

    let line = d3.line();



    let points_array = [kdScale(agent.kd), winrScale(agent.winr), pickrScale(agent.pickr), avgScale(agent.avg)]; //elimine KDA y matches
    // console.log(points_array);


    let path_map = points_array.map((d, i) => {
        return [(height / 2) + (Math.cos(angles[i] * (Math.PI / 180)) * radialScale(d)) + 10,
        (height / 2) - (Math.sin(angles[i] * (Math.PI / 180)) * radialScale(d)) + 10];
    })
    // console.log(path_map);

    // g.selectAll("circle").data(path_map).join("circle").attr("cx", d => d[0]).attr("cy", d => d[1]).attr("r", 5).attr("fill", "red");

    g.selectAll("path").data([1]).join("path")
        .attr("fill", "red").attr("stroke", "black")
        .attr("opacity", 0.3).attr("d", line(path_map));

    g.selectAll("line").raise()
    g.selectAll("line").on("click", (event, d) => {
        displayBoxplot(d.name)
    });


}

d3.select("#spider_map").on("change", (event) => {
    let map = d3.select('#spider_map').property('value');
    let rank = d3.select('#spider_rank').property('value');
    displaySpiderChart(selected_a, map, rank);
});

d3.select("#spider_rank").on("change", (event) => {
    let map = d3.select('#spider_map').property('value');
    let rank = d3.select('#spider_rank').property('value');
    displaySpiderChart(selected_a, map, rank);
});

function displayBoxplot(atributo) {
    console.log(atributo);


}