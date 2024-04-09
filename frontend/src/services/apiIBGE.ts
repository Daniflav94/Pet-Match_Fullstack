export async function getListStates() {
    try {
        const res = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")

        return res.json();
    } catch (error) {
        console.log(error);
    }
}

export async function getListCities(uf: string) {
    try {
        const res = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)

        return res.json();
    } catch (error) {
        console.log(error);
    }
}