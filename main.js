
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
        .attr("transform", (d, i) => {
            // console.log(`${i}_${scale_x(i % 4)}, ${scale_y(Math.floor(i / 4))}:${d.name}`);
            return `translate(${scale_x(i % 4)}, ${scale_y(Math.floor(i / 4))})`
        })
        .attr('fill', '#03192e')
        .attr('stroke', '#09253e').attr('stroke-width', 5)


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