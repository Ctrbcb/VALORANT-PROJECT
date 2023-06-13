<<<<<<< HEAD

var WIDTH = 1200;
var HEIGHT = 2000;

function displayMatrix(data_agents) {

    const SVG1 = d3.select('#agents-vis').append('svg')
        .attr('width', WIDTH).attr('height', HEIGHT)
        .attr('transform', 'translate(0, 50)');

    console.log(data_agents);

    //ESCALAS PARA POSICIONAR LOS RECUADROS
    const scale_x = d3.scaleBand().domain([0, 1, 2, 3]).range([10, WIDTH]).paddingInner(0.3);
    const scale_y = d3.scaleBand().domain([0, 1, 2, 3, 4]).range([10, HEIGHT]);

    //SE HACE DATAJOIN CON UN RECTANGULO POR AGENTE
    SVG1.selectAll("g").data(data_agents).join("g")
        .attr('id', d => d.id)
        .append("rect").attr("x", 0).attr("y", 0)
        .attr("width", 200).attr("height", 260)
=======
let WIDTH = 1900;
let HEIGHT = 2000;

const SVG2 = d3.select('#weapons-vis').append('svg')
const SVG1 = d3.select('#agents-vis').append('svg')
        .attr('width', WIDTH).attr('height', HEIGHT);
        

let g_matriz = SVG1.append('g').attr('id', 'matriz')
                    .attr('width', WIDTH).attr('height', HEIGHT)
                    .attr('transform', 'translate(400, 0)');

let g_stats = SVG1.append('g').attr('id', 'info-agent');

g_stats.append('rect').attr('width', 400).attr('height', 600).attr('fill', '#09253e')



let scrollLimit = 2000; // límite de scroll para el recuadro de las stats de los agentes.


function displayMatrix(data_agents) {

    
    console.log(data_agents);

    //ESCALAS PARA POSICIONAR LOS RECUADROS
    const scale_x = d3.scaleBand().domain([0, 1, 2, 3]).range([10, WIDTH - 400]);
    const scale_y = d3.scaleBand().domain([0, 1, 2, 3, 4]).range([10, HEIGHT - 50]);

    // // CREAMOS UN G GENERAL PARA MOSTRAR LAS CARACTERISTICAS DE LOS AGENTES
    // const G = SVG1.append('g').attr('id', 'info-agent')
    //     .attr('transform', 'translate(0, 1000)');

    //SE HACE DATAJOIN CON UN RECTANGULO POR AGENTE
    g_matriz.selectAll("g").data(data_agents).join("g")
        .attr('id', d => d.id)
        .append("rect").attr("x", 0).attr("y", 0)
        .attr("width", 200).attr("height", 280)
>>>>>>> de808828aa5cdad1ecdf203911452fb455529c73
        .attr("transform", (d, i) => {
            // console.log(`${i}_${scale_x(i % 4)}, ${scale_y(Math.floor(i / 4))}:${d.name}`);
            return `translate(${scale_x(i % 4)}, ${scale_y(Math.floor(i / 4))})`
        })
        .attr('fill', '#03192e')
        .attr('stroke', '#09253e').attr('stroke-width', 5)

<<<<<<< HEAD

    //A CADA G DE PERSONAJE SE LE AGREGA UNA IMAGEN
    SVG1.selectAll("g").data(data_agents).join("g")
        .append('svg:image').attr('xlink:href', d => d.img)
        .attr('width', 190).attr('height', 250)
        .attr("transform", (d, i) => {
            return `translate(${scale_x(i % 4) + 5}, ${scale_y(Math.floor(i / 4)) + 5})`
        })

    SVG1.selectAll('g').on('click', (event, d) => { showAgent(d) })

}



function showAgent(info) {
    const SVG1 = d3.select('#agents-vis');
    console.log(info);

    SVG1.selectAll('g').select('rect').transition().duration(800)
        .attr('height', 260).attr('width', 200);

    let agent_id = CSS.escape(info.id.toString());
    let g = SVG1.select(`#${agent_id}`);
    g.raise();
    g.select('rect').transition().duration(2000)
        .attr('height', 500).attr('width', 360)


}
=======
    //A CADA G DE PERSONAJE SE LE AGREGA UNA IMAGEN Y SU NOMBRE
    g_matriz.selectAll("g").data(data_agents).join("g")
        // .append('text').text(d => d.name)
        .append('svg:image').attr("x", -20).attr("y", 25)
        .attr('xlink:href', d => d.img)
        .attr('width', 240).attr('height', 300)
        .attr("transform", (d, i) => {
            return `translate(${scale_x(i % 4) }, ${scale_y(Math.floor(i / 4))})`
        })
    
    g_matriz.selectAll("g").data(data_agents).join("g")
    .append('text').text(d => d.name)
    .attr("x", 75).attr("y", 16)
    .attr('fill', '#156AB7').attr('font-size', 15).attr('font-family', 'sans-serif')
    .attr("transform", (d, i) => {
        return `translate(${scale_x(i % 4)}, ${scale_y(Math.floor(i / 4))})`
    })


    g_matriz.selectAll('g').on('click', (event, d) => { 

        // g_matriz.selectAll('g').transition()
        // .duration(300)
        // .attr("opacity", 1);
        
        
        show_info_agent(d) 
        
    });

}

function show_info_agent(info) {

    g_matriz.selectAll("g")
                .attr("opacity", 1);

    

    g_matriz.selectAll("g").filter(infoinfo => infoinfo != info)
                    .attr("opacity", 0.3);
    
    console.log(info);

    g_matriz.selectAll('g').select('rect').transition().duration(800)
        .attr('height', 280).attr('width', 200);

    let agent_id = CSS.escape(info.id.toString());
    let g = g_matriz.select(`#${agent_id}`);
    g.raise();
    g.select('rect').transition().duration(2000)
        .attr('height', 330).attr('width', 365)
    
    // mostramos las habilidades y ultimate del agente 

    g_stats.selectAll('text').remove();
   
    g_stats.append('text').text('STATS AND ABILITIES').attr('x',100).attr('y', 30)
    .attr('class', 'desc-habilities')
    .attr('fill', '#156AB7').attr('font-size', 20).attr('font-family', 'sans-serif')
    .attr('font-weight', 'bold');
    
    // mostramos la ultimate del agente con un estilo mas llamativo

    g_stats.append('text').text('Ultimate:' +  info.ulti).attr('x', 100).attr('y', 330)
        .attr('fill', '#156AB7').attr('font-size', 17).attr('font-family', 'sans-serif');
        
    
    // hacemos los textos de la descripcion sean de 3 lineas    

    let ulti_desc = info.ulti_desc;
    let ulti_desc1 = ulti_desc.substring(0, 50);
    let ulti_desc2 = ulti_desc.substring(50, 100);
    let ulti_desc3 = ulti_desc.substring(100, 150);
    let ulti_desc4 = ulti_desc.substring(150, 200);


    g_stats.append('text').text(ulti_desc1).attr('x', 20).attr('y', 345)
    g_stats.append('text').text(ulti_desc2).attr('x', 20).attr('y', 360)
    g_stats.append('text').text(ulti_desc3).attr('x', 20).attr('y', 375)
    g_stats.append('text').text(ulti_desc4).attr('x', 20).attr('y', 390)



    

    

    g_stats.append('text').text(info.ability1).attr('x', 20).attr('y', 410)
        .attr('fill', '#156AB7').attr('font-size', 15).attr('font-family', 'sans-serif')

    // hacemos los textos de la descripcion sean de 3 lineas 

    let ability1_desc = info.ability1_desc;
    let ability_desc1 = ability1_desc.substring(0, 50);
    let ability_desc2 = ability1_desc.substring(50, 100);
    let ability_desc3 = ability1_desc.substring(100, 150);

    g_stats.append('text').text(ability_desc1).attr('x', 20).attr('y', 425)
    g_stats.append('text').text(ability_desc2).attr('x', 20).attr('y', 440)
    g_stats.append('text').text(ability_desc3).attr('x', 20).attr('y', 455)
    

    g_stats.append('text').text(info.ability2).attr('x', 20).attr('y', 475)
        .attr('fill', '#156AB7').attr('font-size', 15).attr('font-family', 'sans-serif')
    
    let ability2_desc = info.ability2_desc;
    let ability2_desc1 = ability2_desc.substring(0, 50);
    let ability2_desc2 = ability2_desc.substring(50, 100);
    let ability2_desc3 = ability2_desc.substring(100, 150);
    
    g_stats.append('text').text(ability2_desc1).attr('x', 20).attr('y', 490)
    g_stats.append('text').text(ability2_desc2).attr('x', 20).attr('y', 505)
    g_stats.append('text').text(ability2_desc3).attr('x', 20).attr('y', 525)

    g_stats.append('text').text(info.ability3).attr('x', 20).attr('y', 545)
        .attr('fill', '#156AB7').attr('font-size', 13).attr('font-family', 'sans-serif')
    
    let ability3_desc = info.ability3_desc;
    let ability3_desc1 = ability3_desc.substring(0, 50);
    let ability3_desc2 = ability3_desc.substring(50, 100);
    let ability3_desc3 = ability3_desc.substring(100, 150);

    g_stats.append('text').text(ability3_desc1).attr('x', 20).attr('y', 560)
    g_stats.append('text').text(ability3_desc2).attr('x', 20).attr('y', 575)
    g_stats.append('text').text(ability3_desc3).attr('x', 20).attr('y', 590)
   





}

window.onscroll = function() {
    let scrollPosition = window.scrollY;
    let new_y = Math.min(scrollPosition, scrollLimit);
    
    d3.select("#info-agent")
    .attr('transform', `translate(0, ${new_y})`);
    
  }
  
>>>>>>> de808828aa5cdad1ecdf203911452fb455529c73
