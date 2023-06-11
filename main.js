let WIDTH = 1900;
let HEIGHT = 2000;

const SVG2 = d3.select('#weapons-vis').append('svg')
const SVG1 = d3.select('#agents-vis').append('svg')
        .attr('width', WIDTH).attr('height', HEIGHT);
        

let g_matriz = SVG1.append('g').attr('id', 'matriz')
                    .attr('width', WIDTH).attr('height', HEIGHT)
                    .attr('transform', 'translate(400, 0)');

let g_stats = SVG1.append('g').attr('id', 'info-agent');

g_stats.append('rect').attr('width', 400).attr('height', 600).attr('fill', 'red')

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
            return `translate(${scale_x(i % 4) }, ${scale_y(Math.floor(i / 4))})`
        })
    
    g_matriz.selectAll("g").data(data_agents).join("g")
    .append('text').text(d => d.name)
    .attr("x", 75).attr("y", 16)
    .attr('fill', '#156AB7').attr('font-size', 15).attr('font-family', 'sans-serif')
    .attr("transform", (d, i) => {
        return `translate(${scale_x(i % 4)}, ${scale_y(Math.floor(i / 4))})`
    })


    g_matriz.selectAll('g').on('click', (event, d) => { show_info_agent(d) })

}

function show_info_agent(info) {
    const SVG1 = d3.select('#agents-vis');
    console.log(info);

    SVG1.selectAll('g').select('rect').transition().duration(800)
        .attr('height', 280).attr('width', 200);

    let agent_id = CSS.escape(info.id.toString());
    let g = SVG1.select(`#${agent_id}`);
    g.raise();
    g.select('rect').transition().duration(2000)
        .attr('height', 330).attr('width', 365)


}
