path1 = "preprocessed_agents.csv"
data_agents = d3.csv(path1).then(data => {
    let data_agents = data.map(d => ({
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
    }))


    // PRUEBA
    console.log(data_agents)

    const SVG1 = d3.select('#agents-vis').append('svg');

    SVG1.append('rect').attr('width', 100).attr('height', 100).attr('fill', '#03192e')
    SVG1.append('svg:image').attr('xlink:href', data_agents[0].img).attr('width', 100)

})