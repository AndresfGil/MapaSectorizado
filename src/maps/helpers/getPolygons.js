export const getPolygons= async ( category ) => {

    const url = `https://usc1.contabostorage.com/d069ea98e2df4b0e9e99b1e7b2ca9a58:pruebasceluweb/jsonciudad/medellin.geojson`
    const resp = await fetch( url );
    const { data = [] } = await resp.json();

    console.log(data)

    // const gifs = data.map( img => ({
    //     id: img.id,
    //     title: img.title,
    //     url: img.images.downsized_medium.url
    // }))

    
    return gifs;
}